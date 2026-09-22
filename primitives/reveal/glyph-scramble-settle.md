---
id: glyph-scramble-settle
category: reveal
tags: [type,reveal,motion,technical,text]
axes: {energy: 4, density: 3, weight: 2, finish: 3}
cost: 2
seen: 13
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Resolve a label out of noise rather than fading it in: hold the final string
length from the first frame and fill every unresolved slot from a small fixed
glyph pool, letting the settled prefix grow left to right. Constant length
means no reflow, and the register lands as machine rather than ornament. Scale
duration with length — about 220ms plus 20ms per character, capped near 650ms —
and leave spaces intact so word shapes hold.

```js
const G = "▓▒░#/\\|<>+=-", keep = Math.floor(p * n)
el.textContent = s.slice(0, keep) + [...s.slice(keep)]
  .map(c => c === " " ? " " : G[Math.random() * G.length | 0]).join("")
```
⚠ Rewriting `textContent` destroys child markup and fights any runtime
translation layer. Restore the source string exactly on the last frame, run
once, and keep it off anything that must be read aloud.

The ⚠ above is avoidable: collect the block's text *nodes* with a `TreeWalker`
and scramble each in place, and every link, emphasis and inline span inside the
run survives untouched. Leave spaces and newlines alone so the wrap geometry
never changes, lock the measured height for the duration, and mark the element
`aria-busy` while it runs. Frame count from the total character count —
`clamp(18, chars * 2, 90)` — so a caption and a paragraph both settle in a
readable time.
```js
const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = []
for (let n; (n = w.nextNode()); ) nodes.push({ n, src: n.nodeValue })
el.style.minHeight = el.offsetHeight + 'px'; el.setAttribute('aria-busy', 'true')
```
⚠ Restore every node's original string on the final frame and clear both the
height lock and `aria-busy`, or a translation layer and the next resize both
inherit the scramble.

Constant *length* is not constant *width* in a proportional face — the string
twitches horizontally for the whole run. Measure every candidate glyph once on a
canvas at the computed font, then substitute only within a width band of about
2% of the font size. The scramble holds still, keeps the real face instead of a
symbol pool, and needs no width lock. Resolve each slot at a position-derived
point of one tween — `.15 + (i + 1) / n * .85` — so the word settles left to
right without per-character timelines.
```js
const w = {}; for (const c of POOL) w[c] = ctx.measureText(c).width
const swap = c => POOL.filter(x => Math.abs(w[x] - w[c]) <= .02 * size)
```
⚠ Measure after the webfont resolves; the fallback's metrics band differently.

Colouring the two halves differently makes the settle front legible without
raising the noise: split at the resolved index into two spans and tint the
unresolved tail — an accent, or the text colour at 40–60% — while the settled
prefix is already final. The run reads as resolution rather than as flicker even
at sizes where the substituted glyphs barely differ in shape, and a string too
short to show a cascade still shows direction.
```html
<span aria-label="…"><span aria-hidden="true">Resolv<i class="tail">#/x|</i></span></span>
```
⚠ Keep the tail above the contrast floor for the whole run — it is on screen long
enough to be read, and it is the half that is not yet the real string.

There is a structural answer to the width lock, the `TreeWalker` and the
translation hazard together: never touch the original. Set it `color:
transparent` so it keeps its box, its wrap geometry, its child markup and its
accessible text, then append one `aria-hidden` absolutely-positioned span that
inherits `font`, `letter-spacing` and `white-space: pre` and scramble *that*.
Restore is removing a node and two inline styles. Swap only a fraction of the
slots per tick — 15–30% — so the string stays readable while it churns.
```css
.scramble-overlay { position: absolute; inset: 0 auto auto 0; width: max-content;
  font: inherit; letter-spacing: inherit; white-space: pre; pointer-events: none }
```
⚠ The overlay is only in register while the run is one line — on a wrapping
block it stacks on the first line. Cap it at single-line labels and headings.
