---
id: concentric-radius-ladder
category: scale
tags: [tokens,radius,architecture,correctness,surface]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Radius belongs to a surface's role, not to an author's taste: name the steps
after what they wrap — inline mark, control, card, overlay — so a component
picks a role rather than a number. The steps must also climb, because a rounded
box inside another looks right only when the outer radius equals the inner plus
the gap between them. Give a 10px control and its card the same value and the
corners visibly disagree, the inner one reading too round. Ladder roughly
6 / 10 / 16 / 20px at a 16px base, plus a pill.

```css
:root { --r-inline: 6px; --r-control: 10px; --r-card: 16px; --r-overlay: 20px;
        --r-pill: 999px }
.card { border-radius: var(--r-card); padding: 6px }   /* 16 = 10 + 6 */
.card > .control { border-radius: var(--r-control) }
```
⚠ Outer = inner + padding, so changing a card's padding changes its correct
radius. Where the padding is fluid, derive it —
`calc(var(--r-control) + var(--pad))` — rather than pinning a step.

The ladder stops climbing. Past roughly a 480px box the eye judges a corner
locally — against the centimetre of edge either side of it, not against the
whole surface — so a panel at 370px and the same surface at 1400px both want
about 16px, and a radius scaled with its container reads as a different shape at
every width. Fix the radius at the top of the ladder and let the gutter around
it scale instead.
