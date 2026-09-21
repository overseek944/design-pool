---
id: reduce-restored-media-transport
category: media
tags: [media,video,accessibility,scroll,scrub,correctness]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Where scroll is the only transport for a continuous medium, `prefers-reduced-motion`
cannot simply stop the drive — the reader is left holding frame zero with no way
to reach the rest. Hand back the element's native `controls` and collapse the
runway in the same branch: a 250–400svh stage becomes `height: auto` with a
`100svh` floor and its sticky child goes static, so the section costs one screen
instead of three of dead scroll. The sequence stays reachable, at whatever pace
the reader picks.

```css
[data-still]        { height: auto; min-height: 100svh }
[data-still] .stage { position: static }
[data-still] .rail  { display: none }
```
```js
if (mq.matches) { el.dataset.still = 'true'; video.controls = true }
```
⚠ Take the progress readout out with it — a rail nothing advances reads as broken.

Where the medium is not a media element there are no native `controls` to hand
back. Promote the progress indicator instead: the chapter rail that was a
readout becomes the transport, its fills going binary — passed or not — rather
than fractional, and each item scrolls to its own position. Swap the invitation
in the same branch, since "scroll through" now describes nothing the reader can
do.
```jsx
<button aria-current={i === active ? 'step' : undefined} onClick={() => go(i)}>
<span style={{ transform: `scaleX(${still ? +(i <= active) : frac(i)})` }} />
```
⚠ The rail was decoration and is now a control: it needs a real `<button>`, a
name, and a focus ring — a `<div>` with a click handler strands the readers this
branch exists for.
