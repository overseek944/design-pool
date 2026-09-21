---
id: party-keyed-field-tokens
category: color
tags: [color,tokens,form,attribution,review,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
On a form assembled from several parties — an applicant's answers, the office's
entries, a third party's attestation — the reviewer's first question about a
field is whose it is, and a status palette cannot answer it: every one of them
may be fine. Key a triad to the responsible party instead — surface tint, accent
for label and edge rule, focus ring — so a field states its owner at rest and
again under the keyboard. Three or four parties, plus an `other` bucket rather
than a fifth hue. Tint at 3–8% of the accent.

```css
[data-party=applicant] { --p-tint:#eff6ff; --p-accent:#1447e6; --p-focus:#155dfc }
[data-party=office]    { --p-tint:#fff7ed; --p-accent:#c53c00; --p-focus:#f05100 }
.field { background: var(--p-tint); border-inline-start: 2px solid var(--p-accent) }
.field :focus-visible { outline: 2px solid var(--p-focus) }
```
⚠ Attribution is not status — a party hue must not be one the page already
spends on success or error, or a column of fine fields reads as failing. Colour
never carries it alone: the party owes a word in the label.
