---
id: three-tier-token-redefinition
category: scale
tags: [unit,tokens,architecture]
axes: none
cost: 2
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
One token name, three definitions: fluid desktop → fluid mobile → static floor.
Consumers never branch; every component reads `var(--fs-md)` and gets the right
value at every width. Breakpoint logic lives in exactly one block.
