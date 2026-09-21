---
id: pattern-encoded-series
category: color
tags: [color,accessibility,pattern,data,contrast,texture]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 4
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

The same texture carries a *binary* claim more cheaply than a second series
colour does: hold every bar in the one ink and hatch only those on the wrong
side of a threshold. Nothing is renamed, the comparison of heights is
undisturbed, and the gate reads at a glance in greyscale. Pitch 3–5px with the
line at 1px is dense enough to look like an absence of fill rather than a
pattern in its own right.
```css
.bar.below { background: repeating-linear-gradient(-45deg,
             var(--ink) 0 1px, var(--ground) 1px 4px) }
```

There is a third answer to the legend chip beyond restating the recipe: size
the swatch to the pitch instead. A chip 24–32px wide by 10–14px tall holds five
or six periods of a 4–5px hatch, so the key can be the *identical* declaration
— a `::before` inheriting the mark's own custom properties — and cannot drift
from the bars when the recipe is tuned. Restating is for chips that must stay
square.
```css
.key::before { content: ""; display: inline-block; width: 1.75rem; height: .7rem;
  border: 1px solid var(--ink); background: inherit }   /* same paint, bigger box */
```
⚠ A wide chip stops being a swatch and starts reading as a sample of the bar —
which is the point, but it needs the mark's border too, or the hatch floats.

Absence is not a low value, and giving it the pale end of the ramp says
*measured and small*. Take it off the scale: hatch the cell in the ink at 4–8%
over the page ground, fine enough — 1px line, 4–5px period — to read as texture
rather than as a series of its own. The ramp then spans only real data and its
lightest step still means what it says. Carry the fact in text too, since
neither the ramp nor the hatch reaches everyone.
```html
<button aria-label="Model A, Norwegian: not measured"
  style="background-image:repeating-linear-gradient(45deg,#0e151212 0 1px,transparent 1px 4px)">
```
⚠ Hold the hatch lighter than the ramp's first step, or an empty cell out-weighs
a real low one. Judge both against the page ground, not against each other.
