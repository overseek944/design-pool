---
id: coordinated-group-state
category: interaction
tags: [interaction,surface,hover]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 13
requires: []
conflicts: []
completes: []
tension: []
---
Hover the container, animate the parts. A single `group` parent lets an arrow
translate, a border brighten and a glow lift from one state change — the whole
card responds as one object instead of three independent hovers.
```html
<a class="group"> <svg class="transition-transform group-hover:translate-x-[.15vw]">
```

The parent state need not be hover. Key the same container selector off a
native `[open]`, `[aria-current]` or `:checked` and one attribute flip drives
every part — a `+` rotating 45° into a close mark, a chevron turning, a rail
tinting. The state then lives where the platform already keeps it rather than
in a class the script has to remember to remove.

A part that *moves* on parent hover wants two guards, not one: `hover: hover` so
a tap on a touch device does not strand it displaced under sticky `:hover`, and
a reduced-motion branch so the nudge is colour or weight instead. Parts that
only change colour need neither. Travel 1–3px — past that it reads as a jump.

`:has()` inverts it — the container reacts to a *descendant's* hover, so peers
recede instead of the target gaining: `.list:has(a:hover) a:not(:hover)
{ opacity: .4 }`. Subtractive emphasis, for a long list of equals. Run the dim
1.3–1.6× slower than the colour beside it so it never snaps.

Where the part's response is a *loop*, declare it always and gate
`animation-play-state` rather than adding the animation on hover — adding it
restarts from 0% each entry, so a sweep across three cards reads as three false
starts. Name pseudo-elements explicitly; they are not descendants.
```css
.tile .anim, .tile .anim::after { animation-play-state: paused }
.tile:hover .anim, .tile:hover .anim::after { animation-play-state: running }
```

The `:has()` inversion has a second use — *yielding*. Where an interactive
region wraps smaller interactive children, both claim hover and the reader
cannot tell which will fire. Let the outer one retract its own affordance while
a child is hovered, and exactly one target is ever lit.
```css
.target:has(a:hover) > .mark { opacity: 0; transform: scale(0) }
```
⚠ Only the affordance retracts; the outer target stays clickable, so keep the
two regions distinguishable some other way — a cursor, a label, an inset.

`:has()` also answers a question with no state in it: what is in this box. A
control can trim its own padding when a leading icon is present, because a glyph
carries less optical weight at an edge than a letterform does —
`:has([data-icon=inline-start])` cuts the inline-start padding by a quarter to a
third. Write it on the logical axis and the compensation flips with writing
direction for free.

Pair every group trigger with `:focus-within`, always in the same rule. Where
the card's affordance *is* the group response — a plate that grows behind it, a
border that arrives — hover alone means a keyboard reader tabs onto a target
with no visible change at all beyond the focus ring, and cannot tell which of
twelve tiles is armed. The focus ring proves where focus is; the group response
is what says the thing is ready.
```css
.group:hover .plate, .group:focus-within .plate { opacity: 1; scale: 1 }
```
