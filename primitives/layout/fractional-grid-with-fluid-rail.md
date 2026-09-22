---
id: fractional-grid-with-fluid-rail
category: layout
tags: [layout,grid,asymmetry]
axes: {energy: 1, density: 3, weight: 3, finish: 4}
cost: 2
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
Asymmetric two-column via `minmax()` where the rail is viewport-proportional and
the body absorbs the rest — a sidebar that stays optically constant at any width.
```css
grid-template-columns: minmax(0,14vw) minmax(0,1fr);
```

Detail — alias `minmax(0, 1fr)` to a token and use it in place of bare `1fr`
everywhere. A raw `1fr` track has an `auto` minimum, so one long unbroken string
silently widens the column and blows the grid past its container.

A viewport-proportional rail keeps growing after the content has stopped: past
the wrapper's `max-width` the `vw` track widens while the measure does not, and
the channel between label and text opens without limit. Make the rail a fraction
of the *grid* instead — a flex factor under 1, floored at the label's own width —
and the split stays proportional inside a capped measure at every window size.
The floor is what stops a mono label wrapping once the fraction resolves small.
```css
grid-template-columns: minmax(10rem, .36fr) minmax(0, 1fr);   /* .3–.4fr */
```
⚠ Factors summing over 1 divide the free space between them, so the rail is a
share of what is *left*, not of the container — changing the gap moves it.

The floor belongs on whichever track has a width below which it stops working,
and that is often the *media* track rather than the rail: a panel carrying a
screenshot, a map or a chart goes illegible at some width no matter how much
copy sits beside it. Floor that one and let the text column yield, with factors
a few percent either side of 1 so the pair reads as equal until the floor bites.
```css
grid-template-columns: minmax(0, .95fr) minmax(26rem, 1.05fr);   /* .9–1.1fr */
```
⚠ Two floored tracks cannot both be honoured — the grid overflows rather than
wrapping. Floor one, and put the breakpoint where the two minima plus the gap
meet the container.
