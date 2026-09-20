---
id: origin-flipped-wipe-underline
category: type
tags: [underline,link,hover,transform-origin,wipe,cheap]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A `scaleX` underline that grows from one end and shrinks back to it reads as one
gesture played backwards. Flip `transform-origin` in the frame where the bar is
zero-width: the same element retracts right, then redraws from the left — a
wipe, not a rewind. Nothing is painted at that instant, so the flip is invisible.

```css
@keyframes wipe {
  0%  { transform-origin: 100%; transform: scaleX(1) }
  33% { transform-origin: 100%; transform: scaleX(0) }
  34% { transform-origin: 0;    transform: scaleX(0) }
  to  { transform-origin: 0;    transform: scaleX(1) }
}
```
⚠ Keep a plain resting transition under it or a fast pointer strands the bar
mid-wipe. 0.5–0.7s, and the same rule must answer `:focus-visible`.

A transform cannot draw an underline under an inline that wraps — the
pseudo-element is one box and covers the first line fragment only. Animate a
gradient `background-size` instead: the background paints on every fragment, so
an emphasised phrase inside a running headline draws correctly on both lines,
with no extra element and no measuring. Height is the hairline token, position
pins it to the text bottom. 0.45–0.6s each; stagger several across one sentence
at 0.5–0.65s apart and shorten each successive draw slightly.
```css
em { background: linear-gradient(var(--line), var(--line)) no-repeat 0 100%;
     background-size: 0 1px; animation: draw .55s ease-out both }
@keyframes draw { to { background-size: 100% 1px } }
```
⚠ `background-size` is not compositable — it repaints the inline each frame.
Fine for a handful of words, not for a whole paragraph.
