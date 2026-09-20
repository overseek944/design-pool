---
id: balanced-headline-wrap
category: type
tags: [type,polish]
axes: none
cost: 1
seen: 6
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
