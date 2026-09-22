---
id: utility-scale-token-reclamation
category: color
tags: [color,tokens,theming,architecture,correctness]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A codebase committed to a utility framework has its palette frozen in markup:
thousands of `text-white` and `text-gray-400` call sites, none of them
themeable. Reclaim them in one stylesheet loaded after the framework —
redeclare each generated colour utility as a read of a semantic token, and the
whole palette swaps from one `:root` block with no markup touched. Collapse the
framework's grey ramp onto a shorter prominence ladder of three to five steps
rather than mapping one to one; the extra steps were never carrying
distinctions.

```css
:root { --fg-strong: #ebdbb2; --fg-muted: #bdae93 }
.text-white { color: var(--fg-strong) !important }
.text-gray-400, .text-gray-500 { color: var(--fg-muted) !important }
```
⚠ Collapsing the ramp merges shades that sat side by side somewhere — find
those pairs before shipping. Any utility whose contrast assumption inverts needs
re-pinning too: a label that was white on a dark accent is unreadable the moment
the accent turns light.

Geometry reclaims the same way, and scoping it beats `!important`. Wrap the
framework's generated scale in `:where()` under a skin class: the selector keeps
the specificity of the class alone, so the utilities lose without being fought,
and two skins can hold different geometry on one page — which the global
`!important` form cannot do. One ancestor class then turns a whole region from
soft to hard-edged with no markup touched. Flatten to 0–3px, or to a single
smaller step.
```css
.skin-crisp :where(.rounded-sm, .rounded-md, .rounded-lg, .rounded-xl, .rounded-2xl),
.skin-crisp :where(input, textarea, select, button) { border-radius: 2px }
```
⚠ Include the bare elements as well as the utilities — form controls carry a UA
radius no utility class was ever applied to, and they are what gives a flattened
region away. An arbitrary-value utility written inline still wins; those have to
be found by hand.

A whole-theme polarity flip needs neither `!important` nor a rule per utility.
The framework's ramp is itself a token block, so redeclare it *reversed* —
rung 100 takes the ink, rung 950 the paper — and every `bg-*-900` authored
dark-first resolves light-first with the markup untouched. One block inverts
an entire application, and the semantic direction survives: what was the
furthest from the ground still is.
```css
@layer theme { :root {
  --color-slate-100: #17251f;   /* was the near-white rung */
  --color-slate-950: #fbfdf9 }} /* was the near-black one  */
```
⚠ Contrast does not invert with it — a pairing that cleared 4.5:1 dark can
fail light, and the accents keep their own lightness while the neutrals move.
Re-score every ink-on-fill pair, and collapse rungs deliberately rather than
letting two reversed steps land on one hex by accident.
