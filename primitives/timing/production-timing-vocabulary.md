---
id: production-timing-vocabulary
category: timing
tags: [motion,easing,duration,reference,system]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 5
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
