---
id: feathered-copy-pad
category: surface
tags: [surface, scrim, legibility, backdrop-filter, mask, blur, overlay]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Over a live scene, a full-frame scrim dims everything to protect one block of
copy. Scope it to the copy instead: an `aria-hidden` plate behind the text,
overhanging it by a negative inset, carrying blur plus a tint, and masked by
an ellipse sized to the box corners so it has no edge. The scene stays live
everywhere the reader is not reading. Inset 16–40px, blur 8–16px, tint
35–55%, mask holding solid to 15–25% and mid-alpha near 55%.

```css
.copy { position: relative; isolation: isolate }
.copy > .pad { position: absolute; inset: -24px; z-index: -1; backdrop-filter: blur(12px);
  background: rgb(0 0 0 / .45);
  mask-image: radial-gradient(100% 100%, #000 20%, #0007 55%, #0000) }
```
⚠ The feathered rim is weaker than the centre — check contrast at the text's
outer corners, not its middle.
