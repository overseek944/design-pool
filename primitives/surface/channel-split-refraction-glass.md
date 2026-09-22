---
id: channel-split-refraction-glass
category: surface
tags: [glass,backdrop-filter,svg-filter,refraction,chromatic,depth]
axes: {energy: 1, density: 3, weight: 3, finish: 5}
cost: 4
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A blur says *frosted*; a displacement says *solid and thick*. Reference an SVG
filter from `backdrop-filter` and bend the backdrop through a map instead of
softening it. Run the displacement three times at slightly different scales,
isolate one channel from each with `feColorMatrix`, and screen them back
together — the offset is dispersion, the glass gets a coloured rim. Scales
40–60 with 2–8 between channels; more reads as a broken screen.

```html
<feImage result="map"/><feDisplacementMap in="SourceGraphic" in2="map" scale="52"
  xChannelSelector="R" yChannelSelector="B" result="r"/>
```
⚠ Without `color-interpolation-filters="sRGB"` the whole pane shifts. Blur the
result 0.5–1px to hide displacement stair-steps, and ship a plain `blur()` tier —
several engines parse `url()` here and render nothing.

Name the whole chain as one custom property rather than repeating it. Every tier
this already owes — a plain `blur()` where `url()` renders nothing, `none` under
`prefers-reduced-transparency` — becomes one declaration instead of a prefixed
pair rewritten per branch, and the opaque ground that has to arrive with the last
one sits in the same rule.
```css
.glass { --refract: url(#lens) blur(2px) saturate(180%) brightness(104%);
         -webkit-backdrop-filter: var(--refract); backdrop-filter: var(--refract) }
@media (prefers-reduced-transparency: reduce) {
  .glass { --refract: none; background: var(--raised) } }
```
⚠ Both declarations must read the same variable. Split across two properties, a
branch moves only one of them and the panel refracts in one engine while it
blurs in the other — the exact failure the prefix pair exists to prevent.

On a small element the stated 40–60 turns the backdrop to mush: displacement is
in user units, not a proportion of the box, so a 40px-tall pill bends the
backdrop further than its own height. Scale it to the geometry instead —
roughly 0.15–0.25 of the short side, which lands at 15–25 on a chip and only
reaches 40–60 once the pane is 200px or wider.
```html
<feDisplacementMap scale="19" xChannelSelector="R" yChannelSelector="B"/>
```
⚠ Equal scales on all three channels is a setting, not a mistake — it drops the
dispersion and leaves pure refraction, which is what thick colourless glass
does. Reach for the split only when the object is meant to read as a prism.
