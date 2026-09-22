---
id: screen-composited-understroke
category: canvas
tags: [canvas,light,stroke,effect,depth,cheap]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Canvas 2D has no cheap blur, so a glowing stroke is built from passes rather
than filters. Stroke the same path twice under an additive composite — once wide
and nearly transparent, once thin and full — and the overlap accumulates into a
bright core with a soft falloff for the cost of one extra `stroke()`. `screen`
saturates toward white and cannot blow out; `lighter` adds linearly and clips
sooner but burns hotter. Understroke 4–6× the core at alpha .08–.2.

```js
ctx.globalCompositeOperation = 'screen'
ctx.lineWidth = 5;    ctx.globalAlpha = .14; ctx.stroke(p)
ctx.lineWidth = 1.15; ctx.globalAlpha = 1;   ctx.stroke(p)
ctx.globalCompositeOperation = 'source-over'
```
⚠ Both modes brighten what is already there, so the glow vanishes on a light
ground — dark stages only. Restore `source-over` in the same block: a left-set
mode silently recolours every later draw.

Branch the operator on the ground rather than ruling the light theme out. Read
the theme once and pick operator, ink *and* alpha together: the additive branch
wants a low per-mark alpha so overlap is what brightens, while the same value
under `source-over` reads far heavier because marks occlude instead of
accumulating. One canvas then serves both themes with no second code path.
Additive .2–.4, opaque .5–.8.
```js
const dark = root.classList.contains('dark')
ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over'
ctx.globalAlpha = dark ? .3 : .6
ctx.fillStyle   = dark ? '#eeebe6' : '#5c544a'
```
⚠ Porting only the operator and keeping the additive alpha gives a light theme
that looks under-inked and a dark one that looks muddy — the pair is the setting.

Drop the operator entirely and the same construction moves to SVG, which is what
makes it usable on paper. Draw one `d` as three coincident `<path>`s composed by
plain source-over alpha: widest and faintest, a core at a quarter of that width,
then a mid pass carrying most of the ink. Nothing brightens, so the falloff
reads as ink soaking outward rather than as light. Alphas compose as
`1 − Π(1 − αᵢ)`, not as a sum — budget the stack's total, then distribute.
```svg
<g stroke="currentColor" fill="none">
  <path d="…" stroke-width="2.4" opacity=".013"/>
  <path d="…" stroke-width="0.6" opacity=".026"/>
  <path d="…" stroke-width="1.0" opacity=".13"/></g>
```
⚠ Three nodes per line — fine for tens of lines, not thousands. The `d` must be
identical in all three or the passes separate into visible parallel strokes on
the first edit; author it once and clone, or drive all three from one `<use>`.
