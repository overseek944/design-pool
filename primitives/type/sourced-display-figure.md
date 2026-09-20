---
id: sourced-display-figure
category: type
tags: [type,figures,provenance,correctness,editorial,accessibility]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A number set at display size stops being prose and becomes a claim, so it needs
a route to its source in the same section — not a page of fine print. Mark each
figure with a superscript reference resolving to a short numbered list under the
row, and carry one scope line naming what the figures describe. The unit rides
as a smaller span so the figure stays one accessible string.

```html
<p class="figure">74<span class="unit">%</span><a href="#r1"><sup>1</sup></a></p>
```
⚠ A bare `<sup>` is announced as part of the number — "seventy-four percent
one". Give the link an `aria-label` naming it a reference. Hold the list and the
scope line at body contrast: dropping them to 3:1 turns a qualifier into
decoration.
