---
id: tonal-lead-in-clause
category: type
tags: [type,emphasis,hierarchy,editorial,colour]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
Carry two levels inside one sentence: the clause holding the claim at full text
contrast, the remainder dropped to a muted step of the same ramp. It replaces
the eyebrow-plus-headline pair with a single line, so the fact and its qualifier
stay one grammatical unit instead of two stacked blocks — and it survives
reflow, where a two-block hierarchy starts to look like a stranded label.

```css
.claim   { color: var(--fg-muted) }
.claim b { color: var(--fg); font-weight: inherit }
```
⚠ The muted half is still body copy: hold it at ≥4.5:1, not the 3:1 a
decorative grey gets away with. Put the muted step 55–75% of the way from
background to foreground; below that the split stops reading as deliberate.

The split can be made in hue rather than lightness — the claim in the accent,
the remainder at full foreground. That inverts the weighting: the accent clause
is figure rather than what survives a fade, which is what a display-size
paragraph needs, since a muted half at 50–70px reads as an unfinished render
instead of a second voice. Both halves are body copy now, so the accent owes
4.5:1 against the page ground and must be picked for that, not for how it
behaves on a button.

Where the lifted run is `<em>` rather than a styled span, the default italic
arrives with it. A geometric sans usually ships no drawn italic, so the browser
shears the roman and the emphasis reads as a rendering fault rather than a
second voice — cancel it and let the tonal lift carry the emphasis alone. Change
the paint, never the element: it is still announced as emphasis, and a face with
a true italic can opt back in. One weight step, 550–650 on a variable face.
```css
.prose em { font-style: normal; font-weight: 600; color: var(--fg) }
```
⚠ Not for runs longer than a clause — past that it stops reading as emphasis and
wants the sentence split above.

The split can run the other way: hold the whole sentence at full text contrast
and promote the load-bearing clauses into the accent hue instead of demoting
the rest. Promotion scales where demotion does not — three or four marked
phrases across a long passage still read as one emphasis tier, whereas three
muted remainders leave the paragraph mostly grey. The cost is that the accent
is now body copy and owes the full 4.5:1 against the ground, which most brand
accents clear only on a dark ground.
```css
.claim mark { background: none; color: var(--accent) }
```
⚠ Hue is the only cue, so it is gone in greyscale and for a red-green
deficiency. Mark the phrase with `<strong>` or `<em>` where it is genuinely
stressed rather than styling a bare span.

Over a photograph neither split holds on its own: the ground's luminance varies
across the line, so a muted remainder disappears in the bright quarter and an
accent clause disappears in the dark one. Stack the channels instead — a weight
step, a hue step and a real drawn italic on the promoted clause — and the
hierarchy survives wherever the line lands, because no single cue is carrying
it. Weight gap 120–180 on a variable face; the pair still owes 4.5:1 against
the *darkest and lightest* pixel it can cross, which usually means a scrim.
```css
.claim     { color: var(--fg-cool); font-weight: 470 }
.claim em  { color: var(--fg); font-weight: 630; font-style: italic }
```
⚠ Three channels at once is the ceiling — add a fourth and the clauses stop
reading as one sentence.
