---
id: wrap-joined-marker-block
category: type
tags: [type,emphasis,highlight,decoration,radius,detail]
axes: {energy: 2, density: 2, weight: 4, finish: 4}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A solid block behind a phrase paints one rectangle per line, so at a wrap the
two fragments read as two separate marks. `box-decoration-break: clone` gives
each fragment its own padding and radius; then round only the corners on the
outside of the run and cut the two at the join almost square, and the pair reads
as one shape folded around the break. Where the leading opens a seam, overlap
the fragments by 2–6% of the line box and order them on z. Outer radius
0.2–0.4em, join 0.04–0.1em.

```css
.mark { box-decoration-break: clone; padding: .1em .22em; background: var(--accent) }
.mark-a { border-radius: .3em .3em .3em .05em; z-index: 2 }
.mark-b { border-radius: .3em .05em .3em .3em; margin-top: -.04em }
```
⚠ The fragments are authored spans, so the join sits where the line broke at one
width — give them a uniform radius at any breakpoint where the text rewraps, or
the notch lands mid-line. The block is a colour change: the pair must clear
4.5:1 on its own.

Padding is the wrong lever where the leading is not fixed: it grows the block
with every line-height change and a display line set loose ends up in a slab.
Paint the band as a sized background image instead — a two-stop gradient of one
colour, `background-size: 100% <height>`, positioned off the line box — so its
height is stated in `em` of the text and stays put whatever the leading does.
`clone` still applies. Band 0.95–1.15em, position 52–60%.
```css
.mark { background: linear-gradient(var(--accent), var(--accent)) 0 56%/100% 1.08em
        no-repeat; padding-inline: .14em; box-decoration-break: clone }
```
⚠ A band shorter than the glyphs cuts ascenders and descenders on the *outside*
rather than framing them — check the face's tallest and deepest characters, not
an x-height sample.

Once the band is a gradient its *ends* are free, and a hard vertical edge is
what makes an emphasis mark read as a UI chip rather than ink. Ramp the fill to
transparent over the outer 6–12% of the run and tilt the gradient a few degrees
off square, and the mark terminates the way a wet marker does — no edge to
align, and the first and last glyphs sit on a tint rather than against a wall.
Alpha 20–35% keeps the run off the contrast budget entirely.
```css
.mark { background: linear-gradient(100deg, #0000 0%, var(--accent-a) 8% 92%, #0000 100%);
        border-radius: .18em; padding-inline: .3em }
```
⚠ The feathered ends are inside the padding, so a run that wraps fades at each
line break as well — read as intentional at two lines, as a fault at four.
