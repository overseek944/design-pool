---
id: prepaint-resolved-conditional-chrome
category: perf
tags: [perf,cls,storage,first-paint,correctness,architecture]
axes: none
cost: 1
seen: 1
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
