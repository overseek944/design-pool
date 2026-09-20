---
id: coordinated-group-state
category: interaction
tags: [interaction,surface,hover]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 7
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
