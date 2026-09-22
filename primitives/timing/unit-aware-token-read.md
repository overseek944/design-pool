---
id: unit-aware-token-read
category: timing
tags: [tokens,correctness,motion,build]
axes: none
cost: 1
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
Script reading duration tokens out of computed style must parse the unit. CSS
minifiers rewrite `400ms` to `.4s`, so a bare `parseFloat` yields 0.4 and every
animation runs a thousand times fast — a bug that exists only in the production
build. Read the string, test the suffix, normalise to ms. The stylesheet may not
have parsed yet either: retry at 40–80ms for up to ~3s, then fall back to the
authored numbers.
```js
const ms = n => { const v = getComputedStyle(root).getPropertyValue(n).trim()
  const f = parseFloat(v) || 0
  return /ms$/i.test(v) ? f : /s$/i.test(v) ? f * 1000 : f }
```
⚠ Keep an easing fallback: `element.animate` throws on an empty easing string.

A *length* token does not survive this at all. `getPropertyValue` returns the
declaration text, so a fluid token hands back the literal `clamp(...)` string
and `parseFloat` yields its first term — a plausible number that ignores the
viewport entirely. Resolve it through layout instead: assign the token to a
probe's `width`, read the computed pixels back, and recompute on resize because
the `vw` term moves. Any library taking a unitless number needs this.
```js
probe.style.width = `var(${name})`
const px = parseFloat(getComputedStyle(probe).width)
```
⚠ A registered `<length>` property computes without the probe, but only where
`@property` is supported. Duplicating the slope in script is the trap this
replaces — the two copies drift at the next design change and nothing fails
loudly.

An easing token survives the trip better than a duration, and `linear()` is why
it is worth making. A spring sampled into a `linear()` list is a plain string:
declare it once as a custom property, and the same token drives a CSS
`transition` and a WAAPI `easing` with no parsing and no second copy of the
curve in script. A `cubic-bezier()` token works identically. This is the only
way a JS-measured animation and a CSS one can be guaranteed to match.
```js
const ease = getComputedStyle(el).getPropertyValue('--spring').trim() || 'ease-out'
el.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: 400, easing: ease })
```
⚠ `element.animate` throws on an empty string, so the fallback is required, not
defensive — the property is empty until the stylesheet parses.

The same probe answers a unit script cannot reach at all. `innerHeight` is the
*large* viewport, so a section budgeted in `svh` and the same budget recomputed
in JS disagree by the whole height of mobile chrome; `dvh` and `lvh` are
equally unreadable, and there is no formula to reimplement — only the engine
knows. Carry the declaration on a hidden zero-width fixed element and read its
`offsetHeight` back.
```js
probe.style.cssText = 'position:fixed;width:0;height:100svh;visibility:hidden'
const svh = () => probe.offsetHeight || innerHeight
```
⚠ `offsetHeight` rounds to an integer and forces layout — read it once per
relayout, never inside a scroll handler, and keep one probe for the life of the
page rather than building it per call.

A *colour* token defeats both routes: `oklch()`, `color-mix()` and a chain of
`var()` cannot be parsed by hand, and no layout property hands back a number.
Make the engine resolve it — assign the token as `fillStyle` on a 1×1 scratch
context, fill one pixel, and read the channels back. Any syntax the browser
supports resolves, including ones postdating the code. Do it once per theme
change, not per frame; `getImageData` is a readback.
```js
const g = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
g.fillStyle = getComputedStyle(el).color; g.fillRect(0, 0, 1, 1)
const [r, gr, b] = g.getImageData(0, 0, 1, 1).data      // now usable as rgba()
```
⚠ `fillStyle` silently keeps its previous value on an unparseable string, so
seed it with a known-bad colour and check it changed. The probe flattens alpha
against nothing — read `globalAlpha` separately if the token carries one.

Computed style reports the *current interpolated* value of a property that is
mid-animation, not the declared one, which makes a CSS timeline readable from
script without a second copy of its duration anywhere. Poll the one property
that is moving and derive the dependent event from it — a second element
released once a wipe has passed the point it belongs at, a handler armed at a
threshold. The same read answers whether the animation exists at all: a property
computing to its unanimated value is the reduced-motion branch, and the right
response there is to fire immediately rather than wait.
```js
const s = getComputedStyle(el)
if (s.maskImage === 'none' || parseFloat(s.maskPosition) <= 45) release()
```
⚠ Every `getComputedStyle` read forces a style recalculation — poll one property
on a rAF you already own, never several, and stop the loop the frame the gate
opens or this costs more than the timeline it is reading.
