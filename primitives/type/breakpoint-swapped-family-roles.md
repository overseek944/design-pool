---
id: breakpoint-swapped-family-roles
category: type
tags: [type,responsive,breakpoint,tokens,pairing,serif]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Which of two faces can carry display size is a function of rendered size, not of
the design. A high-contrast serif holds its hairlines at 48px and above and
thins toward grey by 32–36px, where a geometric sans still cuts. Let the pair
trade jobs at that width — serif display over sans deck when wide, sans display
over serif deck when narrow. Keep the family in a token owned by the role rather
than the element, so the role keeps its identity and only the face behind it
moves.

```css
:root { --face-display: var(--serif); --face-deck: var(--sans) }
@media (width < 30rem) {
  :root { --face-display: var(--sans); --face-deck: var(--serif) } }
```
⚠ Both faces must hold both jobs or the swap only relocates the problem, and
tracking has to move with it — two cuts never want the same value at one size.
