---
id: hash-tuned-effect-constants
category: canvas
tags: [canvas,generative,authoring,debug,parameters]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Every generative effect carries a dozen constants — curl, dissipation, source
radius, strength — and each is found by trying values, not by reasoning about
them. Read them from the URL fragment with the shipped literal as the default.
They tune in the browser then, on the real page at the real size, with no
rebuild and no dev-only path — and a setting that works is a URL to send or
paste into a ticket.

```js
const p = (k, d) => { const m = location.hash.match(new RegExp(k + '=([\\d.]+)'))
                      return m ? parseFloat(m[1]) : d }
const CURL = p('curl', 6), DISSIPATION = p('dis', 0.996)
```
⚠ Clamp every value on the way in. The fragment is reader input, and an
unbounded iteration count or grid size hangs the GPU process, not just the tab.
Keep it to numbers — never let a fragment select a code path.

The same reading serves review of recorded motion: one parameter scaling every
demo clip's `playbackRate` by 1.25–2× lets a reviewer check a page of
walkthroughs at speed, while the shipped default stays 1.
