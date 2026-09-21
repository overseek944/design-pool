---
id: tilt-exempt-anchor-layer
category: interaction
tags: [interaction,pointer,transform,3d,depth,architecture]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A surface that tilts under the pointer tilts everything in it, including the
parts meant to hold it down. Split the children: marked ones go to an absolutely
positioned sibling layer at the same inset that never receives the transform,
the rest to the tilting plane. Fasteners, registration dots and corner brackets
then stay flat while the plane turns behind them, and that fixed reference is
what makes the rotation read as depth rather than skew. It also keeps whatever
breaks a `preserve-3d` context — a filter, a clip, a backdrop — outside it.
Overhang the anchors 4–8px.

```jsx
const [pins, plane] = partition(kids, k => k.props['data-pinned'] != null)
<div style={{ perspective: 1100 }}>            {/* 800–1400 */}
  <div className="pins">{pins}</div>           {/* absolute inset-0 z-0, no events */}
  <div ref={tilt} className="plane">{plane}</div>   {/* relative z-1, preserve-3d */}
</div>
```
⚠ The pinned layer sits *under* the plane, so an anchor reads only where it
overhangs the edge. Without `pointer-events: none` it swallows the hover driving
the tilt.
