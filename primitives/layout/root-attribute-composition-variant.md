---
id: root-attribute-composition-variant
category: layout
tags: [layout,variant,experiment,css-only,architecture]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Two arrangements of one section — a split hero against a centred one, a light
panel against an inverted one — need not be two component trees. Author the
base composition, then one delta block keyed to an attribute the server writes
on the root. An arm then costs a stylesheet block rather than a second render
path, there is no hydration mismatch and no flash before paint, and retiring
the loser is deleting rules. Keep the delta additive: two full compositions
drift apart by the third edit.

```css
.hero          { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.02fr) }
[data-arm=b] .hero { grid-template-columns: 1fr; text-align: center; max-inline-size: 64rem }
```
⚠ CSS reorders what is painted, not what is read. One DOM order has to be
sensible in every arm or one of them ships a broken tab order — and anything
the arms cannot share, different copy or an extra control, is a render branch
rather than a rule.

The degenerate arm is `display: none`, and it is the cheapest retirement switch a
navigation can have. Tag every entry pointing at a destination that may not ship
and let one server-written root attribute withdraw all of them at once: header,
mobile sheet and footer stay one markup, the link returns by flipping an
attribute, and nothing flashes because nothing was ever painted.
```css
html[data-feature-x="off"] [data-feature="x"] { display: none !important }
```
⚠ It hides the link from the reader, not from the document — the href still
ships, is still crawled and still reads in view-source. A destination that must
not be discovered is a render branch, not a rule.

The "no flash before paint" claim holds only while the server writes the
attribute. When the arm comes from a client SDK the root is bare at first
paint, and the honest answer is not to block on the SDK but to guess well:
write the answer this reader got last time — held in `sessionStorage`, not
`localStorage`, so a re-bucketed reader is corrected on their next visit rather
than never — then reconcile when the flag resolves and cap that wait so a
blocked SDK still leaves the page armed. 3–5s, and persist on every resolve.
```js
const armed = sessionStorage.getItem(KEY)
if (armed) root.dataset.arm = armed                       // before first paint
sdk.onFlags(once); setTimeout(once, 4000)                 // whichever lands first
```
⚠ This only works while the arms are a CSS delta. A late flip must be a
restyle, so anything the arms cannot share — different copy, an extra control —
turns the reconcile into a visible re-render in front of the reader, which is
worse than the flash it was avoiding. Apply idempotently: the optimistic write
and the reconcile will often set the same value.
