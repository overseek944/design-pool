---
id: self-derived-bloom-understudy
category: light
tags: [glow,bloom,filter,svg,line-art,decoration]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A glow authored as its own asset stops matching the artwork the moment the
artwork changes. Derive it: a second copy of the same element behind the sharp
one, put through a filter chain. Order is the whole trick — `contrast()` first
crushes everything below mid back to black so only the bright strokes survive,
`blur()` then spreads what is left, `brightness()` lifts the result. Threshold
before spread. Reversed, the blur averages the darks back in and the bloom is a
grey smear. Contrast 2.5–5, blur 0.5–1.5% of the element, brightness 1.2–1.8.

```css
.art   { position: relative }
.bloom { position: absolute; inset: 0; pointer-events: none;
         filter: contrast(3.5) blur(clamp(6px, 1.3vw, 13px)) brightness(1.5) }
```
⚠ This blooms by luminance where `drop-shadow` blooms by alpha — why a hairline
glows from its own weight here and traces flatly there. A composited buffer the
size of the box plus the blur: one per view, `aria-hidden`, dropped at narrow.
