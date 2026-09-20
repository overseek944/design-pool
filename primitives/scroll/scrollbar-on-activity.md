---
id: scrollbar-on-activity
category: scroll
tags: [scroll,scrollbar,chrome,restraint,state]
axes: {energy: 1, density: 1, weight: 1, finish: 5}
cost: 1
seen: 1
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
