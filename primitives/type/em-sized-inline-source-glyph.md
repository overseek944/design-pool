---
id: em-sized-inline-source-glyph
category: type
tags: [inline, icon, logo, prose, typography, accessibility]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Named sources in running copy can carry their marks inside the sentence instead
of a separate logo row. Size each glyph in `em` so it tracks the text, drop it
slightly below centre to sit on the baseline, and bind glyph and name into one
inline unit so a wrap never strands a mark. Lift the name one tone above muted
copy. Glyph 0.9–1.1em, drop 0.08–0.16em, gap 0.2–0.35em.

```css
.src { display: inline-flex; align-items: center; gap: .25em;
       vertical-align: -.12em; color: var(--text-strong) }
.src > :first-child { inline-size: 1em; block-size: 1em; border-radius: .18em }
```
⚠ The name already says it — glyph `alt=""`/`aria-hidden`. Past five or six
per sentence, prose becomes a logo wall.
