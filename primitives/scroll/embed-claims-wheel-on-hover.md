---
id: embed-claims-wheel-on-hover
category: scroll
tags: [scroll,embed,iframe,overflow,pointer,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An interactive embed inside a scrolling page — a map, a 3D scene, a game frame
— competes for the wheel, and whichever side loses reads as broken. Hand
ownership to the pointer: while it rests over the island, freeze the scroll
container from CSS alone, and release the instant it leaves. Gate on a fine
pointer, or a thumb that has no hover loses the ability to scroll past.

```css
@media (hover: hover) and (pointer: fine) {
  .scroller:has(.island:hover) { overflow-y: hidden; overscroll-behavior-y: none }
}
```
⚠ Reserve the track with `scrollbar-gutter: stable` or freezing mid-page shifts
the content sideways. Keyboard users never trigger this, so the embed still
needs a deliberate focus path in and out.
