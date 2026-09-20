---
id: glyph-scramble-settle
category: reveal
tags: [type,reveal,motion,technical,text]
axes: {energy: 4, density: 3, weight: 2, finish: 3}
cost: 2
seen: 2
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Resolve a label out of noise rather than fading it in: hold the final string
length from the first frame and fill every unresolved slot from a small fixed
glyph pool, letting the settled prefix grow left to right. Constant length
means no reflow, and the register lands as machine rather than ornament. Scale
duration with length — about 220ms plus 20ms per character, capped near 650ms —
and leave spaces intact so word shapes hold.

```js
const G = "▓▒░#/\\|<>+=-", keep = Math.floor(p * n)
el.textContent = s.slice(0, keep) + [...s.slice(keep)]
  .map(c => c === " " ? " " : G[Math.random() * G.length | 0]).join("")
```
⚠ Rewriting `textContent` destroys child markup and fights any runtime
translation layer. Restore the source string exactly on the last frame, run
once, and keep it off anything that must be read aloud.

The ⚠ above is avoidable: collect the block's text *nodes* with a `TreeWalker`
and scramble each in place, and every link, emphasis and inline span inside the
run survives untouched. Leave spaces and newlines alone so the wrap geometry
never changes, lock the measured height for the duration, and mark the element
`aria-busy` while it runs. Frame count from the total character count —
`clamp(18, chars * 2, 90)` — so a caption and a paragraph both settle in a
readable time.
```js
const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = []
for (let n; (n = w.nextNode()); ) nodes.push({ n, src: n.nodeValue })
el.style.minHeight = el.offsetHeight + 'px'; el.setAttribute('aria-busy', 'true')
```
⚠ Restore every node's original string on the final frame and clear both the
height lock and `aria-busy`, or a translation layer and the next resize both
inherit the scramble.
