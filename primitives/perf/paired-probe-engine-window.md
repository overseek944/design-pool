---
id: paired-probe-engine-window
category: perf
tags: [progressive-enhancement,feature-detection,browser-quirk,correctness,architecture]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Feature queries test parsing, which is the right instrument for a missing
capability and useless against a *rendering* bug — there is nothing to detect,
because the property is supported and simply wrong. Two probes intersected pin a
version window instead: a vendor-exclusive property names the engine, and the
negation of a property that engine shipped later sets the upper bound. The
workaround then reaches only the builds that need it, from CSS, with no UA string
and no script.

```css
@supports (background: -webkit-named-image(i)) and (not (grid-template-rows: subgrid)) {
  .truncate { display: inline }        /* WebKit, before the release that fixed it */
}
```
⚠ It expires silently and in the wrong direction — the window has no floor, so it
keeps firing on ancient builds forever. Date the block in a comment and delete it
on a schedule rather than when someone notices.
