---
id: coordinated-group-state
category: interaction
tags: [interaction,surface,hover]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 25
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

The container's trigger need not be a state at all. Gate the `:has()` inversion
on a *content* marker — a class an author puts on the lines, rows or cells that
matter — and the de-emphasis configures itself per instance with nothing on the
container: `code:has(.focused) .line:not(.focused)` dims only where something
was marked, and an unmarked block renders untouched. Blur rather than opacity
where the peers are text; 1.5–3px keeps shape and colour while making the words
unreadable, so the region still reads as a full block instead of a hole.
```css
code:has(.focused) .line:not(.focused) { filter: blur(2px) }
```
⚠ Blurring text repaints the whole box — cheap on a snippet, not on a long
document — and it hides nothing from a screen reader or from find-in-page, so
never carry meaning in the distinction alone.

The parts driven by one parent state should not share one duration. The
container's own response — a lift, a plate, a border arriving — is feedback and
has to land inside 120–200ms or the thing feels slow under the pointer, while a
contained image's zoom is atmosphere and wants 300–500ms. Run both at the fast
number and the card reads as a single object being scaled; run both at the slow
one and the pointer gets no answer. Ratio 2–3.5×.
```css
.card     { transition: translate .16s ease-out, box-shadow .16s ease-out }
.card img { transition: scale .45s ease-out }        /* 2–3.5× the container */
```
⚠ The slow part must also be the small one — half a second of travel worth more
than a few percent reads as lag rather than as depth. Scale 1.02–1.05, and the
image needs a clipping wrapper or the zoom pushes the card's own edge.

Where the moving part sits *under* text rather than beside it, the transform
cannot go on the card and cannot go on the image either if the image is the
card's ground — scaling either resamples the type laid over it and drifts the
reader's line under the pointer. Give the ground its own inset sibling inside
the clip, with the copy a separate child, and only that layer scales. The travel
also has to come down: against held text, 1–2% reads as the surface breathing
where the 2–5% a bare image takes reads as the card lurching.
```css
.card > .back    { position: absolute; inset: 0; transition: scale .5s ease-out }
.card:hover>.back{ scale: 1.015 }
```
⚠ The text layer must sit above the ground in paint order without its own
transform — a transform on the copy makes it a containing block and it starts
scaling with any ancestor that later gains one.

The group class is optional. Where the response belongs to the *mark* rather
than to a particular card, select the ancestor by what it is — and the
affordance ships with the icon, arming inside every control on the page with
nothing added to any wrapper. A data attribute on the mark picks the axis, so
one rule serves right, left and diagonal. Declaring the block inside
`no-preference` makes still the default rather than an override to remember.
```css
@media (prefers-reduced-motion: no-preference) {
  :is(a, button:not(:disabled), [role=button]):is(:hover, :focus-visible)
    .mark[data-dir="right"] { transform: translateX(2px) } }   /* 1–3px */
```
⚠ It arms inside *every* matching ancestor, so key it to the mark's own class —
a bare `svg` selector catches unrelated icons nested in the same link.
