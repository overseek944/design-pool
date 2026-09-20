---
id: pattern-encoded-series
category: color
tags: [color,accessibility,pattern,data,contrast,texture]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Hue alone cannot carry series identity — it fails in greyscale, in print and for
a large share of readers. Give each series a *fill pattern* too: a hatch angle
or pitch per series, over a wash of the same hue, with a solid edge at full
strength. The chart reads as colour to everyone who sees colour and as texture
to everyone who does not. Wash 12–25%, line 1–2px, period 4–7px.

```css
.bar { --hue: #10b981; --period: 5px;
  background: repeating-linear-gradient(45deg, var(--hue) 0 1.5px,
              transparent 1.5px var(--period)),
              color-mix(in oklab, var(--hue) 18%, transparent);
  border: 1px solid var(--hue) }
```
⚠ A legend chip is 10–16px and a 5px period lands two lines in it, which reads
as noise. Restate the recipe at 1.4–1.6× the period with a heavier edge for
chips, so the swatch is recognisably the fill and not a coloured square.
