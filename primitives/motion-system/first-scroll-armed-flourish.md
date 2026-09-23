---
id: first-scroll-armed-flourish
category: motion-system
tags: [motion, entrance, reveal, engagement, lcp, correctness, reduced-motion]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A decorative flourish on a heading — colour sweep, shimmer — competes with the page's arrival if it plays at load. Gate it on a root flag set by the first scroll: until then flourishes rest at their end state; afterwards anything revealed plays, including what is already on screen. Set the flag at mount if the page restored mid-scroll. Delay after reveal 0.3–0.6s.

```css
html[data-scrolled] [data-revealed] .flourish { animation: sweep 1.1s .45s backwards }
```
```js
const f = () => root.dataset.scrolled = ''
scrollY > 0 ? f() : addEventListener('scroll', f, { once: true, passive: true })
```
⚠ Keyboard readers who never scroll never see it — decoration only, never meaning.
