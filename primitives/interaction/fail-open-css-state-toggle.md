---
id: fail-open-css-state-toggle
category: interaction
tags: [interaction,css-only,progressive-enhancement,disclosure,correctness,accessibility]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A visually hidden checkbox plus `:has()` gives expand, filter and tab state with
no script — but the closed half is authored in the *unchecked* default, so an
engine without `:has()` clips the content permanently behind a control that does
nothing. Pair every such rule with the negated feature query: restore the open
state, hide the now-inert toggle. It tests a selector, not a property, so it
only parses written as `selector(...)`.

```css
.body { max-height: 6.6em; overflow: hidden }
.wrap:has(input:checked) .body { max-height: none }
@supports not (selector(:has(*))) {
  .body { max-height: none }  .toggle { display: none }   /* fail open */
}
```
⚠ Ring the label via `:has(input:focus-visible)` — the real control is
off-screen and takes the ring nowhere visible. Clipped text is still reachable
by find-in-page, which scrolls to a region the reader cannot see; only
`hidden="until-found"` fixes that, and it needs script.
