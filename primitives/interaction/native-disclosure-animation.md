---
id: native-disclosure-animation
category: interaction
tags: [motion,disclosure,accessibility,progressive-enhancement,height]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`::details-content` with `interpolate-size: allow-keywords` animates a native
`<details>` from `height: 0` to `height: fit-content` — real accordion motion
while keyboard behaviour, find-in-page and the open/close semantics stay the
platform's job. No height measurement, no JS. Durations 0.24–0.4s on a firm
in-out curve; anything slower reads as lag on a control the user just clicked.

```css
.item { interpolate-size: allow-keywords }
.item::details-content { height: 0; overflow: hidden;
  transition: height .32s cubic-bezier(.65,.05,.36,1), content-visibility .32s allow-discrete }
.item[open]::details-content { height: fit-content }
```
⚠ Gate on `@supports` and let unsupported engines open instantly. Never
substitute a guessed `max-height` — the easing is then wrong at every length.
