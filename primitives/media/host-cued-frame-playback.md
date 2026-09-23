---
id: host-cued-frame-playback
category: media
tags: [media,iframe,embed,postmessage,intersection-observer,playback,scroll,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [unowned-frame-message-guard]
tension: []
---
An animation isolated in a frame cannot see the host's scroll, so it plays to
an empty viewport. Invert control: the child idles until the host posts a cue —
start on first entry, restart on re-entry, or a 0–1 scrub per scroll frame. It
self-starts when it is the top window, so it still previews standalone. Arm at
0.25–0.4 visibility.

```js
// host
io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting &&
  e.target.contentWindow.postMessage({ type: 'play' }, origin)), { threshold: .3 })
// child
if (window.parent === window) play(); else addEventListener('message', onCue)
```
⚠ Observe only after the frame's `load`, or the first cue reaches no listener
and it never starts.
