---
id: em-locked-wordmark-mark
category: type
tags: [type,logo,alignment,detail,scale]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A lock-up whose mark is sized in pixels needs a new value at every place the
wordmark appears. Size the mark and the gap in `em` and align the inline
flex row on `baseline`: the lock-up becomes a function of `font-size`, so a
34px hero and a 15px nav share one rule and one asset. Baseline rather than
centre stops the mark floating above short lowercase words. Mark 0.72–0.85em,
gap 0.05–0.12em.

```css
.mark-lockup { display: inline-flex; align-items: baseline; gap: .09em }
.mark-lockup img { width: .79em; height: .79em; display: block;
                   border: 1px solid var(--mark-edge, transparent) }
```
⚠ A pale mark dissolves into a light ground and needs that hairline; on a dark
ground the same hairline reads as a box, so ship the edge colour as a token the
theme sets to `transparent`. Give the `<img>` empty `alt` — the text names it.
