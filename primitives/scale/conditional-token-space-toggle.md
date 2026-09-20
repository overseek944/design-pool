---
id: conditional-token-space-toggle
category: scale
tags: [tokens,architecture,css,correctness]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A custom property whose value is an empty token stream is a CSS boolean.
`--on: ;` makes `--a: var(--on) row-reverse` resolve to `row-reverse`; setting
`--on: initial` makes `--a` invalid at computed-value time, so
`var(--a, var(--b))` falls through to the off branch. One flag then switches any
number of unrelated properties from one place, with no duplicated selectors.

```css
.rail            { --on: initial; --dir-on: var(--on) row-reverse; --dir-off: row }
.rail[data-wide] { --on: ; }
.rail .bar       { flex-direction: var(--dir-on, var(--dir-off)) }
```
⚠ Only works through the custom-property layer — the flag must land in another
custom property first, never directly in a real declaration. Name both branches;
an unnamed fallback is unreadable six months later.

Variant — the two-flag form handles light/dark with no `prefers-color-scheme`
downstream: set `--light: initial; --dark: ;` at the root and invert the pair in
one theme class. Each token then picks its branch inline —
`--fg: var(--light, #111) var(--dark, #eee)` — a `light-dark()` that works
everywhere and switches any property, not only colours.
