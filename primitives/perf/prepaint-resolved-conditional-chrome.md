---
id: prepaint-resolved-conditional-chrome
category: perf
tags: [perf,cls,storage,first-paint,correctness,architecture]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Chrome whose presence depends on a stored fact about the reader — a dismissed
banner, a saved density, a returning-visitor variant — has no answer on the
server, and resolving it after `DOMContentLoaded` means it paints once and then
disappears, shifting everything below it. Read the store in a synchronous inline
script placed immediately after the element, before the parser reaches anything
under it. The element never paints in the wrong state and nothing moves. Keep it
to one read and a few hundred bytes; it blocks parsing by design.

```html
<div id="strip">…</div>
<script>try{if(localStorage.getItem(K))strip.hidden=true}catch(e){}</script>
```
⚠ Storage throws in partitioned frames and some private modes — a throw must
mean *leave it as authored*, never *hide it*. Moving the read into a deferred
bundle reintroduces the exact shift the inline read exists to prevent.

Script placement is not always yours — a page builder or a CMS template decides
where an embed lands, and a read that has to run *before* an element the author
cannot sit after needs a different trigger. A `MutationObserver` on the root for
`childList` and `subtree`, started in the head, fires as the marker parses,
still ahead of the paint below it; disconnect on the first hit so it costs
nothing for the rest of the document.
```js
new MutationObserver((_, o) => { const el = document.querySelector('[data-mark]')
  if (el) { o.disconnect(); resolve(el) } }).observe(root, {childList:1, subtree:1})
```
⚠ The marker may never appear — a utility route, an error page. A
`DOMContentLoaded` backstop that resolves to the default is mandatory, not
defensive, wherever the unresolved state hides anything.

Variant — where the stored fact moves more than one element, run the read in
the head and write it to the root instead of to the element: `html[data-x]`
then hides the chrome *and* restates every offset that depended on it (a
sticky panel's `top`, `scroll-padding`) in the same selector, so no consumer
paints once at the wrong offset. The read no longer needs to sit after the
element at all.
```js
try{if(localStorage.getItem(K)==="1")document.documentElement.dataset.strip="off"}catch(e){}
```
