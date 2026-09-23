---
id: superposed-lamp-falloff
category: light
tags: [light,gradient,glow,wash,layering,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Alpha composites as 1−(1−a)(1−b), so two low-alpha radial fills of one hue do
not average — they build. Stack two ellipses of different aspect ratio and peak
alpha about a shared centre: the overlap gains a denser core while each rim
keeps its own soft edge, a curve no single stop list produces. Core and reach
then tune separately — inner peak, outer radius. Peaks .25–.35 inner, .15–.25
outer; outer 1.3–2× the inner per axis. Author it as one SVG with
`preserveAspectRatio="none"` where the container's ratio is unknown.

```css
.wash { background:
  radial-gradient(ellipse 36% 34% at 50% 34%, rgb(var(--lamp)/.32), #0000 100%),
  radial-gradient(ellipse 50% 42% at 50% 58%, rgb(var(--lamp)/.26), #0000 100%) }
```
⚠ Each layer bands separately on 8-bit panels and the seams do not align — add
grain over the pair rather than more stops. At these alphas nothing survives
`forced-colors`, so no meaning may rest on it.

Variant — a neutral field that themes itself. Draw 3–5 ellipses in one inline
SVG and point every `stop-color` at the UI's own role tokens: text colour at
.3–.45 opacity for the dark core, border tone for the mid lamps, surface colour
for "lift" ellipses that erase back toward the ground. Nothing is a hex, so
light and dark resolve with no second asset. `preserveAspectRatio="xMidYMid
slice"` keeps the ellipses round at any pane ratio.
```html
<radialGradient id="core"><stop stop-color="var(--text)" stop-opacity=".4"/>
  <stop offset="1" stop-color="var(--surface)" stop-opacity="0"/></radialGradient>
```
⚠ `var()` inside a presentation attribute resolves only for inline SVG. An
`<img>` or CSS `url()` reference gets black stops.
