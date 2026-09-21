---
id: embed-claims-wheel-on-hover
category: scroll
tags: [scroll,embed,iframe,overflow,pointer,correctness]
axes: none
cost: 1
seen: 3
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

The thumb has the same conflict and no hover to resolve it. `touch-action`
settles it declaratively by naming the axis the surface does *not* consume:
`pan-y` on an island that only reads horizontal or rotational drag lets the page
keep scrolling straight through it, while `none` claims both axes for one that
really does pan in two. Declare it beside `user-select: none`, since a gesture
dragged across text selects the text otherwise.
```css
.island { touch-action: pan-y; user-select: none }   /* none only if it pans in 2D */
```
⚠ `touch-action` is read once when the gesture starts and cannot be changed
mid-drag — a surface with two modes has to declare the union up front.
