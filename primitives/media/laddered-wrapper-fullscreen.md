---
id: laddered-wrapper-fullscreen
category: media
tags: [media,video,fullscreen,popover,interaction,accessibility]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Fullscreen the player's wrapper, not the `<video>`, so custom chrome goes with
it. Where element fullscreen is missing (iPhone), fall back to a manual
`popover` on the wrapper — top layer, `role=dialog`, `aria-modal` — and only
then to the video's native fullscreen. Fit the fixed-aspect stage with `min()`.

```js
if (el.requestFullscreen && document.fullscreenEnabled) await el.requestFullscreen()
else if ('popover' in el) { el.popover = 'manual'; el.showPopover() }
else video.webkitEnterFullscreen?.()
```
```css
.fs .stage { width: min(100%, 100dvh * 9 / 16); height: min(100%, 100dvw * 16 / 9) }
```
⚠ The popover rung has no Escape — bind it and trap focus. Hide idle chrome
after 2–3s, never while focus is inside.
