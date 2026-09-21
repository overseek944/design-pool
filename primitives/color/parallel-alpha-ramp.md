---
id: parallel-alpha-ramp
category: color
tags: [color,tokens,alpha,borders,theming]
axes: none
cost: 2
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
Ship two neutral ramps of equal length: one opaque, one alpha-only. Text,
solid fills and anything that must hold a contrast ratio read the opaque ramp.
Borders, hover washes and rings read the alpha one, because those land on
images, gradients and nested surfaces whose colour is not knowable when the
token is authored. One extra ramp removes the whole class of bug where a
hairline vanishes over a screenshot.

```css
--gray-200:       #eaeaea;    /* opaque: text, solid fills */
--gray-alpha-200: #00000014;  /* alpha:  borders, hovers, rings */
.card { border: 1px solid var(--gray-alpha-400) }
```
⚠ Alpha steps do not map one-to-one onto their opaque siblings — .05–.15 for
washes, .2–.5 for borders, .6+ before anything reads as text weight. Never
derive a contrast ratio from an alpha token; its backdrop is unknown by design.

Derive the alpha ramp instead of authoring it: `color-mix()` against the
foreground token gives one ladder that inverts with the theme for free.
```css
--alpha-3: color-mix(in srgb, var(--fg) 12%, transparent)   /* 2–35% */
```
⚠ Where `color-mix` is unsupported the whole ladder is invalid and every border
vanishes — declare a flat `var(--fg)` fallback first.

The ladder is not symmetric across the two grounds it inverts between. A white
rule at 5% on near-black is visibly stronger than a black rule at 5% on
near-white, because the same alpha buys more contrast against a dark field —
so a texture, hairline or wash tuned in one theme arrives loud or invisible in
the other. Author the light-on-dark steps at roughly half their dark-on-light
siblings and check both, rather than deriving one from the other and trusting
the arithmetic.
```css
:root            { --rule: oklch(25% 0 0 / .055) }    /* dark on light */
[data-theme=night] { --rule: oklch(100% 0 0 / .025) } /* light on dark: ~half */
```
⚠ This is the one place a `color-mix` against the foreground token is wrong: it
inverts the hue correctly and the *strength* not at all.
