---
id: cap-height-trim
category: type
tags: [type,spacing,precision,alignment]
axes: none
cost: 1
seen: 4
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
