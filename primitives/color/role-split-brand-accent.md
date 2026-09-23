---
id: role-split-brand-accent
category: color
tags: [color,accent,dark-mode,contrast,token,accessibility,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A dark saturated brand hue works as a *fill* on both grounds, but as *ink* on a
dark ground it vanishes — rings, outlines, accented words. Split it by role:
fills read the brand token; ink and outlines read an alias that is the brand on
light and a lifted tint of the same hue on dark, lightness L 65–78.

```css
:root { --brand: #0b2edb; --accent: var(--brand) }
@media (prefers-color-scheme: dark) { :root { --accent: #7f9dfb } }
.btn { background: var(--brand) }  :focus-visible { outline-color: var(--accent) }
```
⚠ Check the tint at 3:1 for rings and 4.5:1 for text on the dark field.
