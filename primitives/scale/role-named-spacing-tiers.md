---
id: role-named-spacing-tiers
category: scale
tags: [tokens,architecture,rhythm,layout,scale]
axes: none
cost: 2
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
A t-shirt spacing scale makes every author guess which step a given seam wants,
so the same seam gets three values. Insert a third tier: one base unit, numeric
steps derived from it, and role names on top — `page`, `band`, `section`,
`card`, `chunk`, `stack`, `row`. Call sites name the *relationship* they are
spacing, never a size, so the rhythm survives a rescale. The payoff is that a
dense subtree only has to redefine the base.

```css
:root { --unit: .25rem; --step-lg: calc(var(--unit) * 3);
        --space-card: var(--step-2xl); --space-stack: var(--step-md) }
.compact { --unit: .225rem }             /* .18–.28rem; whole subtree tightens */
```
⚠ Role names must stay ordered and non-overlapping — the moment two resolve to
the same step, authors pick by feel and the tier stops meaning anything.

Roles can name the *axis* of the relationship rather than the container:
`stack` for the seam between things above and below each other, `inline` for
beside, `cluster` for a group of controls that travel as one. Three short
ladders instead of one long one, and a call site picks its ladder from the
layout direction it is already in — a flex row reaches for `inline`, a grid
column for `stack`. One physical value can then sit in two ladders without
ambiguity, because the name says which seam it is.
```css
--space-stack-md: var(--step-3);  --space-inline-md: var(--step-3);
.col { gap: var(--space-stack-sm) }   .row { gap: var(--space-inline-sm) }
```
⚠ Only pays where vertical and horizontal rhythm genuinely diverge. If the
ladders stay numerically identical at every step they are one ladder with two
names, and the second set is overhead.

Two seams the role set usually misses are the *first* and the *tight* one. The
gap above the opening band sits against chrome rather than against content, so
it wants its own name at 1.2–1.5× the between-section value; giving it the
ordinary `section` step makes the page start flush and look unfinished. A
`compact` step at 0.5–0.7× covers the bands that carry a single line. Retune the
whole ladder at `:root` per breakpoint, in the same block as the type scale —
rhythm and display size have to tighten together or a narrow page gets small
headlines in wide seams.
```css
:root { --space-section: 64px; --space-section-first: 80px; --space-section-compact: 40px }
@media (width <= 48rem) { :root { --text-h1: 2.5rem;
  --space-section: 40px; --space-section-first: 48px; --space-section-compact: 24px } }
```
⚠ Redefining at `:root` reaches every subtree that overrode the base unit for
its own density — scope the breakpoint block to the tokens the page-level rhythm
owns, or a deliberately compact region silently re-inflates.

The third tier can name *measurements* rather than relationships — every
one-off number the design actually has, registered at the root with its
breakpoint siblings beside it (`--panel`, `--panel-md`, `--panel-sm`) instead of
scattered inline. Names stay component-shaped, which the relationship ladder
forbids, and the payoff is composition: a height that is the sum of two others
is declared as that sum and can never drift from either.
```css
--announce: 44px; --navbar: 71px;
--chrome: calc(var(--announce) + var(--navbar));   /* scroll-padding, sticky top */
```
⚠ Custom properties do not resolve inside a media query condition, so
`--breakpoint-lg` cannot gate the query that switches these values — the literal
has to be written out and kept in step by hand. Comment every such literal with
the token it shadows; that pair is the registry's one unenforceable rule.
