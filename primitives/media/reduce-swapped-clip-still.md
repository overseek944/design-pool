---
id: reduce-swapped-clip-still
category: media
tags: [media,video,accessibility,reduced-motion,correctness]
axes: none
cost: 1
seen: 1
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
