---
id: safe-area-floor-gutter
category: layout
tags: [layout,tokens,safe-area,responsive,correctness]
axes: none
cost: 1
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
A gutter written as a plain value gets eaten by notches, rounded corners and
gesture bars; a gutter written as `env()` alone collapses to zero on every
device without insets. Take the larger of the two, resolve each side
independently, and ship the result as the token every section reads — the
design value becomes a floor the hardware can only raise. Design value 16–32px
narrow, up to 80px wide.
```css
:root { --gutter: 32px;
  --pad-i: max(env(safe-area-inset-left),  var(--gutter));
  --pad-e: max(env(safe-area-inset-right), var(--gutter)) }
.section { padding-inline: var(--pad-i) var(--pad-e) }
```
⚠ `env()` resolves to zero unless the document ships `viewport-fit=cover`, and
landscape is where insets actually bite — test there, not portrait.

`max()` is the rule for a gutter and the wrong one for anything the reader must
reach. Where the inset marks an area the hardware *takes* — a gesture bar under
a docked action row, a notch over a close button — add instead of maximising:
`max()` lets a 34px bar consume the whole 32px design value and the control ends
up flush against it, while the sum keeps the designed breathing room above
whatever the device claims. Gutters clamp, docked chrome accumulates.
```css
.dock { padding-block-end: calc(12px + env(safe-area-inset-bottom)) }
```
⚠ Accumulating on a full-height panel costs real estate: subtract the same
`env()` from its height (`calc(100dvh - var(--bar) - env(safe-area-inset-bottom))`)
or the last row sits below the fold on exactly the devices that have insets.

`max()` and `calc(+)` are two different intents and the choice is not stylistic.
A floating element only has to clear the hardware, so the design value is a floor
and `max()` is right. A bottom-docked bar's padding is content spacing that the
inset must be added *to* — take the larger there and a device with a gesture bar
loses the bar's own internal breathing room to the hardware. Same for the page's
scroll floor under fixed chrome.
```css
.toast { inset-block-end: max(1rem, env(safe-area-inset-bottom, 0px)) }
.dock  { padding-block-end: calc(1rem + env(safe-area-inset-bottom, 0px)) }
```
⚠ Always supply the `0px` fallback. `env()` with no second argument makes the
whole declaration invalid where the variable is unknown, taking the design value
down with it.
