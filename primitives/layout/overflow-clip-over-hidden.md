---
id: overflow-clip-over-hidden
category: layout
tags: [overflow,correctness,accessibility,scroll]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`overflow: clip` crops without creating a scroll container. `hidden` does not —
it makes the box programmatically scrollable, so focusing a clipped child
scrolls it invisibly out of view, `position: sticky` descendants stop sticking,
and anchor jumps land inside it. Use `clip` wherever the intent is only to crop:
rounded fills, masked thumbnails, hover wipes. Reserve `hidden` for boxes that
really do scroll.

```css
.fill { border-radius: var(--r); overflow: hidden }
@supports (overflow: clip) { .fill { overflow: clip; overflow-clip-margin: 0px } }
```
⚠ `overflow-clip-margin` reopens a controlled bleed of 0–24px for glows and
focus rings that would otherwise be cut. Without it a `:focus-visible` outline
on a clipped child is invisible.
