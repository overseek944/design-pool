---
id: revert-split-on-resize
category: perf
tags: [type,motion,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Split text hard-codes line breaks at split time. On resize or webfont load the
breaks are wrong until reverted and re-split. Always keep the instance and call
`.revert()` before recomputing.
