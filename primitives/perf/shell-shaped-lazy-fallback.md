---
id: shell-shaped-lazy-fallback
category: perf
tags: [cls,loading,accessibility,architecture,correctness,code-splitting]
axes: none
cost: 2
seen: 1
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
