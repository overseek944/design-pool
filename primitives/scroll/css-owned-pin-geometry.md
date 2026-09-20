---
id: css-owned-pin-geometry
category: scroll
tags: [scroll,pin,architecture,correctness,responsive]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [media-query-parity-listeners]
tension: []
---
Let the stylesheet decide whether a section pins and for how long: a sticky
child plus a sibling spacer sized in viewport units, 150–300vh. The controller
only *reads* spacer height and wrapper top; it never writes inline geometry,
which a re-rendering framework reconciles away and which fights the media query.
Turning the pin off is then one CSS rule, needing no teardown path.
```css
[data-pin] > section { position: sticky; top: 0 }
[data-pin-spacer]    { height: var(--pin-dist, 200vh) }
@media (max-height: 719px) { [data-pin] > section { position: static } }
```
⚠ A spacer measuring zero means the CSS unpinned. Park the timeline on its
**finished** frame; parking at zero leaves an unreached section blank forever.
