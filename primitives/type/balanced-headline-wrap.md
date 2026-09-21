---
id: balanced-headline-wrap
category: type
tags: [type,polish]
axes: none
cost: 1
seen: 49
requires: []
conflicts: []
completes: []
tension: []
---
`text-wrap: balance` on every headline so line lengths even out instead of
stranding one word. Free, one declaration, and the single highest
ratio-of-polish-to-effort property in modern CSS.
```css
h1,h2,h3 { text-wrap: balance }
p { text-wrap: pretty }
```

Not headline-only — `balance` earns its place on any short block set to read as
a shape: sub-headings, captions, card titles, 13–17px included. The cap is
mechanical, not editorial: engines abandon balancing past roughly six lines and
the property silently does nothing, so anything longer belongs to `pretty`,
which only fixes the last line but has no line limit.

Hand-set breaks are the other half of this decision and they cancel it —
`balance` cannot rebalance across a `<br>`. Where a headline is broken line by
line on purpose, keep the breaks and drop `balance`, then switch them off below
the width at which they strand single words: `h1 br { display: none }` in a
600–760px query. Authored breaks surviving to 390px are how orphans ship.
