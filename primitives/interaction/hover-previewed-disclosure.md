---
id: hover-previewed-disclosure
category: interaction
tags: [interaction,disclosure,navigation,hover,progressive-enhancement,correctness]
axes: none
cost: 1
seen: 3
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

Where the panel is not a `<details>` — a layered diagram, a card that expands on
hover — script the same split: open on `pointerenter` only when
`pointerType === 'mouse'`, so a tap never double-fires open-then-toggle; open on
focus only when `:focus-visible` matches; close on blur and Escape; and let the
button's click toggle for everyone. Mark the component ready from script before
hiding anything, so without JS every panel stays readable.
```js
el.addEventListener('pointerenter', e => e.pointerType === 'mouse' && set(true))
btn.addEventListener('focus', () => btn.matches(':focus-visible') && set(true))
```
⚠ Do not close on `pointerleave` while the button holds keyboard focus — the
mouse leaving would collapse a panel the keyboard user is reading.
