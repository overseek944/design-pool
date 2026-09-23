---
id: pre-laid-replay-transcript
category: layout
tags: [demo, transcript, replay, layout-shift, typing, sequence]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A scripted thread that appends messages grows the page under the reader on every
step. Render the whole script up front and hide the unplayed rows with
`visibility: hidden`: the panel is its final height from first paint, playback
only flips visibility, and the composing indicator sits absolutely inside the
next pending row, so it appears exactly where the text will land. Reveal fade
0.15–0.3s; row gap 16–24px.

```css
.msg.pending { visibility: hidden }
.msg.pending .typing { visibility: visible; position: absolute; inset: .4em 0 auto 2.8em }
.msg:not(.pending) { animation: in .2s ease-out }
```
⚠ Height is reserved for the whole script — over roughly eight rows use a
fixed-height scroll port instead. Under reduced motion render every row played.
