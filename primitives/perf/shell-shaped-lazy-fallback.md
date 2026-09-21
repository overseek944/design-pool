---
id: shell-shaped-lazy-fallback
category: perf
tags: [cls,loading,accessibility,architecture,correctness,code-splitting]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A lazy fallback is usually a spinner in a box that is not the component's, so the
chunk lands and the page jumps. Render the component's own class tree with its
content nodes empty: every reservation — the slot's ratio, each row's floor —
already applies to the placeholder. Reserve the rows *below* the media too; a
caption and a control strip shift as surely as the frame. One node carries the
wait under `role="status"`; the empty rows are `aria-hidden`.

```jsx
<Suspense fallback={
  <article className="film">                      {/* same classes, same boxes */}
    <div className="film-media"><p role="status">Loading…</p></div>
    <div className="film-caption" aria-hidden="true" />
  </article>}>
```
⚠ Keep the reservation in the shared class, never as inline heights in the
fallback: restated numbers drift the first time the real box changes. Under
~200ms it is a flash — delay the message, not the box.

The same argument in a scene: geometry gated on `Promise.all` shows nothing
until the slowest asset lands, and across dozens of maps that is one timeout from
showing nothing at all. Build the meshes immediately with flat placeholder
materials tinted to the page ground, then assign each map on its own arrival —
the composition is right on the first frame and fills in, instead of arriving
whole and late. Retire the indicator on the *first* asset, and on the error path
too.
```js
const mats = urls.map(() => new Material({ color: PAGE }))
urls.forEach((u, i) => load(u, t => { mats[i].map = t; mats[i].color.set(0xffffff)
  mats[i].needsUpdate = true; hideLoader() }, null, hideLoader))
```
⚠ The placeholder colour is a design decision, not a default — anything but the
ground reads as a broken-asset state. Clear the tint when the map lands or every
texture is multiplied by it.
