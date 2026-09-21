---
id: background-matched-scene-fog
category: canvas
tags: [canvas,fog,depth,background,integration,scene]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A rendered scene ends at its canvas rectangle, so it reads as an image pasted on
rather than a space behind the page. Set the clear colour *and* the fog to the
page's own background token, with `far` just past the furthest geometry:
distant structure fades to the colour continuing outside the canvas, so the
scene gains a horizon and loses its edge. Near 0.4–0.6 of far.

```js
scene.background = new Color(BG)           // BG = the page's background token
scene.fog = new Fog(BG, depth * 0.5, depth * 1.15)
```
⚠ One colour in two places: read it from the stylesheet rather than repeating
the literal, and re-set both on a theme change or the haze stays the old tint.
A transparent renderer has nothing to fade into — fog greys the geometry
against whatever sits behind it.

A flat field has no depth to fog, and its edge still has to go. Put one
absolutely-positioned element inside the background layer's own stacking
context — above the canvas, below the document — carrying nothing but a large
inset shadow in the ground token. The marks thin toward the viewport edge, the
rectangle stops declaring itself, and nothing on top is dimmed. Spread 60–160px
against the field's density. That `z-index` is the whole discipline: hoist the
layer over the page and the same rule becomes a vignette every edge-anchored
control pays for.
```css
.bg        { position: fixed; inset: 0; z-index: 0 }   /* own stacking context */
.bg::after { content: ""; position: absolute; inset: 0; pointer-events: none;
             box-shadow: inset 0 0 100px var(--edge) }
```
⚠ Token the colour per polarity. The alpha that seats a field on a near-black
ground reads as soot on paper, so a light theme wants a fraction of it or none.
