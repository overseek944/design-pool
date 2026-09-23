---
id: ambient-loop-promoted-to-feature
category: media
tags: [media,video,audio,fullscreen,interaction]
axes: {energy: 2, density: 1, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
When the background loop is the film itself, the play control can promote that
element instead of opening a player: restart from 0, unmute, fade the dim
overlay out over 500–900ms. Already decoded — no second download, no blank
frame. On small touch screens hand it to native fullscreen, and re-mute on exit
so the page never keeps sound behind it.

```js
v.currentTime = 0; v.muted = false; v.play().catch(() => {})
small && (v.webkitEnterFullscreen?.() ?? v.requestFullscreen?.())
v.addEventListener('webkitendfullscreen', () => { v.muted = true })
```
⚠ Only when the loop carries the film's audio — a silent ambient encode means a
second fetch anyway. Real button with `aria-pressed`; re-mute on
`fullscreenchange` too.
