---
id: truncating-head-fixed-trailer
category: layout
tags: [layout,flex,truncation,correctness,cards,responsive]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A header row pairing a variable-length label with a status badge fails in two
directions at once, and each side needs its own declaration. The label will not
ellipsize, because a flex child floors at min-content until `min-width: 0`
releases it; the badge shrinks into an unreadable sliver, because it is flexible
by default until `flex: none` pins it. Write both as a rule on the row's
children rather than on each component, and the pattern survives any label at
any card width.
```css
.head { display: flex; justify-content: space-between; gap: .5rem; min-width: 0 }
.head > :first-child { min-width: 0; overflow: hidden; text-overflow: ellipsis }
.head > :last-child  { flex: none }
```
⚠ Truncated text loses its end with no announcement — carry the full string in
`title` or a visually-hidden copy, and never truncate the only accessible name.
