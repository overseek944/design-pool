---
id: overflow-clip-over-hidden
category: layout
tags: [overflow,correctness,accessibility,scroll]
axes: none
cost: 1
seen: 22
requires: []
conflicts: []
completes: []
tension: []
---
`overflow: clip` crops without creating a scroll container. `hidden` does not —
it makes the box programmatically scrollable, so focusing a clipped child
scrolls it invisibly out of view, `position: sticky` descendants stop sticking,
and anchor jumps land inside it. Use `clip` wherever the intent is only to crop:
rounded fills, masked thumbnails, hover wipes. Reserve `hidden` for boxes that
really do scroll.

```css
.fill { border-radius: var(--r); overflow: hidden }
@supports (overflow: clip) { .fill { overflow: clip; overflow-clip-margin: 0px } }
```
⚠ `overflow-clip-margin` reopens a controlled bleed of 0–24px for glows and
focus rings that would otherwise be cut. Without it a `:focus-visible` outline
on a clipped child is invisible.

Variant — `clip` takes two axis values where `hidden` effectively cannot:
`overflow: clip visible` crops horizontally while letting a dropdown, tooltip or
glow escape vertically. `hidden visible` is silently computed back to
`hidden hidden`, so this is the only way to get one-axis cropping without a
mask.

Page-level bleed is the case worth naming separately. Overflow set on `html` or
`body` propagates to the viewport and takes the document's scrolling semantics
with it; set on any other wrapper, `hidden` makes that wrapper the scroll
container and every sticky inside it stops. Put `overflow-x: clip` on a wrapper
element instead — it crops the same bleed, the root keeps its scrolling, and
sticky descendants survive.

The two-declaration form repeats itself at every use site. Invert the polarity
instead: define the fallback in a root property that exists *only* where the
feature is missing, and let `var()`'s own fallback slot carry the modern value.
One declaration per element, and the browser split is stated once.
```css
@supports not (overflow: clip) { :root { --clip: hidden } }
.fill { overflow: var(--clip, clip) }
```
⚠ Worth the indirection above roughly a dozen call sites; below that the plain
`@supports` block is the more readable of the two.

Neither value clips a `<video>`, a `<canvas>` or anything else the compositor
has promoted to its own layer: the ancestor's `border-radius` is a paint-time
crop the layer never sees, so square corners poke through a rounded card. Restate
the same rounding as a `clip-path` on the container — that one does apply — and
keep the radius in a property so the two cannot drift.
```css
.card { --r: 14px; border-radius: var(--r); overflow: clip;
        clip-path: inset(0 round var(--r)) }
```
⚠ `clip-path` opens a containing block for fixed descendants, so a popover
anchored inside the card is trapped by it.

The page-level case is silent because nobody writes the property that breaks
it. `overflow` is not per-axis at computed time: declare `overflow-x: hidden`
alone and `overflow-y` computes from `visible` up to `auto`, so the wrapper
becomes a scroll container with no second declaration to search for. The sticky
child still reads `position: sticky` in the inspector and simply never sticks.
Walk the ancestors and read the computed values, not the stylesheet.
```js
for (let n = el.parentElement; n; n = n.parentElement) {
  const { overflowX: x, overflowY: y } = getComputedStyle(n)
  if (x !== 'visible' || y !== 'visible') console.warn(n, x, y)
}
```
⚠ `clip` propagates differently — `overflow-x: clip` computes the other axis to
`clip`, not to `auto` — so the fix has no equivalent trap but also silently
kills vertical scrolling on a box that needed it. Write both: `overflow: clip auto`.
