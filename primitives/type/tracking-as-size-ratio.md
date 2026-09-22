---
id: tracking-as-size-ratio
category: type
tags: [type,tracking,precision,fluid,tokens]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 25
requires: []
conflicts: []
completes: []
tension: []
---
Tracking fixed in px or em is wrong at one end of a fluid range: the value that
tightens display type correctly leaves caption type looking squeezed. Express
letter-spacing as a signed fraction of the *resolved* font size and redefine the
fraction per size band — tighter as type grows, back toward zero as it shrinks.
The optical-size axis of a variable face corrects weight and contrast but never
touches tracking, so this stays a separate control.

```css
.head { --track: -.06; letter-spacing: calc(var(--fs) * var(--track)) }
@media (max-width: 600px) { .head { --track: -.02 } }
```
⚠ Display −.04 to −.07, body −.02 to 0, small labels and caps +.02 to +.08 —
and .14 to .24 on an uppercase eyebrow set small enough to read as a rule rather
than as a word. Past −.08 letterforms collide at every size.

Widened — uppercase micro-labels of one to three words take +.08 to +.12 at
9–11px: too few letters for the extra space to accumulate into a gap. Past
three words hold under +.08, or the label stops reading as language.

A single word carries far more than the +.12 ceiling: at 9–11px a lone label of
8–12 letters holds +.25 to +.40 and reads as a plate stamped on an instrument
rather than as running text, because there is no inter-word gap for the tracking
to compete with. The ceiling is set by word count, not by size — two words at
+.30 stop being a phrase and read as two separate objects.

The word-count ceiling is really a ratio against the word space, which is why
it lifts with size: a space runs about .25em in most sans faces, and a label
stops reading as a phrase once the tracked gap approaches half of that. At
9–11px that caps a multi-word label near +.08; at 13–15px the same five words
hold +.10 to +.14 and still scan as one line. Measure it against the rendered
space, not against a word count.

The multi-word ceiling lifts once the words themselves are short. Two or three
words of four to eight letters hold +.14 to +.17 at 11–13px and still scan as a
phrase, because the tracked gap is measured against a word space the short
words barely accumulate against. Section eyebrows and role labels sit exactly
there; a three-word label with a nine-letter word in it does not.

The body end of the range is set by the face, not by the size. A geometric sans
is drawn loose enough to hold at poster scale, so at 12–15px UI sizes it takes
the full −.02 before the words close up, while a text-optimised face at exactly
the same size is already correct at 0 and tightens into a smear. Read the low
end as a property of the family and set it once per family token, not per band.
⚠ Whatever the body face takes, the fallback does not — a metric-override
fallback matched on width will run narrow again once the tracking is applied.
