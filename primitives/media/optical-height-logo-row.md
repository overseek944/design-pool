---
id: optical-height-logo-row
category: media
tags: [media,logos,normalisation,scale,responsive]
axes: none
cost: 1
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
Supplied marks are drawn to different conventions — a wordmark fills its box, a
roundel or a mark-over-tagline lock-up wastes half of it — so one uniform height
makes the second kind read as small and timid. Size the row by height rather
than by column width, fluid between the narrow and wide ends, and ship a single
outlier class that raises the stacked lock-ups until they carry the same optical
weight. Two heights covers almost every supplied set.

```css
.row  { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)) }
.row img { height: clamp(1.1rem, 4vw, 1.75rem); width: auto;
           max-width: 100%; object-fit: contain }
.row .stacked { height: clamp(2rem, 6vw, 2.9rem) }   /* 1.5–1.75× */
```
⚠ `minmax(0, 1fr)` is load-bearing: plain `1fr` floors at min-content, so one
wide mark blows the row past its container.

Past two outlier classes, give each mark its own authored height and multiply
them all by one variable. The optical decision is made once per logo and never
revisited; the responsive decision is a single number per breakpoint instead of
a clamp retuned on every mark. It scales a set of any size, and a swapped logo
touches one declaration.
```css
.row    { --logo-h: .82 }
@media (width >= 40rem) { .row { --logo-h: 1 } }
.row img { height: calc(var(--h) * var(--logo-h) * 1px); width: auto }
/* <img style="--h:28"> per mark */
```

The decision inverts when the art should *exceed* its slot. Line drawings of
unrelated subjects — one wide, one tall — sized to fit a uniform box land at
unrelated optical weights. Give every slot one size for the rhythm, take the art
out of flow inside it, and author a width and an offset per item so each drawing
sits at the scale it was drawn for and overhangs freely. The grid keeps the
rhythm; the art keeps its weight.
```css
.slot     { position: relative; width: 6rem; aspect-ratio: 1 }
.slot img { position: absolute; max-width: none }
.art-2    { width: 156px; top: -14px; left: -30px }   /* per item */
```
⚠ Nothing clips the overhang — budget the row's gap for the widest overshoot,
and restate the offsets where the row stacks.

Height is not the only convention a supplied set breaks. Some marks arrive
light-on-dark, baked into an opaque rectangle, and on a tinted row they read as
redactions no sizing rule can fix. Give every slot the same plate — one radius,
one height, the lightest ground in the set — so the odd mark's own rectangle is
contained by a frame the reader already sees as a container rather than sitting
on the section like a hole. Padding 12–20% of the slot height.
```css
.slot { display: grid; place-items: center; background: var(--paper);
        border-radius: 8px; padding: 0 1.25rem; block-size: 4.5rem }
```
⚠ Never normalise a supplied mark with `filter` or `mix-blend-mode`: it is a
trademark, altering it is usually outside the licence, and a mid-value logo goes
to mush either way. Ask for the transparent variant or plate it.
