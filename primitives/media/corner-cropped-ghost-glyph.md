---
id: corner-cropped-ghost-glyph
category: media
tags: [media,icon,card,crop,texture,feature-grid]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A feature card's icon need not sit beside its title. Draw it 4–8× the text size
in a hairline stroke at low alpha, with 30–50% of it past the card's trailing
corner, and let the card crop it. The glyph becomes texture: peer cards each get
a distinct silhouette with no extra colour.

```css
.card { position: relative; overflow: clip }
.card > svg { position: absolute; inset-inline-end: -28%; inset-block-end: -30%;
  inline-size: clamp(96px, 45%, 180px); opacity: .08; stroke-width: 1 }  /* .06–.14 */
```
⚠ Decorative — `aria-hidden`. Keep it out from under the text's line box, or
the copy's contrast depends on where the glyph lands at 390px.
