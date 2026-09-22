---
id: gamut-ladder-fallback
category: color
tags: [color,tokens,progressive-enhancement,correctness]
axes: none
cost: 1
seen: 19
requires: []
conflicts: []
completes: []
tension: []
---
Ship every colour token twice: an sRGB hex baseline, then the wide-gamut value
inside a `@supports` probe. The probe is the smallest legal expression in the
feature itself, so it tests parsing rather than a version — the colour space and
the colour function need one each. Run the ladder over the token block, never per
component: one upgrade carries the system, and a browser that fails it keeps a
colour somebody authored rather than one the engine clamped.

```css
:root { --accent: #00d294 }
@supports (color: lab(0% 0 0)) { :root { --accent: lab(75% -60 19) } }
```
⚠ Convert, never re-pick — the two must match on an sRGB display or the fallback
becomes a second palette.

The same ladder over a *derived* value fails harder. When the upgrade is a mix
down to a few percent and the baseline is the ingredient, a browser that misses
the probe paints the mix at full strength — a 5% hairline arrives opaque. Author
the baseline as the pre-computed result, never the thing being mixed.
```css
:root { --rule: #ffffff0d }
@supports (color: color-mix(in oklab, red, red)) {
  :root { --rule: color-mix(in oklab, var(--fg) 5%, transparent) }
}
```
⚠ Proportions under ~10% are where this bites: the fallback is not slightly
wrong, it is an order of magnitude too strong, and it passes review on any
browser that supports the feature.

Re-declaring the token is not the only polarity. Author both values as *twin*
tokens — `--x` wide-gamut, `--x-srgb` the converted baseline — and let a single
`@supports not` block reorder the `var()` chain the consumers read, so the
fallback wins by preference rather than by overwrite. Both values then stay
reachable by name, which is what a canvas `fillStyle`, an SVG attribute or an
exported asset needs; and because each is authored rather than derived, the
under-10% mix failure above cannot occur.
```css
.t                                     { color: var(--fg) }
@supports not (color: color(display-p3 1 1 1)) {
  .t                                   { color: var(--fg-srgb, var(--fg)) } }
```
⚠ Twin tokens double the surface that can drift. Generate the sRGB side from
the wide one at build time; two hand-maintained palettes diverge within a
release.

The ladder is not limited to two rungs. Stack the probes cheapest-to-richest —
hex, then the perceptual space, then the explicit wide-gamut primary — each
re-declaring the same token in source order, and a browser stops at whichever
rung it can parse. The middle rung is the one that earns the third block: many
engines take `oklch` and refuse `color(display-p3 …)`, and without it they fall
all the way back to the clamped hex.
```css
:root { --brand: #fff }
@supports (color: oklch(0% 0 0))          { :root { --brand: oklch(100% 0 0) } }
@supports (color: color(display-p3 1 1 1)){ :root { --brand: color(display-p3 1 1 1) } }
```
⚠ Order is the whole mechanism — the blocks have equal specificity, so a richer
rung written above a poorer one is silently overwritten by it.
