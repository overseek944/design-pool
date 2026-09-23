---
id: char-count-stepped-reveal
category: type
tags: [type,motion,css-only,custom-properties,keyframes]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 14
requires: []
conflicts: []
completes: []
tension: []
---
A per-character reveal is one number. Publish the character count as a custom
property and derive both the step count and the final width from it, so the
reveal lands exactly on glyph boundaries and the two cannot drift when the string
changes. The duration comes off the same number at 25–60ms a character. Hold the
caret's blink while the line is typing — one thing moving at a time.
```css
.line { width: 0; overflow: hidden; display: inline-block;
  animation: type calc(var(--chars) * 40ms) steps(var(--chars), end) forwards }
@keyframes type { to { width: calc(var(--chars) * 1ch) } }
```
⚠ `1ch` is one advance only in a monospace face; anything proportional stops
mid-glyph. The string is fully in the DOM the whole time and is announced
complete at once, so this is a reveal for effect, never for withholding.

Step a clip rather than a width and the reveal leaves the layout thread: `width`
relays out the line on every step, `clip-path` composites. It also survives a
proportional face and more than one line. The trade is that the steps now divide
the box evenly instead of landing on glyph advances, so an edge can sit
mid-glyph for a frame — hold the box at its final width from frame one, or the
reservation and the reveal fight each other.
```css
.line { animation: type calc(var(--chars) * 40ms) steps(var(--chars), end) both }
@keyframes type { from { clip-path: inset(0 100% 0 0) } }
```

Uniform steps are the tell when a line should read as typed by a hand rather
than printed by a machine, and that case is the one worth paying script for.
Write a character per timeout with the delay redrawn each time, 25–60ms, and
hold the result 300–600ms past the last glyph so the line is visibly finished
before its consequence appears.
```js
const type = () => { el.textContent = TEXT.slice(0, ++i)
  if (i <= TEXT.length) setTimeout(type, 26 + Math.random() * 34) }
```
⚠ Never inside a live region: a per-character write is announced per character.
Under reduced motion put the finished string in the DOM and skip the pass — a
typing effect has nothing to degrade to but its own result.

The caret the reveal needs is four declarations, and the one that matters is
`steps(1)`: a terminal caret is a square wave, and an eased opacity fade reads
as a pulsing dot instead. Size it in `em` off the text it trails and pull it
back onto the baseline with a small negative `vertical-align`, so it tracks
every size the line is ever set at; `currentColor` keeps it on the ink.
Height 0.85–1em, width 1–2px, period 0.7–1.1s.
```css
.caret { display: inline-block; width: 2px; height: .9em; vertical-align: -.12em;
         background: currentColor; animation: blink .8s steps(1) infinite }
@keyframes blink { 50% { opacity: 0 } }
```
⚠ It is the one blink a reduced-motion branch should slow rather than stop — a
caret that holds still stops reading as a caret.

Across more than one line the caret is one node that *moves*, not one per line:
type a line, then re-insert the same element after the next one so the cursor
walks down the block the way a terminal does. The pause between lines is its own
number, longer than the per-character delay — 150–300ms — or the break reads as
a slow character rather than as a return.
```js
lines[++i] && lines[i].insertAdjacentElement('afterend', caret)
setTimeout(next, 220)                                    // between lines
```

Split lines also decide how the heading is announced. Put the whole string in
`aria-label` on the container and `aria-hidden` on every line, and the reveal
has no accessible presence at all: the heading is announced once, complete, at
whatever moment the reader reaches it, and the script is free to empty and
refill the visible nodes. It also makes the reduced-motion branch a pure return
— leave the text in place and never start.
```html
<h1 data-type aria-label="Built for the whole pipeline">
  <span aria-hidden="true"><span data-text="Built for">Built for</span></span>
```
⚠ The authored text must ship inside the spans as well, not only in the
attribute — script that never runs then leaves a finished heading rather than an
empty one, and the label is the duplicate instead of the source.

The bar is one of two carets and the narrower one. Where the line should read as
a terminal rather than as a text field, widen the mark to a filled block a
little under half an em and keep every other value: still `em`-sized, still
`currentColor`, still `steps(1)`. The block is the tell that the text is machine
output, so it belongs on a streamed or replayed result and not on a headline
that only happens to type in. Width .4–.5em against .85–1em of height.
```css
.caret--block { width: .45em; height: .95em; vertical-align: -.1em }
```
⚠ A block that keeps blinking after the last glyph reads as a prompt awaiting
input — remove it on completion rather than leaving it parked.

Where the text arrives from a renderer rather than a script — streamed markdown
re-rendered on every chunk — there is no node to move. Hang the caret off the
container's last block as generated content: whichever paragraph, item or code
block was appended last carries it, and it walks forward with no bookkeeping.
Same `steps` blink, 0.9–1.2s.
```css
.streaming > :last-child::after { content: ""; display: inline-block; width: .45em;
  height: .95em; vertical-align: -.1em; background: currentColor;
  animation: blink 1s step-end infinite }
```
⚠ A last child that is a list or table puts the caret after the block, not the
text — descend with `:last-child:is(ul,ol) > li:last-child::after`.

An underscore rather than a bar or block puts the caret on the baseline, where
it reads as a terminal awaiting input without covering the next glyph's slot.
Set it wide — 0.5–0.7em by 0.08–0.12em — and let it pulse a soft
`text-shadow`/glow in `currentColor` with its opacity, 0.9 down to 0.3–0.4 over
1–1.4s: the glow is what keeps an eased caret reading as lit rather than fading.
```css
.caret--under { width: .6em; height: .1em; vertical-align: -.1em; background: currentColor;
  box-shadow: 0 0 .25em currentColor; animation: glow 1.2s ease-in-out infinite }
```
