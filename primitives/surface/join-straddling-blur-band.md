---
id: join-straddling-blur-band
category: surface
tags: [surface,mask,texture,detail,section,css-only]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Two full-bleed plates meeting on a line show the join — a resolution step, a
tonal jump, one image's last row. Lay a short band centred *on* the
boundary, give it `backdrop-filter: blur()`, and mask it transparent at both
edges and opaque through the middle: the blur then has no edge of its own, so it
dissolves the join instead of announcing a third element over it. Band 6–20px,
blur 1–4px. Earns its place where two separately-authored layers must
read as one.

```css
.seam { position: absolute; inset-inline: 0; pointer-events: none;
  --band: 10px; height: var(--band);
  top: calc(var(--join) * 100% - var(--band) / 2);
  backdrop-filter: blur(var(--blur, 2px));
  mask-image: linear-gradient(180deg, transparent, #000 50%, transparent) }
```
⚠ A backdrop root spanning the page is a full readback per frame — keep it
static and collapse it under `prefers-reduced-transparency`. Past about 5px the
blur smears recognisable detail across the join rather than softening it.
