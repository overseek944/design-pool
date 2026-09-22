---
id: depth-pinned-shape-tail
category: surface
tags: [surface,mask,edge,section,ground,token]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A shaped section edge sized as a share of its plate flattens at one height and
swallows another. Split the mask in two: a solid rectangle for the body, the
shape strip sized to a fixed depth. One token owns that depth — the mask, a
negative end margin lapping the plate over its neighbour, and the inset of
anything clearing the arc all read it. Depth `clamp(3rem, 7vw, 6rem)`.

```css
.plate { --d: clamp(3rem, 7vw, 6rem); margin-bottom: calc(-1 * var(--d));
  mask-image: linear-gradient(#000, #000), var(--tail);
  mask-position: top, bottom;
  mask-size: 100% calc(100% - var(--d)), 100% var(--d) }
```
⚠ The cut plate must sit above the one it laps, or the overlap paints the wrong
way and the arc disappears.
