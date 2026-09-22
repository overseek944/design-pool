---
id: native-disclosure-animation
category: interaction
tags: [motion,disclosure,accessibility,progressive-enhancement,height]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 13
requires: []
conflicts: []
completes: []
tension: []
---
`::details-content` with `interpolate-size: allow-keywords` animates a native
`<details>` from `height: 0` to `height: fit-content` — real accordion motion
while keyboard behaviour, find-in-page and the open/close semantics stay the
platform's job. No height measurement, no JS. Durations 0.24–0.4s on a firm
in-out curve; anything slower reads as lag on a control the user just clicked.

```css
.item { interpolate-size: allow-keywords }
.item::details-content { height: 0; overflow: hidden;
  transition: height .32s cubic-bezier(.65,.05,.36,1), content-visibility .32s allow-discrete }
.item[open]::details-content { height: fit-content }
```
⚠ Gate on `@supports` and let unsupported engines open instantly. Never
substitute a guessed `max-height` — the easing is then wrong at every length.

Variant — put `interpolate-size` itself inside
`@media (prefers-reduced-motion: no-preference)` rather than guarding the
transition. Without the keyword-interpolation opt-in the open state jumps
straight to its height and there is no transition left to suppress, so the
reduced branch is one wrapper instead of a second rule. `height: auto` on the
open state behaves identically to `fit-content` here and reads more plainly.

Where `::details-content` is not available, the fallback is not a guessed
`max-height` — it is `grid-template-rows` interpolating `0fr` to `1fr` with the
content in a `min-height: 0; overflow: hidden` child. The row track resolves to
the content's real height at both ends, so the easing is correct at any length,
and the whole thing is two declarations on a wrapper that costs nothing when
closed. 0.2–0.32s, same curve as the native branch.
```css
.panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .22s var(--ease) }
.panel[data-open] { grid-template-rows: 1fr }
.panel > * { min-height: 0; overflow: hidden }
```
⚠ `overflow: hidden` on the inner child clips a focus ring that overflows it, so
an inside control looks unfocused while open — pad the child or inset the ring.

Transition `opacity` alongside the size and the panel resolves rather than
unrolling — at these durations a body of text sliding in at full strength reads
as mechanical. Run the fade slightly shorter than the height so it finishes
into a settled box. Use the logical `block-size` and `overflow-y: clip`: `clip`
crops without making the closed panel programmatically scrollable, which is how
a focused control inside a shut `<details>` scrolls its own ancestor.
```css
.item::details-content { block-size: 0; opacity: 0; overflow-y: clip;
  transition: block-size .28s var(--ease), opacity .24s var(--ease),
              content-visibility .28s allow-discrete }
.item[open]::details-content { block-size: auto; opacity: 1 }
```

Where script must own the height anyway — a panel outside `<details>`, a
measured target the keyword interpolation cannot reach — the from-value is the
panel's *current* measured height, never its resting one. Read it with
`getBoundingClientRect` at the moment of the toggle, animate to the measured
target, write `auto` on finish, and on teardown pin the measured height before
cancelling. Rapid toggling then reverses out of wherever it had got to instead
of snapping to a closed box.
```js
const from = el.getBoundingClientRect().height           // mid-flight, not 0
const a = el.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: 400, easing })
a.onfinish = () => { el.style.height = open ? 'auto' : '0px' }
```
⚠ Mark the closed panel `inert` as well as `aria-hidden`, and `visibility:
hidden` its contents — a zero-height overflow-hidden box still holds focusable
children in the tab order.
