---
id: single-panel-tabset
category: interaction
tags: [tabs,aria,architecture,performance,accessibility,correctness]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
The usual tabset ships every panel and hides all but one, so a set of five
carries five images, five sets of focus stops and five chances to get `hidden`
wrong. Render one panel instead: every tab's `aria-controls` names the same id
and the panel's `aria-labelledby` is the single attribute that moves. DOM cost
stops scaling with the tab count, which is what makes heavy panels — artwork, a
frame, a chart — affordable past three or four of them.

```jsx
<button role="tab" aria-selected={i===a} aria-controls="p" tabIndex={i===a?0:-1}/>
<div role="tabpanel" id="p" aria-labelledby={`tab-${a}`} key={a}>{panels[a]}</div>
```
⚠ Without the `key` the node persists: an entrance animation runs at mount and
never again, and scroll position inside carries across switches. Reserve the
panel's height or every switch resizes the page.

One panel makes the keyboard contract the only thing left to get right, and it
is not optional: `role="tab"` promises arrow keys. Exactly one tab carries
`tabIndex 0`, the rest `-1`, so the set is a single tab stop; Left/Right wrap,
Home and End jump the ends, and each of those moves focus *and* selection in
one call. `preventDefault` only on the keys actually handled, or Home stops
scrolling the page for everyone.
```js
const k = {ArrowRight: i+1, ArrowLeft: i-1, Home: 0, End: tabs.length-1}[e.key]
if (k !== undefined) { e.preventDefault(); select(tabs[(k+tabs.length) % tabs.length], true) }
```
⚠ The roving stop must be rewritten on every selection, not only on keyboard
ones — a click that leaves `tabIndex 0` on the old tab drops the reader back
onto a tab that is no longer current.
