---
id: first-line-indent-paragraph-mark
category: type
tags: [type,prose,editorial,paragraph,rhythm]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Paragraphs separated only by a blank line read as interface copy. Mark them
with a first-line indent instead and the column reads as a continuous argument
— the register a manifesto or an essay wants. Indent and
space are alternatives: take the indent and cut the space to a third, or keep
both for a typed-manuscript feel. Suppress it where nothing sits above to
separate from — the first paragraph of a section, anything after a rule — and
on centred or right-aligned lines, where it throws the optical centre. Indent
1–2.5em.

```css
.essay p { text-indent: 1.5em; margin-block-end: .5rem }
.essay > :is(h2, h3, hr) + p, .essay p.sign { text-indent: 0 }
```
⚠ Below roughly 45 characters a line the indent eats a visible fraction of the
measure — drop to 1em or to spacing alone on a phone.
