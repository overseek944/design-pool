---
id: class-scoped-responsive-hide
category: layout
tags: [layout,responsive,breakpoint,correctness,accessibility,error]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A breakpoint that hides the secondary copy hides whatever else arrives in that
slot — a validation message, a failed-launch reason, an offline notice render as
the same element the rule matched. The narrow width is where those matter most
and where nobody looks for them. Select on what the content *is*, not on where
it sits: give the exceptional copy its own class and re-show it inside the same
query, so a third message type is one class, not an audit.

```css
@media (width <= 40rem) {
  .card > p          { display: none }    /* blurb — context */
  .card > p.status   { display: block }   /* failure, offline, validation */
}
```
⚠ `display: none` removes it from the accessibility tree too, so a live region
hidden this way announces nothing — the test is whether the message would still
reach a reader at 390px, not whether it fits.
