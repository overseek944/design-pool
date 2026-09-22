---
id: designed-end-frame-hold
category: media
tags: [media,video,poster,replay,prefetch,polish,cta]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A one-shot clip rests on whatever frame the encode stopped on — usually a dark
one, never the composed one — and `poster` does not come back: it is shown only
while the element holds no frame to paint. Cover the element instead. Prefetch a
designed still on mount, lay it over on `ended`, and put the replay control on
it, so the state the clip spends most of its life in is art-directed rather than
inherited. The still is also where a caption or a next step belongs.

```jsx
useEffect(() => { new Image().src = endFrame }, [endFrame])
<video onEnded={() => setDone(true)} className={done ? 'invisible' : ''} />
{done && <img src={endFrame} alt="" className="absolute inset-0" />}
```
⚠ Match the still's crop and grade to the last frame or the hold reads as a cut.
Clear it before calling `play()` again, and leave the video in flow —
`visibility`, not `display` — or the box collapses under the still.
