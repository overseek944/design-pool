---
id: column-registered-overlay-chrome
category: layout
tags: [layout,overlay,alignment,correctness,chrome]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Chrome floating over a full-bleed stage — a stat strip, a scrub rail, a caption —
should start on the same line as the centred column below it, or the page runs
two rhythms. Reuse the column's own rule and add `inset-inline: 0`: auto inline
margins are ignored on an absolutely positioned box while either offset is
`auto`, so the wrapper silently left-aligns until both are set. With no wrapper
to reuse, offset onto the column directly — the `max()` is what stops that value
going negative once the viewport drops under the cap.

```css
.overlay { position: absolute; inset-inline: 0; margin-inline: auto;
           width: min(100% - 2 * var(--gutter), var(--max)) }
.rail    { position: absolute; inset-inline: max(var(--gutter), 50% - var(--max) / 2) }
```
⚠ `--max` 1040–1280px, gutter 20–28px — and the same pair the column uses, or
the two drift at the next edit.

Registering to the column's *edge* is a closed form; registering to a point
inside it often is not — centred between a word in the headline and a control in
the header, say — and that has to be measured. Do both. Write the closed-form
approximation in CSS so the element is roughly right on the first paint, then let
script correct it from two `getBoundingClientRect()` reads on load and on resize.
Nothing arrives from a default position, and a script that never runs leaves a
defensible one.
```css
.rail { right: max(0px, calc((100vw - var(--max)) / 2 + var(--off) - var(--w) / 2)) }
```
```js
el.style.right = `${innerWidth - (a.getBoundingClientRect().right
  + b.getBoundingClientRect().right) / 2 - el.offsetWidth / 2}px`
```
⚠ The two have to agree within a few pixels across the widths the CSS covers, or
the correction is a visible twitch on every load. At the breakpoints where the
closed form is already the answer, clear the inline value rather than
recomputing it.

A floating *control* in a corner wants three constraints in one `max()`, not
one: a design floor, the device inset, and the column edge — and the column
term has to be reduced by the control's own footprint, or it parks on the
reading column instead of beside it. Below the cap the third term goes
negative and the floor takes over, which is the behaviour wanted anyway.
Publish it once and let every corner control read it.
```css
:root { --rail-x: max(calc((100% - var(--content)) / 2), 8px) }
.corner { right: max(20px, env(safe-area-inset-right), calc(var(--rail-x) - 65px));
          bottom: max(20px, env(safe-area-inset-bottom)) }
```
⚠ Two controls sharing the corner must offset from the same token, not from each
other — chaining one off the other's width breaks the moment either resizes.
