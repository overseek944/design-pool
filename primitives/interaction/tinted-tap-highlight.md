---
id: tinted-tap-highlight
category: interaction
tags: [interaction, touch, feedback, mobile, accessibility, color]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
WebKit and Blink flash a grey box over any tapped link or button — the only
press feedback many custom controls give on touch. The usual fix, making it
`transparent`, deletes that feedback. Retint it instead: the accent at low
alpha, so a tap still visibly lands and matches the interface. Alpha 0.1–0.25;
lower on dark grounds, where the flash reads stronger.
```css
a, button, [role="button"] {
  -webkit-tap-highlight-color: rgb(var(--accent-rgb) / .18);
}
```
⚠ The flash follows the element's border box, not its radius, on some engines
— on pill controls add an `:active` background and set the highlight to
transparent there only. Firefox ignores the property entirely.
