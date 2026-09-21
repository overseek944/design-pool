---
id: breakpoint-abbreviated-label
category: type
tags: [type,accessibility,responsive,navigation,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A nav item or a column head that shortens at a narrow width — `Research` to
`RES`, `Documentation` to `Docs` — usually ships both strings and toggles
`display` on a media query. That rewrites the accessible name as well, so a
reader on a phone is announced the abbreviation. Pin the name on the control
with `aria-label` and mark the short span `aria-hidden`; `display: none` on the
visible spans is then correct rather than lossy, because the name no longer
comes from them. Gate 560–760px.

```html
<a href="/research" aria-label="Research">
  <span class="long">Research</span><span class="short" aria-hidden>RES</span></a>
```
```css
.short { display: none }
@media (width <= 40rem) { .long { display: none } .short { display: inline } }
```
⚠ `aria-label` overrides content for assistive tech but not for in-page find or
a runtime translation layer — keep the full word in the DOM, never only the
abbreviation. Where the swap happens inside a row that must not re-flow, reserve
the wider variant's width on the slot.
