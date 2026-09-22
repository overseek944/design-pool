---
id: parallel-alpha-ramp
category: color
tags: [color,tokens,alpha,borders,theming]
axes: none
cost: 2
seen: 17
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

The accent needs the same pair as the neutrals, and usually does not get one.
Washes behind a selected row, focus rings and chip fills are authored by mixing
the brand colour toward the page ground, which is a different colour in the
other theme and a photograph inside a card — so the wash that read as a tint
arrives as a smear. One alpha companion beside the solid token fixes every such
use, and it is a single value, not a ladder: 8–15% is the whole useful range for
a wash, 20–30% for a ring.
```css
--accent:      #3d5afe;
--accent-soft: #3d5afe1a;   /* 10% — washes, rings, chip fills */
```
⚠ The solid token stays the only one allowed to carry text or an icon. An accent
at 10% over an unknown backdrop has no contrast ratio to quote, which is the
point of it and also its limit.

The "single value, not a ladder" rule above holds for UI washes and breaks for
line art. A schematic drawn in one accent needs that hue at several strengths at
once — structure line, faint construction guide, hatch fill, halo, ghosted
inactive part — and picking them per figure is how a set of thumbnails stops
reading as one drawing system. Name the rungs by role rather than by number, so
a figure declares intent and not opacity, and re-author the dark branch instead
of deriving it. Five to seven roles, 8–45% across the set.
```css
--ink-solid: #6c3bff;    --ink-hair: #6c3bff66;   /* 40% — structure */
--ink-hatch: #6c3bff4d;  --ink-guide: #6c3bff3d;  /* 24% — construction */
--ink-halo:  #6c3bff1f;  --ink-ghost: #6c3bff17;  /*  9% — inactive */
```
⚠ Only the solid rung may carry a label or an arrowhead. Guide and ghost sit
under 4.5:1 against every ground by design, so nothing a reader must identify
can be drawn in them alone.
