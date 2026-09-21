---
id: leading-collapsed-settle
category: reveal
tags: [reveal,type,entrance,heading,scroll,leading]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A display block can arrive by closing up rather than by moving. Start the
leading open and let it tighten to its set value as the block settles, with a
short upward travel and a partial opacity rise underneath. It reads as the
lines drawing together into a paragraph — right for a heading that should feel
composed rather than launched, and useless on anything under two lines. Open
1.3–1.5, rest 1.0–1.1, scrubbed across the last third of the approach.

```css
@property --settle { syntax: "<number>"; inherits: true; initial-value: 1 }
h2 { line-height: calc(1.05 + (1 - var(--settle)) * .35);
     opacity: calc(.7 + var(--settle) * .3) }
```
⚠ Leading is a layout property: every frame reflows the block and moves
everything below it. Reserve the open height on the container, or the section
under a settling heading walks up the page as the reader scrolls into it.
