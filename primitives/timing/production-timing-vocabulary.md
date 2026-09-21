---
id: production-timing-vocabulary
category: timing
tags: [motion,easing,duration,reference,system]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 30
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
