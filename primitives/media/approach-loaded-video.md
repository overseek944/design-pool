---
id: approach-loaded-video
category: media
tags: [media,video,performance,intersection-observer,accessibility,bandwidth]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: [video-as-surface-not-frame]
---
Background footage is usually the heaviest thing on a page and usually plays
where nobody is looking. Ship it `preload="none"` with the `autoplay`
attribute stripped at runtime, then let one observer with a 150–300px root
margin start the fetch on approach and pause on exit. Every autoplaying video
also needs a real pause control, and a reader's pause outranks the observer
permanently — record the intent and never resume what a person stopped.

```js
new IntersectionObserver(es => es.forEach(e => {
  const v = e.target
  if (!e.isIntersecting) v.pause()
  else if (!v.dataset.userPaused) v.play().catch(() => {})
}), { rootMargin: "200px" })
```
⚠ Stripping `autoplay` leaves a no-JS reader a still frame, so supply a
poster. `play()` rejects under gesture policy — catch it or every card logs.

`play()` is async, and the gate can flip while it is pending — scrolled away,
tab hidden, reader hit pause. Resolve against the *current* intent, not the one
that started the call, or a video ends up playing in a state that asked for
silence.
```js
wants = true; v.play().then(() => { if (!wants) v.pause() }).catch(() => {})
```
