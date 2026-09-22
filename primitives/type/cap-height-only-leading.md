---
id: cap-height-only-leading
category: type
tags: [type,leading,uppercase,display,density]
axes: {energy: 2, density: 4, weight: 4, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A line of all-caps uses almost none of its line box — no descenders, nothing
above cap height — so the ratio that keeps mixed-case prose legible leaves a
band of dead air between every line. Take the leading below 1 and a stacked
display heading closes into one mass with the lines nearly touching, which is
unreachable with lowercase anywhere in the run. 0.7–0.9 of the size, tighter as
the face gets more condensed. Author the break by hand so the stack is
composed rather than wrapped.

```css
.display { text-transform: uppercase; line-height: .78;
           font-size: clamp(2.2rem, 7vw, 4rem) }
```
⚠ Accented capitals sit above cap height and collide first — check the
languages actually shipped, not the English string. One descender or a
parenthesis in the run and the lines overlap.
