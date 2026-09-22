---
id: viewport-height-bands
category: layout
tags: [layout,responsive,media-query,ornament,correctness]
axes: none
cost: 1
seen: 28
requires: []
conflicts: []
completes: []
tension: []
---
Some decisions belong to the short axis. An opening frame, a pinned figure or
marginal ornament is rarely broken by a narrow window — it is broken by a
shallow one, and width breakpoints cannot see that. Branch on
`min-height`/`max-height`: cap a tall figure so it stays whole, or withhold a
decoration until both axes have room for it. Bands: under 700px, 700–1100px,
over 1300px.
```css
.ornament { opacity: 0 }
@media (min-width: 1100px) and (min-height: 700px) { .ornament { opacity: 1 } }
@media (max-height: 780px) { .stage { padding-block: 100px } }
```
⚠ Mobile chrome resizes the viewport mid-scroll, so a height query can flip on
its own. Keep these behind a pointer-and-keyboard width.

The strongest use is withdrawal, not adjustment. Height decides whether a
pinned multi-screen section should exist at all — on a short window its lower
half is unreachable — so gate the pin itself and let the section fall back to
ordinary flow. Gates 700–780px.

`pointer: coarse` is the discriminator the width was standing in for. The case a
height band usually means is a phone turned sideways — 380–500px tall, wide, and
nothing fits — which a width query cannot distinguish from a wide desktop
window, and a width *floor* excludes outright. Ask for the three facts that
actually define it.
```css
@media (orientation: landscape) and (height <= 500px) and (pointer: coarse) {
  .stage { min-height: 0; padding-block: 1rem }
}
```

A panel inside a resizable pane, a modal or a split view cannot ask the
viewport — its height is the pane's. Make it a `size` container and branch on
`@container (height < N)`, then step down rather than switch: withdraw the
ornament at the first gate, collapse padding and drop one type step at the
second. Gates 600px and 740px. Take labels out with `sr-only`, not
`display: none`, so the visual collapse does not also strip the accessible name.
```css
.pane  { container: pane / size }
@container (height < 740px) { .ornament { display: none } }
@container (height < 600px) { .head { padding-top: 0 } .tag { /* sr-only */ } }
```
⚠ `container-type: size` needs a definite height from above and stops the panel
being sized by its own contents — a height query on an auto-height box never
matches.

The band has a continuous form that needs no query at all. Define the token
twice — once as a width-fluid `clamp()`, once as a height-fluid one whose middle
term is a line through two (viewport height, spacing) pairs — and take the
`min()`. Whichever axis is scarcer binds, the other is ignored, and an opening
section closes its gaps smoothly on a short laptop while a tall phone keeps them
open. Apply it to the gaps in the stack, never to the type: whitespace is what
should give up the fold first.
```css
--gap: min(clamp(32px, 10vw, 100px), clamp(54px, 25vh - 148px, 130px));
```
⚠ Solve the linear term from the two endpoints rather than tuning it by eye, and
keep the floor above the point where the heading touches what sits under it.
Mobile chrome resizes the viewport mid-scroll here too, so this belongs behind
the same pointer-and-keyboard width as the queries above.

There is a band below every real device, reached by zoom rather than by
hardware: 400% on a laptop leaves roughly 200–350px of layout height. A page
that locked its own scrolling — `overflow: hidden` for a one-screen composition
— traps everything clipped out of that band with no way to reach it, which is
the reflow failure in its purest form. Give the lock a floor and hand the
document its scrollbar back. Gate 320–360px.
```css
@media (max-height: 340px) { body { overflow-y: auto } }
```
⚠ Height bands normally flip on their own as mobile chrome slides; this one
cannot, because no phone is ever this short — it fires under zoom or not at all.

The short axis also has a form with no query at all. Give a replaced element
`max-height` in `vh` beside `max-width: 100%`, with `width` and `height` both
`auto`, and it solves its own ratio against whichever limit binds first. A
portrait diagram in a prose column otherwise renders taller than the screen it
is read on — at 3:5, a 720px measure is 1200px tall. Both `auto`s are
load-bearing: a global `img { height: auto }` over an already-set width defeats
the height cap silently. Caps 60–80vh.
```css
figure img { max-width: 100%; max-height: 70vh; width: auto; height: auto;
             margin-inline: auto }
```
⚠ The box is now intrinsic on both axes, so keep the `width`/`height`
attributes on the element — the cap otherwise reintroduces exactly the load
shift an `aspect-ratio` reservation was holding off.

The floor is the other half of the band, and it catches the device a width
breakpoint gets wrong: a portrait tablet is wide enough to pass a desktop gate
and far too tall to read a two-column arrangement, which then runs half a screen
of copy beside half a screen of dead gutter. Gate the *collapse* on a height
minimum rather than tightening the width — the same rule a phone would take,
reached from the other direction. Floors 1100–1300px, paired with a narrow width
window so a tall desktop monitor is untouched.
```css
@media (min-width: 1024px) and (max-width: 1080px) and (min-height: 1200px) {
  .split { grid-template-columns: 1fr }
}
```
⚠ Prefer `(orientation: portrait)` or an `aspect-ratio` query to a hard pixel
pair — the pixel form encodes one device and silently misses the next one.

One height gate is wrong for a stage that reflows. An arrangement that fits in
760px at two columns stacks at the narrow end and wants 880px there, so a single
threshold either withdraws the effect on desktops with room for it or leaves it
broken on the phones without. Write the gate as a comma list of width-and-height
pairs, one per band, and keep each pair beside the `min-height` token for that
same band — they are one number stated twice, and separating them is how they
drift. Steps of 40–100px per band down.
```css
.stage { --h: 760px }
@media (max-width: 1100px) { .stage { --h: 800px } }
@media (max-width: 760px)  { .stage { --h: 880px } }
@media (max-height: 759px),
       (max-width: 1100px) and (max-height: 799px),
       (max-width: 760px)  and (max-height: 879px) { .stage { --pinned: 0 } }
```
⚠ Check the clauses leave no gap — a viewport matching none of them keeps the
effect, and the hole is always at a band edge where nobody tests. A script
mirroring this needs one listener per clause, since a comma list fires `change`
only when the OR flips.
