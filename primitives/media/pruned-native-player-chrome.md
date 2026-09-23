---
id: pruned-native-player-chrome
category: media
tags: [media,video,controls,correctness,accessibility]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Native video controls are accessible and free, but offer buttons a silent demo
clip has no use for — volume, speed, download, picture-in-picture, cast. Strip
them with attributes first, then hide only the mute and volume pseudo-elements
in engines that expose them; keep play, scrub and fullscreen.

```html
<video controls muted playsinline disablepictureinpicture
       controlslist="nodownload noplaybackrate noremoteplayback">
```
```css
video::-webkit-media-controls-mute-button,
video::-webkit-media-controls-volume-slider { display: none !important }
```
⚠ Only for clips with no audio track — hiding mute on sound is an accessibility
failure. Pseudo-elements are unstandardised; other engines show full controls.
