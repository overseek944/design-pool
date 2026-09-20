---
id: anchor-focus-handoff
category: interaction
tags: [accessibility,navigation,focus,correctness,anchor]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
An in-page link that only scrolls leaves the keyboard where it was: the next
Tab goes back into the navigation rather than into the section just jumped to.
Move focus to the target and leave the scrolling to the browser. The heading
takes `tabindex="-1"`, its ring is suppressed because the jump is already the
feedback, and `scroll-margin-top` holds it clear of fixed chrome — 24–40px, or
the chrome height plus one line.
```js
link.addEventListener('click', () => target.focus({ preventScroll: true }))
```
```css
h2[id] { scroll-margin-top: 32px } h2:focus { outline: none }
```
⚠ Suppressing the ring is only safe on a heading. On a link or a button it
removes the focus indicator for every route into it.

No listener is needed when the target itself is focusable. Put `tabindex="-1"`
on the section or heading the fragment names and the browser's own fragment
navigation sets the focus starting point there — which also works on a page
opened directly at the hash, where a click handler never runs. Give every
anchored landmark the attribute, not only the one the skip link points at.

Scripting the jump loses two things the browser was doing for free. CSS
`scroll-behavior: smooth` is cancelled by the reduce query; `scrollTo({behavior:
'smooth'})` is not and ignores the preference outright, so read it and pass
`instant`. And bail on any modifier, or the `preventDefault` swallows
open-in-new-tab and open-in-new-window.
```js
if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
e.preventDefault(); history.replaceState(null, '', '#' + id)
scrollTo({ top: y, behavior: rm.matches ? 'instant' : 'smooth' })
```
⚠ Write the hash yourself once you preventDefault — otherwise the address bar
never advances and a reload or a share link returns to the top.
