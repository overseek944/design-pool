---
id: column-registered-overlay-chrome
category: layout
tags: [layout,overlay,alignment,correctness,chrome]
axes: none
cost: 1
seen: 7
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

Registering to a rail's *edge* places a box beside the column; registering to a
track's *centre* places a mark inside a track it is not a child of — a logomark
centred in the apparatus gutter while living in a fixed header that has no such
grid. Publish the track width as a token and derive both coordinates from it, so
the painted guide, the `grid-template-columns` value and the escaped element all
resolve from one number. Written as a literal it appears once per grid and twice
per `calc()`, and the mark drifts off the gutter the first time any of them is
retuned. Gutter track 56–96px.
```css
:root { --rail: max(var(--gutter), calc(50vw - var(--content) / 2)); --track: 78px }
.grid { grid-template-columns: var(--track) minmax(0, 1fr) }
.mark { position: absolute; left: calc(var(--rail) + var(--track) / 2);
        translate: -50% -50% }
```
⚠ The escaped element is out of flow, so nothing reserves its width — the track
holds the gap only while the grid is what sets it. Below the breakpoint where
the gutter track collapses, clear the offset rather than letting it resolve
against a rail that is now the page margin.

Registering to the column's edge is right for chrome and wrong for decoration.
Past the cap the gutter grows at half the viewport's rate, so anything glued to
that edge migrates into the screen corners and the composition comes apart on a
wide display. Add a second clamped term that spends only a *fraction* of the
surplus and then stops: the element hugs the column while the page is small and
drifts a bounded distance further out once the column is capped, never more.
Fraction 0.2–0.35 of the surplus, ceiling 300–550px.
```css
.deco { left: calc(clamp(14px, (100vw - 940px) * .17 + 14px, 100px)
              + clamp(0px, (100vw - 1440px) * .26, 520px)) }
```
⚠ Put its `transform-origin` on the edge facing the column. A decoration that
also scales up with the viewport otherwise grows back across the text it was
moved out of, and the two rules fight at exactly the widths there is most room.
