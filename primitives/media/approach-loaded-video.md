---
id: approach-loaded-video
category: media
tags: [media,video,performance,intersection-observer,accessibility,bandwidth]
axes: none
cost: 2
seen: 6
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

A vendor's player is the same gate with none of the handles — no `preload`, no
`muted` attribute, and its `play()` resets volume on the way in. Assert mute
twice: once before the call, once inside the player's own started callback. Miss
the second and the first frame of every autoplay ships audio, which is the one
failure a reader does not forgive. Keep the link to the original beside the frame
so the unavailable case still serves the content.
```js
p.mute(); p.setVolume(0); p.play()
p.subscribe('startedPlaying', () => { p.mute(); p.setVolume(0) })
```
⚠ Vendor callbacks fire after teardown. Guard each one against a mount that has
already been replaced, or a late `startedPlaying` unmutes a player nobody can see.

A video you intend to *seek* wants the opposite warm-up. It must hold a decoded
frame before the first write, and under gesture policy on a phone it holds
nothing until a user event has touched it: call `play()`, pause on the next tick
and park `currentTime` a millisecond in, then repeat that once from a
`touchstart` listener. `preload="none"` also means `loadedmetadata` may never
fire, so prime on a timer as well — 2–4s — or the seek path stays dead.
```js
const prime = () => { const r = v.play(); Promise.resolve(r)
  .then(() => { v.pause(); v.currentTime = .001 }, () => {}) }
addEventListener('touchstart', prime, { once: true, passive: true })
```
⚠ The prime can be seen: one frame plays before the pause lands. Keep the
element at `opacity: 0` or behind its poster until the first seek has settled.
