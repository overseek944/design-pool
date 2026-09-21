---
id: delimiter-marked-inline-code
category: type
tags: [type,code,inline,prose,delimiter,technical]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Inline code in prose is usually a padded chip, and that padding is width the
leading was never set for — on a wrapped line it crowds the line above. Print
the source delimiters instead: zero padding, a faint wash for the ground, and a
backtick each side as generated content at a fraction of the body ink. The
boundary reads where a low-contrast wash alone does not, and the line keeps its
rhythm. Delimiter 25–40% of the body ink, gap 0.1–0.2em, wash 4–10% alpha.

```css
.prose :not(pre) > code { display: inline-flex; gap: .15em; padding: 0;
  background: hsl(0 0% 100% / .08); white-space: nowrap }
.prose :not(pre) > code::before, .prose :not(pre) > code::after {
  content: "`"; color: hsl(0 0% 100% / .35) }
```
⚠ Generated content reaches the clipboard in some engines and is announced by
some screen readers, so the tick can paste into what the reader runs. It assumes
a delimiter-literate audience; elsewhere it reads as a stray character.
