---
id: foreshorten-tolerant-plane-label
category: type
tags: [type,label,3d,legibility,tracking,accessibility]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Type laid in a `preserve-3d` plane is resampled rather than re-laid-out, so stems
thin unevenly and counters close — which is why the usual answer is to lift the
label out of the transform. Let it lie there instead and pick a face that
survives: caps drop the x-height relationships the shear damages most, a heavy
mono or grotesque leaves stem width to spare, and tracking holds the counters
open. It stops reading as blurred text and starts reading as signage printed on
the surface. 12–16px, weight 600–800, tracking 0.08–0.16em.

```css
.plane-label { font: 700 13px/1 var(--font-mono); text-transform: uppercase;
               letter-spacing: .14em }             /* .08–.16em */
```
⚠ Sheared type is decoration whatever it says — mark it `aria-hidden` and name
the interactive ancestor. Past roughly 40° of combined tilt nothing at label size
survives.
