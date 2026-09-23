---
id: flow-preserved-step-reveal
category: reveal
tags: [reveal,text,steps,clip-path,typing,layout-safety]
axes: {energy: 3, density: 2, weight: 2, finish: 3}
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
A left-to-right text reveal animated on `width` leaves normal flow: the element
needs `white-space: nowrap`, its settled width is the content's rather than the
container's, and `overflow: hidden` then clips the tail permanently wherever the
line no longer fits. Animate `clip-path: inset()` in `steps(n)` instead — the box
keeps the size and wrapping it would have had, nothing reflows as it plays, and
`n` at the rendered character count makes one step one glyph. Steps 20–60; under
about 12 the quantisation reads as chunks rather than as typing.

```css
@keyframes ink { from { clip-path: inset(0 100% 0 0) } to { clip-path: inset(0) } }
.line { animation: ink 1.6s steps(34) .3s backwards }
```
⚠ A clip uncovers every wrapped line at once, so this only reads as typing on a
single line. Land at `inset(0)` under reduced motion — a heading whose animation
never runs is otherwise clipped to nothing and unreadable.

Where the run must wrap across several lines, or carry a live caret, the clip
cannot do it and the text has to be typed in script — which means the node is
empty or wrong for the whole run. Put the finished string on the element as its
label *before* emptying it and hide the mutating text, so assistive technology
reads the settled line once instead of a character at a time. A constant
per-character interval is the tell; draw it from a small band and lengthen it
after punctuation. 24–46ms a character, 55–90ms extra after a full stop.
```js
el.setAttribute('aria-label', text); el.setAttribute('aria-hidden', 'false')
inner.ariaHidden = 'true'; inner.textContent = ''
const gap = c => (c === ' ' ? 22 : 28 + Math.random() * 18) + (/[.,]/.test(c) ? 60 : 0)
```
⚠ Bail before emptying anything under `prefers-reduced-motion` — a typewriter
gated after the text is cleared leaves a blank element forever. Reserve the
block's settled height first or every line below it jumps as the run lands.

Where the revealed run is a *known* character count — a two-letter suffix, a
fixed unit, a padded ordinal — `width` is safe again and cheaper than the clip.
`ch` makes the settled width authored rather than measured, so nothing is read
back from layout and the box is correct before the animation runs; `steps(n)`
with n set to that count lands one glyph per step. `white-space: pre` keeps a
leading space and a baseline-aligned inline-block keeps the run on its line.
```css
.typed { display: inline-block; vertical-align: bottom; white-space: pre;
  width: 0; overflow: hidden; animation: type .18s steps(2, end) .15s forwards }
@keyframes type { to { width: 2ch } }
```
⚠ `ch` is the advance of `0` in that face, which equals the character width only
in a monospace — in a proportional face measure the actual string and re-check
it whenever the face changes.

Where the run being typed carries inline emphasis — an italic clause, a marked
term — do not type through a DOM of styled spans: every frame would have to
slice across element boundaries and the tail's styling appears before its text
does. Hold the string plain, express the style boundary as a character *offset*
into it, and re-derive the runs each frame from the current length. Before the
offset there is one run, after it two, and the emphasis can never lead the
glyphs that carry it. The same offset survives a retimed or reversed pass
because it indexes content, not markup.
```js
const head = typed.slice(0, emFrom), tail = typed.length > emFrom ? typed.slice(emFrom) : ''
el.replaceChildren(head, tail && Object.assign(document.createElement('em'), { textContent: tail }))
```
⚠ Offsets are positions in a specific string — they go silently wrong under
translation or a copy edit, so keep the boundary beside the text it indexes.
Inherit the weight explicitly on the emphasis element: a light display face
whose italic is only supplied at regular will jump a step at the seam.

Where the run wraps and must still ink in reading order with no script, keep it
`display: inline` and sweep a background clipped to the glyphs. An inline box's
fragments share one background strip laid end to end, so `background-size`
growing 0→100% fills line one, then line two, with the text node intact and the
box at its settled size throughout. Stack a faint second layer at full size to
ghost the unwritten tail. Sweep 1.5–4s; ghost alpha .12–.3.
```css
.run { display: inline; color: transparent;
  background: linear-gradient(#111 0 0) no-repeat 0 0 / 0% 100%, linear-gradient(#1112 0 0);
  -webkit-background-clip: text; background-clip: text; animation: ink 3s ease-in-out both }
@keyframes ink { to { background-size: 100% 100%, auto } }
```
⚠ `box-decoration-break: clone` restarts the strip per line and breaks the
sequence. Ink below 4.5:1 is unreadable mid-sweep — land it fully under reduce.

Do not mark the typing node `aria-live`. A live region re-announces on every
text mutation, so a script-typed line is read out as a stutter of fragments —
or, with `polite` queuing, as the first few letters and then nothing. The
settled string belongs in the label above; the mutating run stays hidden.
