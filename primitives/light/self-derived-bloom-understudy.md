---
id: self-derived-bloom-understudy
category: light
tags: [glow,bloom,filter,svg,line-art,decoration]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 2
seen: 2
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

Variant — ambient spill behind a player: a second muted copy of the clip at
`blur(32–64px) saturate(1.3–1.6) brightness(1.2–1.6)`, no contrast pass, held at
`opacity: 0` and faded in over 150–250ms only once playback starts, so an idle
player carries no halo.
⚠ A second `<video>` is a second decoder; spill from the poster image where the
clip is long or the device tier low.
