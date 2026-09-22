---
id: reduce-swapped-clip-still
category: media
tags: [media,video,accessibility,reduced-motion,correctness]
axes: none
cost: 1
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
An autoplaying loop cannot honour `prefers-reduced-motion` by pausing: parked on
frame zero it is often blank, and `poster` is no longer painted once the element
holds any frame at all. Hide the video and put its still on the *container*
instead, as a background the instance supplies. The branch is then pure CSS — no
script, no feature test, correct on a mid-session flip — and the same rule covers
every clip on the page because the URL travels with the markup.

```css
.clip { background: var(--still) 50% / cover }
@media (prefers-reduced-motion: reduce) { .clip video { display: none } }
```
```html
<div class="clip" style="--still:url(/loop-01.jpg)"><video autoplay muted loop playsinline>
```
⚠ Export the still at the crop the video plays at — `object-position` does not
carry to `background-position`, so a subject held at 30% ends up centred.

Substitution is right for a decorative loop and wrong for a clip that is the
content. Where the figure carries a real transport, the preference governs
*autoplay*, not playback: hold the clip on its poster, leave the control
visible, and treat a press as consent that clears the gate for that element.
Fold it in as one more term beside visibility and an earlier pause — all must
agree before play — and listen on the query itself so a mid-session flip pauses
what is already running.
```js
const reduce = matchMedia('(prefers-reduced-motion: reduce)')
const maybePlay = () => !reduce.matches && visible && !userPaused && v.play().catch(() => {})
reduce.addEventListener('change', e => e.matches ? v.pause() : maybePlay())
```
⚠ Clearing the gate on press must not clear it for the page — it is consent for
this element, and a new clip further down starts gated again.

An animated `GIF` is the case with no second element to hide: the same `<img>`
holds the motion and the only still, it exposes no pause, no `poster` and no
`currentTime`, and `prefers-reduced-motion` cannot reach inside it. The branch
has to happen at source selection, which `<picture>` can do without script —
`media` on a `<source>` takes any media query, so the reduced reader is served
a flat frame and never downloads the animation.
```html
<picture><source media="(prefers-reduced-motion: reduce)" srcset="step.avif">
<img src="step.gif" alt="" loading="lazy" decoding="async"></picture>
```
⚠ Every frame of a GIF is a full uncompressed bitmap in memory once decoded, so
a panel of them costs far more than the transfer suggests, and `loading="lazy"`
defers that bill rather than reducing it. Three or more in a view is a video.

At runtime the `src` attribute *is* the animated raster's transport, and it is
the only one: removing it stops the loop and releases every decoded frame,
reassigning it restarts from frame one. That makes two policies affordable that
a `<video>` gets for free — warm the step either side of the current one through
a detached `new Image()` so a move is instant, and drop every `src` in the
sequence while the page is actually moving, restoring on a 100–200ms scroll-idle
timer. Debounce the eviction 0.5–1s so a reader passing back and forth does not
watch panels blank.
```js
const warm = i => { const w = new Image(); w.src = srcs[i] }   // decode only
const stop = img => img.removeAttribute('src')
const play = (img, i) => { if (img.getAttribute('src') !== srcs[i]) img.src = srcs[i] }
```
⚠ Restarting from frame one is visible on a long loop — acceptable for a short
cycle, wrong for anything a reader is meant to follow. Keep a poster underneath
so the eviction reveals a still rather than the container's background.
