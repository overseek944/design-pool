---
id: focusable-graphic-regions
category: interaction
tags: [accessibility,svg,focus,diagram,correctness]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A drawing whose parts answer to the pointer — a map, a schematic, a labelled
assembly — is unreachable by keyboard and silent to a screen reader when only
the whole `<svg>` carries a label. Make each part its own figure instead:
`tabindex="0"` and `role="img"` on the group, an `aria-label` naming the part
*and* its value, and `aria-hidden` on the text already drawn inside so nothing
is read twice. The hover treatment then keys off `:focus` for free.

```html
<g class="part" tabindex="0" role="img" aria-label="Gulf — 15% uplift">
  <use href="#gulf" class="shape"/><text aria-hidden="true">15%</text>
</g>
```
```css
.part { outline-offset: 3px }                      /* 2–4px, off the stroke */
.part:hover .shape, .part:focus .shape { filter: brightness(1.45) }
```
⚠ Tab order follows document order, not the picture. Sort the groups into a
reading sequence or the keyboard walks the drawing at random.

Grant the `tabindex` from the script that binds the behaviour, and strip it in
the same teardown. Authored into the markup it is a promise the page makes
before anything can keep it: a reader tabs into a labelled region on a route
where the handlers never ran, or after a client-side navigation tore them down,
and finds a focus ring on something inert. Attribute and listener have one
lifetime, so the drawing advertises exactly the interactivity it currently has.
```js
parts.forEach(p => { p.setAttribute('tabindex', '0'); bind(p, { signal }) })
signal.addEventListener('abort', () =>
  parts.forEach(p => p.setAttribute('tabindex', '-1')))
```
⚠ `-1` on teardown, not removal — an element focused at that moment must keep a
valid target or focus drops to `<body>`.

The same lifetime rule covers real controls, not only regions of a drawing. A
button row that only means something once its handler is bound should ship
`hidden` on the group and `disabled` on each control, and the script that binds
them clears both as its last act. A dead bundle then yields a figure with no
controls — legible, honest — rather than buttons that swallow clicks, and no
`noscript` duplicate of the markup exists to drift.
```js
choices.forEach(b => { b.disabled = false; bind(b) })
group.hidden = false
```
⚠ Reserve the row's height or clearing `hidden` shifts everything below it.
Anything the controls are the *only* route to has to be stated somewhere else
in the figure, or a reader without script loses the content and not just the
interaction.
