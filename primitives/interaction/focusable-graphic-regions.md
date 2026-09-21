---
id: focusable-graphic-regions
category: interaction
tags: [accessibility,svg,focus,diagram,correctness]
axes: none
cost: 2
seen: 4
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

`tabindex="0"` on every region is what makes the tab order follow document
order, so the warning above is a symptom rather than the problem. Put one stop
in the tab order — the selected region — give the rest `-1`, and move the
selection with arrow keys that wrap at both ends. The drawing then costs a
keyboard reader a single Tab whether it holds six regions or sixty, and the
sequence is the author's rather than the file's. Announce the change once, in a
visible `aria-live="polite"` label beside the figure.
```js
regions.forEach((r, i) => r.tabIndex = i === sel ? 0 : -1)
const step = (k, i) => k === 'ArrowRight' ? (i + 1) % n : k === 'ArrowLeft' ? (i + n - 1) % n
  : k === 'Home' ? 0 : k === 'End' ? n - 1 : null
```
⚠ Home and End matter more here than in a list — a wrapping ring has no visible
start. Keep a plain list of the same choices beside the drawing; it is the only
route for a reader who cannot see which region is lit.

The drawing need not be inline. An `<object>` keeps a large graphic as its own
cacheable asset and out of the HTML payload, and a same-origin host can still
reach `contentDocument` to bind every behaviour above. Guard the read in
`try`/`catch` — a cross-origin document throws rather than returning null — and
run the binding on `load` *and* immediately, since the child may already be
parsed when the script arrives. Flag the container so a second call cannot
double-bind.
```js
const bind = () => { let d; try { d = obj.contentDocument } catch { return }
  if (!d || host.dataset.bound) return
  host.dataset.bound = '1'; enhance(d.querySelector('svg')) }
obj.addEventListener('load', bind); bind()
```
⚠ Styles and fonts do not cross the boundary: the graphic carries its own or it
renders unstyled. Nothing inside it is in the host's tab order until the script
grants it, which is the lifetime rule above applied across documents.
