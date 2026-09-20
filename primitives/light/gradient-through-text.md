---
id: gradient-through-text
category: light
tags: [color,type,effect]
axes: {energy: 3, density: 2, weight: 4, finish: 3}
cost: 2
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
`background-clip: text` with a transparent fill turns a headline into a window
onto a gradient or animated layer. Animate the background, not the text, and the
letterforms stay crisp.
```css
background: linear-gradient(...); -webkit-background-clip: text; color: transparent;
```

Build the gradient out of `currentColor` mixed toward transparent and the
effect stops needing a colour of its own: one class shimmers correctly over any
inherited text colour and in both themes, because the highlight *is* the text.
Sweep `background-position` across a `200%` background rather than moving the
element.

```css
.shimmer { background-image: linear-gradient(90deg,
    color-mix(in oklab, currentColor 45%, transparent) 38%, currentColor 50%,
    color-mix(in oklab, currentColor 45%, transparent) 62%);
  background-size: 200% 100%; animation: sweep 2s linear infinite }  /* 1.6–3s */
```
⚠ The reduced-motion branch must restore `-webkit-text-fill-color: currentColor`
and drop the image. `animation: none` alone leaves the fill transparent — the
text is simply gone. Same trap behind any `@supports` fallback.

A gradient across a headline is only as legible as its worst stop, and hues
taken straight off the palette usually put that floor well under the body text's.
Mix every stop 15–30% back toward the foreground colour: the sweep survives, the
contrast floor is set by a token that already passes, and one stop list then
works in both themes.
```css
background: linear-gradient(135deg, var(--fg) 0%,
  color-mix(in oklab, var(--brand) 75%, var(--fg)) 60%, var(--accent) 100%);
```
⚠ Score each stop against the ground on its own — an average of the stops is not
a contrast ratio, and the failing one is usually the saturated middle.

Sweeping `background-position` plays or stops and nothing else. Make the
highlight's *position* a registered `<percentage>` and write every stop relative
to it — `background-size: 100% 100%`, no tiling — and the sweep becomes a value:
transitionable, interruptible, settable from scroll or from state, parkable
mid-travel. Shape it with graded shoulders rather than three stops (±2–3% glint,
±7% soft, ±14–23% falloff) and it reads as a glint over a surface instead of a
band crossing it. Run −18%→118% so it clears both ends.
```css
@property --sweep { syntax: "<percentage>"; inherits: false; initial-value: -18% }
background-image: linear-gradient(100deg, var(--base) 0,
  var(--soft) calc(var(--sweep) - 7%), var(--hot) var(--sweep),
  var(--soft) calc(var(--sweep) + 7%), var(--base) calc(var(--sweep) + 23%));
```
⚠ Wrapped text needs `box-decoration-break: clone` or the gradient spans the
whole inline box and every line after the first gets only its tail.

`background-clip: text` needs `display: inline-block`, and that box clips
ascenders and descenders the moment leading drops below about 1.3em — the tell
is a shorn `g` or a flattened `f` that only appears on the tight headline.
Compensate symmetrically: pad by half the shortfall and pull it back with a
negative margin of the same size, so the paint box grows and the layout box
does not move.
```css
.fill { display: inline-block;
  padding: max(0em, calc((1.3em - var(--lh)) / 2));
  margin:  min(0em, calc((1.3em - var(--lh)) / -2)) }
```
