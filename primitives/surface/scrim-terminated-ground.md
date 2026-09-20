---
id: scrim-terminated-ground
category: surface
tags: [gradient,ground,surface,section,seam,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A decorative ground that stops at its section's edge leaves a horizontal seam
against whatever follows. Resolve it instead: make the topmost layer of the
*same* `background` shorthand a vertical ramp from transparent to the page's
exact ground colour, weighted so the last fifth is fully opaque. The decoration
dies out before the boundary and the two sections share an edge that cannot be
located. Cheaper than a mask — no extra element, no compositing layer, and the
content stacked above is untouched. Onset 40–60%, opaque by 85–100%.

```css
--mix: in oklab, var(--page);
.section { background: linear-gradient(180deg, transparent 0,
    color-mix(var(--mix) 20%, transparent) 50%,
    color-mix(var(--mix) 60%, transparent) 75%, var(--page) 100%),
  var(--decoration), var(--page) }
```
⚠ The scrim colour must be the literal ground token, not a near neighbour — one
step off and the seam moves rather than disappearing.

Pin *both* ends and the same ramp stops repairing a seam and becomes tonal
rhythm. Make the section's whole ground a gradient that starts and finishes on
the exact page token with a slightly sunk plateau held across the middle
30–78%: it reads as a recessed band with no locatable edge at either boundary,
and alternating it with its lighter twin separates sections by value alone.
Keep the plateau within 2–5% lightness of the page or it becomes a stripe.
```css
.band { background: linear-gradient(var(--page), var(--page-sunk) 30% 78%, var(--page)) }
```
