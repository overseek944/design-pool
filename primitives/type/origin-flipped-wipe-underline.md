---
id: origin-flipped-wipe-underline
category: type
tags: [underline,link,hover,transform-origin,wipe,cheap]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 11
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

Grown to the full line box that same background becomes a highlighter stroke,
and the tell that separates a pen from a wipe is its ends. Tilt the gradient a
few degrees off horizontal and make the first and last 1–3% transparent: the
stroke then starts and stops on a soft diagonal, the way a marker lifts, instead
of on a machined vertical edge. Angle 100–110deg; the sweep wants an ease that
spends its speed early, 0.5–0.9s.
```css
.wt { background-image: linear-gradient(104deg, transparent 1%, var(--accent) 2.5%,
        var(--accent) 97%, transparent 99%);
      background-repeat: no-repeat; background-size: 0 100%;
      transition: background-size .7s cubic-bezier(.6,0,.2,1) }
.wt[data-in] { background-size: 100% 100% }
```
⚠ At full height the accent is behind the glyphs and owes them 4.5:1 on its own
— a tint that passes as a hairline routinely fails as a block. Rest it at
`100% 100%` under `prefers-reduced-motion`, or the emphasis never arrives.

`box-decoration-break: clone` is what makes that gradient claim true. By default
a wrapped inline is one continuous background box, so `background-size: 60%` is
60% of both lines together — the second fragment stays bare until the first is
finished. Cloned, each fragment gets its own box and its own 0→100%, and the
draw runs on every line at once. Move `background-position` to 55–65% and the
same rule is a strike-through rather than an underline, which a `:checked`
sibling can drive with no script at all.
```css
.strike { box-decoration-break: clone; background-position: 0 60%;
  background-size: 0 1.5px; transition: background-size .4s, color .4s }
:checked + * .strike { background-size: 100% 1.5px; color: var(--muted) }
```
⚠ A strike that only greys the text carries no meaning to a screen reader —
wrap the run in `<s>` or `<del>`, or state the status in words.

The same wipe written as `right: 100% → 0` on an absolutely-positioned bar needs
no `transform-origin` at all and is the form to avoid: an inset is a layout
property, so every frame re-resolves the pseudo-element's box instead of
compositing a transform already on the GPU. It buys nothing the `scaleX` form
does not have — a bar scaled on X keeps its authored height — so take it only
where the bar must also change thickness as it draws.
