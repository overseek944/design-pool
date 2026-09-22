---
id: shell-shaped-lazy-fallback
category: perf
tags: [cls,loading,accessibility,architecture,correctness,code-splitting]
axes: none
cost: 2
seen: 4
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

A repeated region cannot shape its own shell, because the count is the one
thing the placeholder does not know: render one row and the list grows by four
when data lands. Declare the expected count where the repeat is authored, next
to the list it describes, and let the shell emit that many rows of the real
row's class tree. It is a reservation, not a promise — a short answer collapses
harmlessly — so state the *typical* length rather than the maximum. Above
8–12 rows reserve a viewport's worth and let the rest arrive below the fold.
```html
<ul-repeat list="{{ rows }}" placeholder-count="4">   <!-- shell emits 4 -->
```
⚠ Reserving the maximum is the common mistake: a 50-row shell for a list that
usually holds three pushes the whole page down and then yanks it back.

A value interpolated *into a sentence* has the same problem one level down, and
a block skeleton is the wrong shape for it — a `<div>` in running text breaks
the line. Give the missing span an inline-level box sized in `em`, sat on the
text baseline with `vertical-align: text-bottom`, so it occupies a word's worth
of the line and reflows with the type instead of against it. 1.5–3em wide by
1em tall, transparent colour so any fallback text inside cannot be read or
selected while it stands in.
```css
.slot { display: inline-block; inline-size: 2em; block-size: 1em;
  vertical-align: text-bottom; overflow: hidden; color: transparent;
  user-select: none; background: color-mix(in srgb, currentColor 8%, transparent) }
```
⚠ The line still reflows when the real value is wider than the box — fine for a
name, wrong for a figure a reader is watching. Where the value is numeric,
reserve it with tabular figures at its real width instead.
