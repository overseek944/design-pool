---
id: breakpoint-dual-mode-details
category: interaction
tags: [disclosure,navigation,responsive,accessibility,progressive-enhancement]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One `<details>` can be a permanently-open sidebar above a breakpoint and a
collapsible panel below it: let a media query own `open` and swallow the
summary click while wide. One node and one set of links — no duplicate markup,
no hand-rolled `aria-expanded`, and the collapsed copy still answers
find-in-page. Switch somewhere in 900–1100px, wherever the gutter stops holding
a rail.
```js
const narrow = matchMedia('(max-width: 1000px)')
const sync = () => toc.open = !narrow.matches
narrow.addEventListener('change', sync); sync()
summary.onclick = e => narrow.matches || e.preventDefault()
```
⚠ Reset `list-style: none` and `::-webkit-details-marker`, or the native
triangle sits in the middle of what is now a sidebar heading.
