---
id: script-substituted-emphasis
category: type
tags: [type,i18n,localisation,emphasis,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Italic is a Latin signal. Han and kana faces rarely ship one, so the engine
shears the glyphs — an oblique that reads as broken, not stressed. Under a
CJK `lang`, move emphasis to a channel the script owns: `em` goes upright and
takes emphasis dots; an italic serif accent phrase goes upright and carries
the stress in weight (one to two steps up) and accent colour instead.

```css
:lang(zh) em { font-style: normal; text-emphasis: dot; text-emphasis-position: under }
:lang(zh) .accent { font-style: normal; font-weight: 600; color: var(--accent) }
```
⚠ Emphasis marks need line-height ≥ 1.5 or they touch the next line; Japanese
convention sets them `over`, Chinese `under` — key the position per language.
