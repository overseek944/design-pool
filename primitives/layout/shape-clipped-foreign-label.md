---
id: shape-clipped-foreign-label
category: layout
tags: [svg,text,diagram,figure,truncation,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`<text>` has no wrapping, ellipsis or tooltip, so diagram labels get abbreviated
by hand until the data changes. A `foreignObject` in the node's own translated
group makes the label ordinary HTML — `text-overflow`, the page's type stack —
while the geometry stays in user space and scales with the `viewBox`. Clip the
wrapping `<g>` to the node's shape: `clipPath` resolves in the *referencing*
element's space, so one definition serves every node of that shape. Inset the
text 8–16 user units.

```html
<clipPath id="card"><rect width="204" height="80" rx="7"/></clipPath>
<g transform="translate(20,40)"><rect width="204" height="80" rx="7"/>
  <g clip-path="url(#card)"><foreignObject x="62" y="14" width="130" height="62">
    <div xmlns="http://www.w3.org/1999/xhtml" title="full label">…</div>
```
⚠ `foreignObject` renders nothing when the SVG is an `<img>` src or a CSS
`url()` — the node paints, the label vanishes. Needs the XHTML `xmlns`, and
`pointer-events: none` or it eats hits meant for the shapes beneath.
