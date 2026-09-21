---
id: gradient-over-opaque-glass
category: surface
tags: [surface,glass,gradient,depth,cheap,performance]
axes: {energy: 1, density: 3, weight: 3, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Glass without a backdrop filter: stack a vertical alpha gradient over an opaque
base in one `background` declaration, so the panel gets a lit top edge and a
pooled shadow at its foot with nothing to composite. It survives where a real
filter cannot — long lists, nested panels, low-end GPUs — because the light
gradient, not the blur, is what the eye scores. Top stop 12–20% white, mid
3–6%, foot 40–60% black.

```css
.panel { background: linear-gradient(180deg, #ffffff2e, #ffffff0a 50%, #0009), var(--base);
         box-shadow: inset 0 1px 0 #ffffff21, 0 0 0 1px #ffffff12 }
```
⚠ Only convincing on a dark base — over a light one the same stack reads as a
dirty panel. The inset top hairline is load-bearing; without it the gradient
looks like a fill error rather than an edge catching light.

Over a light ground, where that stack fails, give the panel its own texture
instead: an oversized copy of a photograph absolutely placed at `z-index: -1`,
blurred, under a flat tint. The glass then samples something real without a
`backdrop-filter`'s per-frame readback, and without the section having to be
dark. Over-scale 1.08–1.2 so the blur's soft edge is clipped away rather than
fading in from the bitmap's own boundary; blur 8–16px.
```css
.pane  { position: relative; isolation: isolate; overflow: clip }
.pane > .scene { position: absolute; inset: 0; z-index: -1; object-fit: cover;
  transform: scale(1.12); filter: blur(10px) saturate(1.1) }
```
⚠ It is a second decode of an image nobody can read — reuse the section's own
photograph rather than requesting one, and keep it out of the accessibility tree.

A theme swap can retire the filter rather than retune it. Glass earns a
`backdrop-filter` against a dark ground, where the blur is what separates a
panel from a busy field; against a light one the same filter buys almost
nothing and still costs a compositing layer per panel. Keep one class and let
the light scope set `backdrop-filter: none` with a flat opaque background and a
hairline border. Components read the same name, and the expensive path exists
only in the theme that needs it.
```css
.glass             { background: var(--tint), color-mix(in oklab, var(--surface) 32%, transparent);
                     backdrop-filter: blur(24px) saturate(150%) }
:root.light .glass { background: #fff; backdrop-filter: none;
                     border: var(--hair) solid var(--line) }
```
⚠ The opaque variant has no transparency left to imply an edge, so the border
stops being optional — without it the panel and a light page ground are the
same colour and the shape disappears.
