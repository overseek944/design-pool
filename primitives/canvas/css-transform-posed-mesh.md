---
id: css-transform-posed-mesh
category: canvas
tags: [webgl,vertex,dom-sync,transform,overlay,architecture]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A WebGL surface standing in for a CSS-transformed element — tilted, scaled,
perspective-skewed — should not rebuild that pose as a camera. Read the
element's computed `transform` and `transform-origin`, pass the matrix as a
uniform, and apply it in the vertex stage after projection, in CSS pixels about
the origin. The mesh then follows every tween and breakpoint the stylesheet
already owns. Re-read only when the transform string changes.

```js
const cs = getComputedStyle(el), key = cs.transform + cs.transformOrigin
if (key !== last) { last = key; u.sheet.value.fromArray(new DOMMatrix(cs.transform).toFloat32Array()) }
```
⚠ Multiply `gl_Position.w` by the posed w so texture coordinates stay
perspective-correct. `getComputedStyle` per frame forces style — cache it.
