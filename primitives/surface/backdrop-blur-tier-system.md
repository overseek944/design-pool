---
id: backdrop-blur-tier-system
category: surface
tags: [surface,depth,glass]
axes: {energy: 1, density: 3, weight: 3, finish: 4}
cost: 3
seen: 23
requires: []
conflicts: []
completes: []
tension: []
---
Treat backdrop blur as a depth scale, not a decoration: `sm` for inline chips,
`md` for cards and nav, `xl` for full overlays. Consistent blur radius per
elevation tier is what makes layered translucency read as a spatial system.
⚠ always pair with a semi-opaque background — blur alone fails contrast.

Variant — put `saturate(1.4–1.8)` before the blur. Blur averages neighbouring
pixels and drains colour with it; the saturate pass restores what the blur ate,
which is the difference between glass and frosted plastic. Useful radii run
4–32px across the tiers.

Tiers can trade places rather than stack. A bar that is a full-width `sm` plate
at rest and an inset `xl` capsule once scrolled should move the glass between
the two layers — outer to transparent as the inner plate takes it up — so only
one element is compositing a backdrop filter at any moment.

On a dark ground add `brightness(1.05–1.12)` after the saturate. Blur over dark
content averages toward the ground and the plate sinks into it; the brightness
pass lifts it back to reading as a layer above, which is the one thing the blur
was meant to say. Above ~1.15 the text behind the glass starts to ghost through.

Declare the opaque panel as the base rule and add the glass only inside
`@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))`.
Both fallbacks then come free from one value: no support and
`prefers-reduced-transparency: reduce` land on the same declaration, and neither
path restates the opaque background in a third place to drift out of sync. The
reduced branch has to name `backdrop-filter: none` *and* the alpha, since the
`@supports` block already won on specificity.
```css
.panel { background: rgb(28 21 18 / 1) }
@supports (backdrop-filter: blur(1px)) {
  .panel { background: rgb(28 21 18 / .6); backdrop-filter: blur(14px) saturate(1.4) } }
@media (prefers-reduced-transparency: reduce) {
  .panel { background: rgb(28 21 18 / 1); backdrop-filter: none } }
```

Put the filter on a `z-index: -1` pseudo-element, not on the bar itself.
`backdrop-filter` opens a stacking context *and* a containing block for fixed
descendants, so a dropdown or popover anchored inside the bar is trapped by the
very rule that frosted it. The pseudo also lets the plate overshoot the bar's
edge and be masked, so the blur dissolves rather than ending on a ruled line —
overshoot and fade distance the same value, 0.75–1.5rem.
```css
.bar::before { content: ""; position: absolute; inset: 0 0 -1rem; z-index: -1;
  pointer-events: none; backdrop-filter: blur(12px);
  mask-image: linear-gradient(#000 calc(100% - 1rem), #0000) }
```
⚠ The bar needs `isolation: isolate`, or `z-index: -1` drops the plate behind
the page background instead of behind the bar's own content.
