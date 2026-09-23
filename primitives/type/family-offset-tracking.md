---
id: family-offset-tracking
category: type
tags: [type,tracking,letter-spacing,token,font-pairing,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: [cap-matched-family-mix]
tension: []
---
A shared tracking ladder — tight, normal, wide — is tuned against one face; a
second family set through the same tokens lands too dense or too loose at every
step. Give each secondary family a signed offset token and sum it into whatever
role tracking applies, so the ladder stays one scale and each face carries its
own correction. Offsets of ±.01–.03em cover most serif/grotesque pairs.

```css
:root { --track-tight: -.025em; --serif-track: .015em }  /* ±.01–.03em */
.serif { letter-spacing: var(--serif-track) }
h1.serif { letter-spacing: calc(var(--track-tight) + var(--serif-track)) }
```
⚠ Every compound rule must include the offset; any tracking utility that
replaces `letter-spacing` outright silently drops it.
