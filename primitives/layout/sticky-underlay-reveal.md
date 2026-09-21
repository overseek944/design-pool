---
id: sticky-underlay-reveal
category: layout
tags: [layout,scroll,sticky,depth,css-only,section]
axes: {energy: 2, density: 1, weight: 3, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: [overflow-clip-over-hidden]
tension: []
---
Invert the usual arrival: a panel placed *after* the content and stuck to the
bottom of the viewport is uncovered by the content scrolling off it, rather than
sliding in. Nothing animates and nothing is measured. Round the content's bottom
corners and pull it down over the panel by that radius, and the seam reads as a
lip lifting away instead of two blocks meeting. Panel height 150px–60svh.

```css
.wrap    { overflow: clip; isolation: isolate }
.content { position: relative; z-index: 1; border-radius: 0 0 var(--lip) var(--lip) }
.under   { position: sticky; bottom: 0; height: clamp(150px, 34vw, 60svh);
           margin-top: calc(-1 * var(--lip)); padding-top: var(--lip) }
```
⚠ `overflow: hidden` on the wrapper makes it the sticky scroll container and the
panel never sticks; `clip` does not. Drop to `position: relative` under
`prefers-reduced-motion` — the two layers travel at different rates.

Derive the panel's height from what it holds rather than clamping it
independently. Where it exists to carry one oversized word, make the type size
the token and compute the height from it — size × line-height plus breathing
room — and the band fits the mark at every width instead of cropping it on a
phone and stranding it on a desktop.
```css
:root  { --mark: clamp(5rem, 21vw, 19rem); --band: calc(var(--mark) * .78 + 3rem) }
.under { height: var(--band) }  .mark { font-size: var(--mark); line-height: .78 }
```
⚠ The multiplier is the type's line-height, not a guess — change one and the
other has to follow.

Run the same seam forward — stage first and pinned, the next section rising over
it — and the shadow has to be cast *upward*, which `box-shadow` will only do if
the spread is pulled negative past the blur so the offset clears the box on one
side alone. Round the riser's top corners only and overlap it by a pixel;
without that the two grounds leave a hairline of the stage showing at fractional
zoom. Offset 32–56px, blur 2–2.5× it, spread just under the blur.
```css
.rise { position: relative; z-index: 2; margin-top: -1px;
        border-radius: var(--lip) var(--lip) 0 0;
        box-shadow: 0 -42px 96px -44px rgb(0 0 0 / .88) }
```
⚠ A spread less negative than the blur leaks the shadow out of the other three
sides, where it has nothing to fall on and reads as a smudge.
