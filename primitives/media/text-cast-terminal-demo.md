---
id: text-cast-terminal-demo
category: media
tags: [media,terminal,demo,text,playback,performance]
axes: {energy: 3, density: 2, weight: 2, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Show a command-line tool working as a recorded *text* stream replayed into a DOM
terminal, not as video. Timestamped output events weigh a few KB, stay crisp at
any zoom, take the page's type and palette tokens, and the rest frame is real,
selectable text. Cap idle gaps at 0.8–2s and play at 1–1.8× so waits read as
work, not dead air; fit 80–100 columns to the container.

```js
player.create(src, host, { idleTimeLimit: 1.2, speed: 1.4, fit: 'width', loop: true })
```
⚠ The stream rewrites the DOM constantly — mark it `aria-hidden` and ship a
static transcript beside it. Under reduced motion seek to the final frame and pause.
