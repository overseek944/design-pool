---
id: production-timing-vocabulary
category: timing
tags: [motion,easing,duration,reference,system]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 33
requires: []
conflicts: []
completes: []
tension: []
---
A coherent set beats a clever one. Durations cluster tightly and eases come from
one family; variation lives in distance and stagger, not in easing curves.

| Intent                     | Duration   | Ease            |
|----------------------------|------------|-----------------|
| Micro (hover, toggle)      | .20–.35s   | `power2.out`    |
| Standard reveal            | .45–.55s   | `power2.out`    |
| Emphasis / hero entrance   | .85–1.10s  | `power3.out`    |
| Positional / layout move   | .60–.90s   | `power3.inOut`  |
| Exit                       | .30–.40s   | `power2.in`     |
| Ambient loop               | 2.0s+      | `none` (linear) |

`.45s / power2.out` as the house default covers most of a page. Decelerating
curves (`.out`) for anything entering; `.inOut` only when something travels
between two known positions.

Range — the micro band reaches lower than the table suggests. `.12–.16s` on
hover, background and colour changes reads as instantaneous response rather than
as animation; reserve `.20–.35s` for micro-motion that actually travels.

Ship the table as tokens named for the gesture rather than the number —
`--dur-snap`, `--dur-quick`, `--dur-fade`, `--dur-cross`, `--dur-slide` — and a
component picks an intent it can be reviewed against instead of typing a
duration. Reach below the micro band for `snap` at 60–100ms: a state flip with
no travel at all, where anything longer reads as lag rather than as motion.

Inside one entrance the distance is a function of the element's size, not of its
turn. The same 16px lift that carries a line of text is invisible under a
page-width image, and the image's travel read at text scale overshoots. Scale
both together — roughly 2× the travel and 1.3–1.6× the duration for a
full-width block against the copy above it — and the group arrives at one
apparent speed instead of as a rigid slab. Text 12–24px, page-width media
32–56px, same ease throughout.

One element's transition list is not one intent. Split it by what each property
means: properties acknowledging the reader's own action take the snap band while
properties reporting the element's state stay in micro, three to four times
apart in the same declaration. A press that scales at the same speed its
background tints feels like a page redrawing rather than a control giving way.
The same split runs on an appearing part — opacity linear at 120–160ms so it is
simply there, the transform it rides eased over 250–400ms so the travel reads.
```css
.btn { transition: background .3s, border-color .3s, color .3s, transform .1s }
.btn:active { transform: scale(.97) }
```

The emphasis band stretches past 1.1s only when the curve is front-loaded enough
that the nominal duration stops describing what the eye sees. A curve reaching
~70% of travel inside the first third — `cubic-bezier(.12,.23,.17,.99)` and its
neighbours — reads as arriving in 0.4–0.5s no matter how long the tail is, so a
1.3–1.7s hero entrance settles rather than drags. Spend it once, on the block
that opens the page, and keep the rest of the set in the table: the long tail is
only invisible where nothing else is moving beside it.
```css
.hero { transition: opacity 1.5s cubic-bezier(.12,.23,.17,.99) .2s,
                    translate 1.5s cubic-bezier(.12,.23,.17,.99) .2s }
```
⚠ The tail is still live: a reader who scrolls at 0.6s is watching the last 30%
crawl, and a second element entering during it inherits a stale-looking
neighbour. Pair a long tail with a one-shot trigger, never with a scrub.

Split an *entrance* the same way and it stops being one keyframe block: opacity,
rotation, blur and travel become four named animations on one element, each
reading its own duration and easing token, so any channel is retuned without
touching the others. Only one of them may overshoot. A curve that exceeds 1 is
meaningless on opacity, which clamps and simply stalls at the top, and on blur,
where the excursion goes negative and clamps to `0`. Give the overshoot to the
channel with headroom past its end value — the translate — and hold the rest on
a monotone out-curve.
```css
.in { animation: fade var(--d) var(--ease-out) forwards,
                 bob  var(--d) cubic-bezier(.34, 1.35, .64, 1) forwards }
```
⚠ Four tracks is four things to keep in phase. Share one duration token and vary
only the easing, or the element arrives in pieces — and delay any interior
stroke behind the container by 60–120ms so it draws onto something at rest.
