---
id: vacated-centre-slot-chrome
category: layout
tags: [layout,chrome,navigation,scroll,overlay,motion]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [inert-tracks-opacity]
tension: []
---

A fixed bar's centre line holds one occupant at a time, and which one can
change. Give it to the identity mark while the page is at rest, so a hero
carries a single piece of chrome instead of a menu laid over the art, then hand
it to the navigation on a small scroll threshold — the mark migrating to the
gutter on the same clock the nav fades into the slot it left. Nothing ever
competes for the axis, and the handover is itself the report that the page has
moved. Threshold 40–120px, migration 0.35–0.5s.

```css
.mark { position: absolute; inset-inline-start: var(--gutter);
  translate: calc(50vw - var(--gutter) - 50%) 0; transition: translate .45s ease }
[data-scrolled] .mark { translate: 0 }
[data-scrolled] .nav  { opacity: 1; translate: 0 }
```
⚠ Migrate with `translate`, never `left` or `margin` — a layout property
relayouts the bar on every frame and the nav arriving on the same clock judders
against it. The mark must keep one accessible name across both positions; it is
the same link, not two.
