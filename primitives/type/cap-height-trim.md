---
id: cap-height-trim
category: type
tags: [type,spacing,precision,alignment]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Every text block ships with invisible half-leading above and below, so a
declared `32px` gap between a heading and its body is never the gap you see.
`text-box: trim-both cap alphabetic` collapses the box to cap-height and
baseline, making spacing tokens mean what they say and letting text sit flush
against a container edge. Put it behind `@supports` and treat it as progressive
refinement — the fallback is simply the spacing everyone already lives with.

```css
@supports (text-box: trim-both cap alphabetic) {
  h1, h2, .lede { text-box: trim-both cap alphabetic }
}
```
⚠ Retune vertical rhythm after enabling it — existing margins will suddenly look 4–8px tight, because they finally are what they claim.

Fallback that ships today — carry the trim as two `em` tokens *per family*,
subtracted as negative block margins. The values are a property of the face, not
the system: a tall-ascender serif wants ~`.45–.50em` top and `.28–.32em` bottom,
a mono nearer `.18–.22em` and `.30–.35em`.

Trim one edge, not both, wherever the block still has to sit on the rhythm
below it. `text-box-trim: trim-start` with `text-box-edge: cap alphabetic`
removes only the leading above the first line, so a heading sits flush to its
panel's top padding while the descender space beneath still separates it from
what follows. Put the tuned spacing *inside* the `@supports` branch as padding
rather than stripping it outside — an engine without trim then degrades to the
loose spacing everyone already accepts instead of to a heading jammed against
an edge.
```css
.panel-head { margin-block-start: 0 }
@supports (text-box: trim-both) {
  .panel-head { text-box-trim: trim-start; text-box-edge: cap alphabetic;
                padding-block-start: .5rem } }
```
⚠ `cap alphabetic` is wrong for a script with no cap height or no alphabetic
baseline — scope the rule to the languages whose faces it describes.
