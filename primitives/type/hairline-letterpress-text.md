---
id: hairline-letterpress-text
category: type
tags: [type,text-shadow,letterpress,emboss,detail,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A sub-pixel, unblurred text-shadow a shade lighter than the ground makes type
read as pressed into the surface instead of printed on it. Pressed-in type suits
labels on tinted chips, plates and inset wells. Offset 0.5–1px down-right, zero
blur, 60–100% white on a light ground. On a dark ground flip it: a 5–15% black
shadow 1px down seats light text on its fill.

```css
.plate-label { text-shadow: .5px .5px 0 rgb(255 255 255 / .9) }
.on-fill     { text-shadow: 0 1px 0 rgb(0 0 0 / .08) }
```
⚠ Only works when the shadow is lighter than the ground. Over busy grounds or
at body sizes it reads as blur. Keep it to short labels ≥ 12px.
