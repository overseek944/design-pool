---
id: layer-order-preamble
category: perf
tags: [architecture,cascade,css,correctness,code-splitting]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Cascade layers are ordered by first mention, so with code-split CSS the winner of
a conflict depends on which chunk the network delivered first — a bug that only
shows up on a cold cache or a slow route. Repeat the same bare `@layer` ordering
statement at the top of every stylesheet. It declares order without defining
anything, is idempotent, costs a few bytes gzipped, and pins the cascade no
matter the load sequence.

```css
/* first line of every emitted stylesheet */
@layer reset, base, components, utilities;
```
⚠ The lists must be identical everywhere — a chunk that omits a layer or reorders two silently reintroduces the race. Generate the line, do not hand-write it.
