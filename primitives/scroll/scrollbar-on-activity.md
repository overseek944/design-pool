---
id: scrollbar-on-activity
category: scroll
tags: [scroll,scrollbar,chrome,restraint,state]
axes: {energy: 1, density: 1, weight: 1, finish: 5}
cost: 1
seen: 3
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
