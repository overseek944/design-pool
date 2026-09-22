---
id: scrollbar-on-activity
category: scroll
tags: [scroll,scrollbar,chrome,restraint,state]
axes: {energy: 1, density: 1, weight: 1, finish: 5}
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
A permanent scrollbar rules a line down every panel that owns one. Keep the
track but leave the thumb transparent, painting it only while that element is
actually scrolling — position when it is being used, a clean surface when it is
not. Scroll does not bubble, so one capture listener stamps every scroller on
the page. Idle 600–1200ms.

```js
addEventListener('scroll', e => {          // capture — scroll does not bubble
  const el = e.target === document ? document.documentElement : e.target
  el.dataset.scrolling = ''                // [data-scrolling]{scrollbar-color:…}
  clearTimeout(m.get(el))
  m.set(el, setTimeout(() => delete el.dataset.scrolling, 900))
}, { capture: true, passive: true })
```
⚠ Reserve the track with `scrollbar-gutter: stable`. `scrollbar-color` and
`::-webkit-scrollbar` are rival styling models — pick one.

The two styling models are not merely rival, they are exclusive per element:
where any `::-webkit-scrollbar` rule matches, Chromium switches that scroller to
the legacy path and the standard properties beside it stop applying. Shipping
both blocks therefore leaves one of them dead — usually the standard one, which
is the one that will outlive the other. Scope whichever survives to the
scroller's own class rather than the root, so a panel opts in without every
scroller on the page inheriting a theme.
```css
.pane { scrollbar-width: thin; scrollbar-color: var(--thumb) var(--track) }
```
⚠ Thumb against track wants 2.5–3:1 and the track against the panel about 1.3–2:1
— a scrollbar tinted down to decoration has stopped reporting position.

The legacy path has no padding property: `::-webkit-scrollbar-thumb` fills the
track edge to edge, and a thumb touching both walls reads as a fill bar rather
than a grip. Inset it with a transparent border and `background-clip:
padding-box` — the border reserves the space, the clip stops the background
painting into it, and the hit area stays the full width. Border 2–3px against a
10–12px track.
```css
::-webkit-scrollbar-thumb { background: var(--thumb); border-radius: 8px;
  border: 2px solid transparent; background-clip: padding-box }
```
⚠ The rule has to be repeated on `:hover`: changing only `background` there
drops the clip and the border alongside it, and the thumb jumps to full width
under the pointer.

The same reveal with no script: leave `scrollbar-color` transparent at rest,
set it on `:hover` and `:focus-within`, and transition the property itself.
`focus-within` is the half an activity listener misses — a reader who tabs into
the pane has not scrolled it, so nothing stamps the element and the thumb stays
invisible under the caret that is moving through it. Transition 120–200ms;
longer and the thumb lands after the pointer has gone looking for it.
```css
.pane { scrollbar-color: transparent transparent; transition: scrollbar-color .15s }
.pane:hover, .pane:focus-within { scrollbar-color: var(--thumb) transparent }
```
⚠ Scope it to `@media (hover: hover)`. On touch the scrollbar is already an
overlay that appears on use, and the rest state there is a pane whose only
position cue is one that can never be triggered.

Where the page already derives a ramp from scroll — the one that brings a
transparent header onto its plate — spend it on the thumb as well rather than
running a second idle timer. Alpha and chrome then arrive as one event: at the
very top the pane has no bar and no bar's worth of ruling, and both materialise
together a little way in. One value, written once per frame to the scroller.
Ramp over 40–160px of travel.
```css
.pane::-webkit-scrollbar-thumb { background: rgb(var(--thumb) / var(--chrome, 0)) }
```
⚠ This reports *depth*, not activity: a reader who scrolls the pane back to the
top loses the thumb mid-gesture. Floor it at 0.2–0.3 rather than 0 wherever the
pane is the page's only scroller.
