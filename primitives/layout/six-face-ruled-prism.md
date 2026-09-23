---
id: six-face-ruled-prism
category: layout
tags: [3d,transform,wireframe,diagram,loop]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A volume — a tower, a crate, a stack — needs no renderer: four DOM walls turned
on Y and pushed out by half the opposite dimension, plus a lid turned on X.
Hairline borders draw the edges; a repeating gradient rules each face into
floors, so it reads as a model. Spin 14–30s on Y at −4 to −10deg X;
rule period 6–12px, alpha .2–.4.

```css
.prism { transform-style: preserve-3d; animation: spin 20s linear infinite }
.face { position: absolute; border: 1px solid #fff9;
  background: repeating-linear-gradient(0deg, #fff5 0 1px, #fff1 1px 8px) }
.rt { transform: rotateY(90deg) translateZ(calc(var(--w) / 2)) }
```
⚠ Keep fills translucent or far faces vanish; stop the spin under reduced motion.
