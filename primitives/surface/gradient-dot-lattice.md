---
id: gradient-dot-lattice
category: surface
tags: [surface,texture,pattern,blueprint,cheap]
axes: {energy: 1, density: 3, weight: 1, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
One `radial-gradient` plus a `background-size` gives a dot lattice at any pitch,
and the pitch decides what it means: 2–4px reads as paper tooth, a surface that
is simply not flat; 20–40px reads as ruled ground the layout can be measured
against. Run the fine pitch on a pseudo-element in `multiply` so it darkens what
it covers instead of laying a film over it, and the coarse pitch on the page
itself. No image request, no tile seam, and it retints from a token.

```css
.tooth { position: relative }
.tooth::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  mix-blend-mode: multiply;
  background: radial-gradient(var(--speck) 1px, transparent 1px) 0 0 / 3px 3px }
```
⚠ Speck alpha 3–8%. Past that a fine pitch moirés against small text and against
the device pixel grid at fractional DPR. `multiply` needs an opaque backdrop.
