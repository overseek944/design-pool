---
id: measured-inline-word-swap
category: type
tags: [type,motion,headline,correctness]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
A word cycling inside a running headline relays out the whole line on every
swap. Measure it first: hold a hidden copy of the incoming word in the same
face and size, read its width, and transition the inline container to that
width as the new word rises into the slot. The sentence closes around each
word instead of jumping. Re-measure on resize and on `document.fonts.ready` —
the fallback face sizes differently and the first swap lands wrong. 2.5–4.5s
per word, 0.28–0.6s for the move.
```css
.roll { display: inline-block; overflow: hidden; height: 1.4em;
        transition: width .52s var(--ease-out) }
```
⚠ `width` animates on the layout thread every frame; affordable only for one
small element. Give the line `aria-live="off"` or it is re-read on each turn.

Let the outgoing word finish fading well before it finishes moving: opacity to
zero by 35–45% of its exit keyframe while the transform runs the full 100%. Out
and in can then overlap on one clock without two words being legible in the same
slot, and the exit reads as quick while its travel stays unhurried.
```css
@keyframes word-out { 0% { opacity: 1 } 38% { opacity: 0 }
                      to { opacity: 0; translate: 0 -.5em } }
```
⚠ Both words must occupy the one slot — stack them in a single grid cell or
position them absolutely inside the measured box, or the incoming word lays out
after the outgoing one and the line jumps anyway.

The measurement exists only because the word sits mid-sentence. Give the
swapping word its own line — the last line of a display heading — and the
problem disappears: the port is a fixed line box, the items stack full-width,
and nothing around them relays. A rotator is then one `overflow: hidden` box at
the line's own height and a track stepped by whole multiples of it. Buys back
the width transition and the font-loading re-measure; costs a line of vertical
space and a heading that cannot end on the variable word.
```css
.port { height: 1.25em; overflow: hidden }          /* the line box, not a guess */
.track > * { height: 100%; display: grid; place-items: center }
```
⚠ Set the port from the same `line-height` the heading uses, not a rounded rem
value — descenders clip at the seam otherwise.

`aria-live="off"` silences the turning word and still leaves a sentence that is
incomplete at every instant the slot is mid-swap. Hand the whole claim over as
one visually-hidden node beside an `aria-hidden` visual, built from the same
string the slot renders: assistive technology gets a finished sentence and the
rotation is invisible to it. Generate both from one template rather than typing
the fixed clause twice, or they drift on the first copy edit.
```jsx
const line = `${FIXED} ${items[i].value}`
<h2><span class="sr-only">{line}</span>
    <span aria-hidden="true">{FIXED}<Slot value={items[i].value}/></span></h2>
```
⚠ The heading's accessible name now changes on a timer. Anything addressing it
— a contents list, a skip target, a snapshot test — reads whichever member was
up, so keep the rotating part out of the clause the page is navigated by.

A slot *typed* rather than swapped has nothing to measure — its width is the
text — but it passes through zero length, and an empty inline box contributes no
height, so the line's baseline jumps on every turnaround. Park a zero-width
space inside the mutating run and the box survives the gap. Any mark riding
beside the word — a logo, a bullet, the caret — belongs in `em` so it tracks the
type rather than a fixed step, and the caret wants the run's own height, not the
line's.
```jsx
<span aria-hidden="true">{typed}{'​'}</span>
<span className="inline-block w-[.06em] h-[.78em]" />   /* caret */
```
⚠ Trailing text reflows per character unless the slot is width-reserved — put
the typed run last in its line, or accept the jitter deliberately.
