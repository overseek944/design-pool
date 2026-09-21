---
id: independent-transform-channels
category: motion-system
tags: [transform,transition,architecture,composition,state]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Two concerns wanting the same element — an entrance offset and a hover lean, a
parallax and a press scale — collide in one `transform` string: the later write
erases the earlier, and they cannot carry different durations. They need not
share it. `translate`, `rotate` and `scale` are separate animatable properties
with their own transitions, so one concern takes a channel and the other keeps
`transform`. Neither has to know the other exists.

```css
.node { translate: 56px 0;
  transition: translate .8s var(--ease), transform .45s var(--spring) }
.in .node { translate: 0 0 }    .node.leans { transform: rotate(3.5deg) }
```
⚠ Order is fixed — translate, rotate, scale, then `transform` — so the channels
cannot be reordered around each other.

The rival is often not a second declaration but a running `@keyframes`. An
animation's computed value outranks an inline style, so a per-frame
`el.style.transform` write against an element carrying an infinite loop is
silently dropped — no error, no partial effect, the write simply never lands.
Nest instead of negotiating: the loop keeps the inner element, script drives the
outer one, and the two compose as ancestor and descendant transforms.
```html
<div class="drifts" style="transform: translate3d(0,120px,0)">  <!-- script -->
  <i class="twinkles"></i>                       <!-- animation: twinkle 3s -->
</div>
```
⚠ Two boxes per mark, so a field of hundreds doubles its node count — the
alternative is moving the loop onto a channel the script does not use, which
works until the second concern wants it too.
