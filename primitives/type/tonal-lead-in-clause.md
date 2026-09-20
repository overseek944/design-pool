---
id: tonal-lead-in-clause
category: type
tags: [type,emphasis,hierarchy,editorial,colour]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 6
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
