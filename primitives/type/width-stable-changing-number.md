---
id: width-stable-changing-number
category: type
tags: [numerals,data,motion,correctness]
axes: {energy: 2, density: 3, weight: 3, finish: 5}
cost: 1
seen: 33
requires: []
conflicts: []
completes: []
tension: []
---
A figure that animates or streams needs two guarantees, and tabular numerals
only give one. `tabular-nums` equalises digit advances so `1.7` and `4.8` sit
still; it does nothing when the digit *count* changes and `9.9` becomes `10.0`,
which relays out the whole row mid-count. Reserve the final width in `ch` and
fix the decimals at the source.
```css
.readout { font-variant-numeric: tabular-nums;
           min-inline-size: var(--digits, 5ch); text-align: end }
```
⚠ `ch` is the advance of `0` — correct only for the face actually rendering, so
reserve after the webfont loads or the fallback sets the floor. Give the element
`aria-live="off"`; a per-frame value read aloud is unusable.

Counting a figure up by rewriting `textContent` adds a third obligation:
round-trip the source string. Capture it once, split off the non-numeric
prefix and suffix, note the grouping separators and decimal places, and write
the exact original back on the final frame rather than a re-formatted
equivalent. Anything else silently drops a currency mark, a `+`, or a
localised separator — and it will be a translated or edited DOM you are
overwriting, not the one you authored.

Poll faster than the unit you display, but write only when the rendered string
changes. A one-second interval drifts and eventually skips a second visibly;
250ms never does, and the equality check means the DOM still takes at most one
write per second. The same guard is what lets a readout share a rAF loop with
everything else without becoming the reason it reflows.
```js
const next = fmt(remaining()); if (next !== last) { last = next; el.textContent = next }
```

Reserving width on the container is not enough once each digit is its *own*
animating box: outgoing and incoming glyphs have to occupy one cell, so give the
slot an explicit `em` advance and stack both in it. Tabular figures do not help
here — the slot is sized, not the glyph — and one advance for every slot is
wrong for the separators, which need a narrower cell or the number spaces out
around each comma. Digit .55–.7em, separator .3–.4em.
```css
.slot { display: inline-grid; place-items: center; width: .62em; overflow: clip }
.slot[data-narrow] { width: .36em }          /* , . : and a lining 1 */
.slot > * { grid-area: 1/1 }
```
⚠ Under reduced motion remove the outgoing glyph with `display: none` rather
than pausing its animation — two glyphs held in one cell is unreadable, not calm.

A figure whose target *moves* — a readout driven by a slider rather than by a
one-shot reveal — must set off from the value currently on screen, not from the
previous target. Hold the displayed value in a ref, cancel the in-flight frame,
and start the next leg from there; skip it and every drag snaps back to where
the last tween was aiming before travelling again. Ease out over 400–800ms.
Longer and a continuous drag never catches the hand.
```js
const from = shown.current, d = target - from   // not from the old target
cancelAnimationFrame(raf)                       // resume, do not restart
```
⚠ Write the exact target on the final frame. An eased approach rounded every
frame settles a unit short and stays there, and the readout disagrees with the
control that set it.

`aria-live="off"` silences the ticking but still leaves whatever intermediate
value the node happens to hold as the thing a reader lands on. Decouple the two
instead — the settled, formatted value in `aria-label` on the wrapper, the
animating node `aria-hidden`. The count becomes purely visual and assistive tech
reads a figure that is true at every moment.
```html
<dd aria-label="30,478,112,902 tokens"><span aria-hidden="true" data-count>0</span></dd>
```
⚠ The label is now a second copy of the number — derive both from one source, or
an edit ships a row whose label and digits disagree and only one of them is read.

Where the settled string is already in the DOM — a server-rendered figure a
count-up is about to zero — read its rendered width and pin that as a
`min-width` rather than computing a `ch` reservation. One measurement, no digit
count, exact in the face that actually rendered. Keep `text-align: end` or the
digits shift inside the reserved box as they climb.
```js
span.style.minWidth = span.getBoundingClientRect().width + 'px'   // then zero it
```
⚠ Measure every cell, then write every cell. Interleaving the two is a forced
layout per figure, and a table of them stalls the frame the reveal starts on.

A headline figure is rarely one number. `2.5x`, `100B+` and `10–20%` are display
strings holding one, one and *two* numeric runs, and a component that parses a
value plus a unit cannot render the third at all. Split the string on its digit
runs instead, animate every run against the same eased progress and re-emit the
literal pieces between them untouched — one path then covers a multiplier, a
suffix and a range. Start the progress at its *finished* value and zero it only
after the reduced-motion check inside the effect, so a server render, a client
with no script and a reader who asked for stillness all paint the real figure
and never a zero.
```js
const [t, setT] = useState(1)                        // finished, not 0
useEffect(() => { if (mq.matches) return; setT(0); ramp(setT) }, [])
value.split(/(\d+(?:\.\d+)?)/).map(p => /^\d/.test(p) ? fix(p, +p * t) : p)
```
⚠ Each run's decimal count comes from its own source text, not from the animated
float — `2.5` carried through `t` prints `2.3000000000000003` on some frame
without it.

`overflow: clip` guillotines the outgoing glyph on a hard line, which reads as a
wipe rather than a roll. Mask the slot vertically instead — opaque across the
middle 60–70%, transparent at both ends — and a digit leaving dissolves as it
travels, so the column reads as a drum turning behind an aperture. Give the slot
1.1–1.3× the font size in height or the fade has nowhere to happen.
```css
.slot { height: 1.2em; overflow: hidden;
  mask-image: linear-gradient(to bottom, #0000 0, #000 18%, #000 82%, #0000 100%) }
```
⚠ The mask fades the resting digit's own crown and foot too. Keep the opaque
plateau wide enough that a stationary figure is unaffected, and check it against
a lining `1` and a `4`, which reach furthest into the fade.

The round-trip works only because the authored string is the *finished* one,
which is also the reason to author it that way. An element shipped empty and
filled from script is blank to a crawler, blank on a dead bundle, and blank for
a reader who never scrolls that far — the count is decoration over a value the
markup already states correctly. Take the numeric target from a data attribute
and leave the rendered text untouched until the first animated frame.
⚠ Reading the target by parsing the rendered text instead makes every
formatting decision load-bearing: a thin space, a localised separator or a
trailing `+` turns into `NaN`, and the figure animates to nothing.

Per-digit slots keyed by their index from the *left* re-index the whole figure
the moment it gains a digit: every wheel is handed a new value at once and the
number appears to spin where it should have carried. Key from the right instead
and the ones column stays the ones column across the change, with only the new
leading slot mounting. The rule holds wherever a sequence is written
right-aligned and grows at its head — a slot's identity is its place value, not
its position in the string.
```jsx
str.split('').map((ch, i) => <Slot key={str.length - i} char={ch} />)
```
⚠ A freshly mounted slot must arrive already showing its digit, not roll to it
from zero — a leading `1` that counts up from `0` reads as the figure briefly
being ten times wrong.

The opposite cadence is right for a wall clock, and the distinction is drift.
A countdown accumulates error and must be polled faster than it reads; a clock
re-derives absolute time every tick, so it can wake at the smallest unit it
actually displays. A minutes-only readout on a one-second interval does sixty
times the work for one visible change, on every open tab.
```js
setInterval(tick, showSeconds ? 1000 : 60000)
```
⚠ An interval slower than its unit lands on an arbitrary phase, so the minute
turns up to 59s late. Schedule the first wake on the next boundary, then fall
into the fixed period.
