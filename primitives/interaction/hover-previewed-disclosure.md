---
id: hover-previewed-disclosure
category: interaction
tags: [interaction,disclosure,navigation,hover,progressive-enhancement,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A menu that should fall open under a mouse and still answer a tap and a keyboard
does not need two components. Keep one `<details>`: the native click owns
`[open]` for touch and keyboard, and a pointer-only rule *previews* the panel
without opening it by making `::details-content` visible again. `:not([open])`
stops the two paths fighting when a clicked menu is then hovered.

```css
@media (hover: hover) {
  .menu:not([open]):hover::details-content { content-visibility: visible }
}
```
⚠ The older form — overriding `display` on the closed children — stopped working
once engines moved the closed state onto `::details-content`, and fails silently:
the panel lays out at full height and paints nothing. Preview leaves `[open]`
false, so anything keyed off it — `aria-expanded`, a chevron rotation — must ride
the same selector.
