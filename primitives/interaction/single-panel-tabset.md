---
id: single-panel-tabset
category: interaction
tags: [tabs,aria,architecture,performance,accessibility,correctness]
axes: none
cost: 1
seen: 1
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
