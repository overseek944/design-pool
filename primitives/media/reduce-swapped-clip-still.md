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
