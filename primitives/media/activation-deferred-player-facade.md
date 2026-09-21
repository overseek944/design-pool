---
id: activation-deferred-player-facade
category: media
tags: [media,embed,iframe,video,performance,privacy,accessibility,loading]
axes: none
cost: 2
seen: 3
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
