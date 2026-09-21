---
id: delimiter-marked-inline-code
category: type
tags: [type,code,inline,prose,delimiter,technical]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
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

A superscript reference marker has the opposite problem and the same cure:
`vertical-align: super` lifts the glyph clear of the line box, the box grows to
contain it, and a paragraph carrying five citations sits on visibly wider
leading than the one beside it. Give the marker `line-height: 0` — it then
contributes no height at all and the raised glyph overhangs the line it belongs
to. 0.65–0.75em, in the mono face, so a bracket-free number cannot be read as
part of the word it follows.
```css
.cite { font: .7em/0 var(--mono); vertical-align: super;
        white-space: nowrap; margin-inline: .1em }
```
⚠ Zero leading lets the glyph reach the line above — it needs body leading of
1.6 or looser, which long-form copy has and a dense interface does not.
