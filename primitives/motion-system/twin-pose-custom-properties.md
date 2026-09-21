---
id: twin-pose-custom-properties
category: motion-system
tags: [transform,state,stagger,custom-properties,group,choreography]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A group that rearranges between two arbitrary layouts — stacked to fanned, grid
to scattered, folded to laid out — usually costs one rule per item per state.
Write both poses onto the item as custom properties instead and let a single
attribute on the parent choose which set the one transform reads. Any number of
items, two declarations, and it interpolates because it is one property taking
a new value. An index carried alongside spreads the change 30–60ms apart.

```css
.card { transform: translate3d(var(--x), var(--y), 0) rotate(var(--rot));
        transition: transform .6s var(--ease) calc(var(--i) * 42ms) }
[data-open] .card { --x: var(--open-x); --y: var(--open-y); --rot: var(--open-rot) }
```
⚠ Both poses need the same function list in the same order or the change snaps.
Transition `transform`, not the properties — unregistered ones do not animate.
