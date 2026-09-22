---
id: idle-receded-floating-control
category: interaction
tags: [interaction,accessibility,idle,chrome,fixed,restraint]
axes: {energy: 1, density: 1, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A control pinned to a viewport corner all session is a standing tax on a small
screen. Let it recede rather than leave: a few seconds without input drops it to
a low opacity, and any pointer, wheel, key or touch event brings it back.
Dimming is not hiding — it stays hit-testable, focusable and full-size, so
nothing is lost by failing to notice it. Arm the timer only where the screen is
scarce, and disarm it while the control is open. Rest opacity 0.25–0.45, idle
delay 1.5–3s.

```js
const wake = () => { el.toggleAttribute('data-idle', false); clearTimeout(t)
  t = setTimeout(() => el.toggleAttribute('data-idle', true), 2200) }   // 1.5–3s
for (const e of ['pointermove','wheel','keydown','scroll','touchstart'])
  addEventListener(e, wake, { passive: true })
```
```css
[data-idle]:not(:hover):not(:focus-visible) { opacity: .35; transition: opacity .35s }
```
⚠ `prefers-reduced-transparency: reduce` must pin it back to 1 — a reader who
asked for that cannot resolve a 35% control against whatever passes behind it.
Never pair the fade with `inert` or `pointer-events: none`: quieter, not gone.
