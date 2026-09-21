---
id: approach-loaded-video
category: media
tags: [media,video,performance,intersection-observer,accessibility,bandwidth]
axes: none
cost: 2
seen: 16
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

The pause control's label is not a function of its own clicks. The element
changes state without being asked — autoplay refused, the observer pausing on
exit, low-power mode, the native context menu — so a label derived from a click
counter eventually announces the opposite of what pressing it will do. Bind it
to the media's own `play` and `pause` events and let the click do nothing but
call the method; the label then describes the element rather than the last
interaction.
```js
v.addEventListener('play',  () => setPlaying(true))
v.addEventListener('pause', () => setPlaying(false))
```
⚠ The visible text and the `aria-label` must be derived from the same state, or
the two describe different actions to different readers.

Proximity is not the only gate, and where the other one is *device class* the
source attribute is the place to enforce it. An effect a coarse pointer or a
narrow viewport will never run should not fetch its asset there at all: park the
URL in `data-src` on the `<source>` and let the branch that decides the effect is
viable be the thing that assigns it and calls `load()`. `preload="none"` is a
hint several engines still resolve to metadata; an element with no resolved
source has nothing to fetch under any policy.
```js
if (!viable) return                       // no src ever assigned
src.src = src.dataset.src; v.preload = 'auto'; v.load()
```
⚠ Every reader on the closed branch — and every reader without script — then
sees the poster and nothing else, so the poster has to carry the content and the
section has to survive being only that.

A video paused at mount — the reduced-motion branch, or an observer that has
never seen it intersect — holds no decoded frame, and once the poster has been
dismissed the box is simply empty. Ask `readyState` and call `load()` below
`HAVE_CURRENT_DATA`: it fetches enough to present frame one without ever
playing. It is the cheap half of the seek warm-up above, and it belongs on every
branch that pauses before the element has run.
```js
if (reduce) { v.pause()
  if (v.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) v.load() }
```
⚠ `load()` resets `currentTime` and rejects any pending `play()` — call it only
on an element that has not started, or a reader watching it watches it restart.

For decorative footage, a rejected `play()` deserves a teardown rather than a
catch. Swallowing it leaves a `<video>` parked on a black first frame under
copy that was composed against moving light; drop the source instead and let the
still behind it stand, and the refusal costs a layer rather than the section.
Assert `muted` on the element *and* `defaultMuted` before the call, since the
attribute is what a re-created element inherits.
```js
v.muted = v.defaultMuted = true
Promise.resolve(v.play()).catch(() => setSrc(null))   // falls back to the poster layer
```
⚠ Only where the video is decoration. Do this to footage carrying content and
the reader loses it with no control to get it back.

Proximity says the footage is needed; it does not say the network is free. Fired
the instant an observer resolves, a multi-megabyte fetch competes with the poster
that is very often the LCP candidate, and the metric gets worse on behalf of a
video nobody is watching yet. Gate on the paint instead: `decode()` the poster,
then yield two animation frames — the first schedules the paint, the second lands
after it — and only then set `src`. 30–120ms of delay for the whole contention.
```js
const p = Object.assign(new Image(), { src: v.poster })
await (p.decode?.().catch(() => {}) ?? Promise.resolve())
requestAnimationFrame(() => requestAnimationFrame(() => { v.src = pick(); v.load() }))
```
⚠ A poster already in cache decodes in the same task, so it is the two frames
that separate the fetch from the paint — one is not enough. Where `decode` is
missing fall back to `onload`/`onerror`, and resolve on both or the chain hangs
and the video never loads at all.

Where the deferred URL sits on a `<source>` child rather than the element's own
`src`, assigning it does nothing: the element resolved its media at parse time
and only an explicit `load()` makes it look again. Deferring on the child is
what keeps the markup valid carrying no `src` at all, so a crawler and a no-JS
reader meet the poster rather than a broken element.
```js
const s = v.querySelector('source[data-src]')
if (s && !s.src) { s.src = s.dataset.src; v.load() }
```
⚠ `load()` resets `currentTime` and discards the buffer, so gate it on the first
approach only — running it again on re-entry restarts footage a reader was
already watching.

Proximity gates nothing for a loop that opens the page — it is already
intersecting at mount, so the observer starts the fetch and the first decode
inside the window first paint is competing for. Gate that one on load *phase*
instead: wait for the `load` event, then a short delay, longer where decode and
hydration share one weak core. The poster carries the opening frame either way,
so the only thing deferred is the moment it starts moving.
```js
const go = () => setTimeout(() => v.play().catch(() => {}),
  matchMedia('(max-width: 767px)').matches ? 400 : 50)
document.readyState === 'complete' ? go() : addEventListener('load', go, { once: true })
```
⚠ Delay ranges 30–80ms and 300–600ms; past that the still reads as a failed
video. Clear the timer on unmount, or a route change plays a detached element.
