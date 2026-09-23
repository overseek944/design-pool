---
id: activation-deferred-player-facade
category: media
tags: [media,embed,iframe,video,performance,privacy,accessibility,loading]
axes: none
cost: 2
seen: 10
requires: []
conflicts: []
completes: [focus-handoff-on-self-removal]
tension: []
---
A third-party player costs hundreds of kilobytes of script and sets its cookies
the moment the frame mounts — for every reader, most of whom never press play.
Mount nothing. Render a poster and a real `<button>`, and swap in the frame on
activation with autoplay appended, so the weight is paid only by the reader who
asked for it. A button, not a div: it is the control, and it carries the
accessible name the absent player would have.

```jsx
{playing
  ? <iframe src={`${embed}?autoplay=1`} allow="autoplay; fullscreen" allowFullScreen />
  : <button aria-label="Play the launch video" onClick={() => setPlaying(true)}>
      <img src={poster} width="1280" height="720" loading="lazy" decoding="async" alt="" />
    </button>}
```
⚠ Without `autoplay` on the swapped-in URL the reader presses play twice. Give
the slot a fixed `aspect-ratio` or the swap shifts the page.

A self-hosted `<video>` mounted on activation cannot lean on that attribute:
the element appears after the gesture that authorised it, and engines disagree
about whether `autoplay` on a freshly inserted node still counts. Arm the call
on readiness instead — play at once if `readyState` already clears
`HAVE_CURRENT_DATA`, otherwise from `loadeddata`, and ship it `preload="auto"`
so the fetch starts with the mount. Carry the same poster on the element and
nothing flashes between the button leaving and the first frame.
```jsx
const go = () => ref.current?.play().catch(() => {})
r.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ? go()
  : r.addEventListener('loadeddata', go, { once: true })
```
⚠ `loadeddata` never fires for a blocked or 404 source, so the poster stays
under a control that has already been dismissed — bind `error` to restore the
facade rather than leaving a dead box.

Where the embed is consent-gated, the facade is the consent point, not a second
banner. Before consent the button's name and hint say what it will do — open
privacy settings for external media — and pressing it opens them; once granted,
the same button mounts the frame. The poster never needs consent because it is
self-hosted.
```jsx
<button onClick={allowed ? () => setPlaying(true) : openConsent}
  aria-label={allowed ? 'Play the video' : 'Open privacy settings to enable the video'} />
```
⚠ Subscribe to the consent store. If granting consent elsewhere doesn't re-render
the slot, the reader has to press play again and gets nothing.
