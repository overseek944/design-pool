---
id: sub-baseline-marker-band
category: type
tags: [type,emphasis,highlight,contrast,accessibility]
axes: {energy: 2, density: 2, weight: 3, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A full accent block behind a phrase has to clear 4.5:1 against the text sitting
on it. A band covering only the bottom 20–35% of the line box does not — glyph
bodies stay on the page ground and only the descender zone is tinted, so a mid
accent at 15–40% alpha reads as a highlighter stroke with the contrast
untouched. Being a painted layer rather than a text decoration, it can also
deepen on hover or on the parent's state.

```css
.mark { position: relative; display: inline-block }
.mark::before { content: ""; position: absolute; inset-inline: 0; z-index: -1;
  bottom: .06em; height: .3em;
  background: color-mix(in oklab, var(--accent) 22%, transparent) }
```
⚠ `z-index: -1` also drops the band behind a tinted ancestor's own background;
give the phrase its own stacking context. Suppress it where the phrase can wrap
— the band paints one line only.
