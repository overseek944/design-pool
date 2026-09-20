---
id: glyph-joined-sequence-rail
category: type
tags: [type,list,sequence,metadata,mono,accessibility,technical]
axes: {energy: 1, density: 3, weight: 1, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A four-step process does not always deserve a diagram. Set it as one wrapping
line of uppercase micro-labels joined by a direction glyph and it reads as
apparatus under the paragraph that explains it — a caption, not a figure. Bind
the glyph to its label with `:not(:first-child)::before` rather than shipping it
as a sibling: a sibling glyph orphans at the end of a wrapped line, pointing at
nothing. 10–12px, tracking 0.15–0.2em, two to five steps.

```css
.seq { display: flex; flex-wrap: wrap; gap: .2em .6em; list-style: none }
.seq li { white-space: nowrap }
.seq li:not(:first-child)::before { content: "→ "; color: var(--accent) }
```
⚠ Generated content is announced by some engines, so the arrow can be read aloud
between every step. Use an `<ol>` and the order survives whether or not the
glyph is spoken.
