---
id: figure-borne-edge-key
category: layout
tags: [diagram,figure,legend,connectors,encoding,hairline,schematic]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A schematic whose connectors carry more than one kind of relationship — planned
against taken, verified against provisional — must say which is which inside its
own frame. The figure is read before the prose beside it, screenshotted and
reused as a share image, so a key held in body copy is absent exactly when the
dashed line is first met. Give the frame a ruled footer band, each entry a short
rule drawn from the same declaration the edges use. Dash pattern first, hue
second. Band 32–48px, swatch 20–32px.

```css
.fig__key   { display: flex; gap: 1.5rem; border-top: var(--hair) solid var(--rule) }
.fig__key i { width: 28px; border-top: 1.5px solid var(--edge-planned) }
.fig__key i.repair { border-top-style: dashed; border-color: var(--edge-repair) }
```
⚠ A swatch shorter than two dash periods reads as a solid rule — size it from
the period, not the column. Hue alone separates nothing in greyscale, and the
entries are text: keep them in the DOM.
