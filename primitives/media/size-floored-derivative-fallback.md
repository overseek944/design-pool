---
id: size-floored-derivative-fallback
category: media
tags: [media,image,error,resilience,correctness,cdn]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Ask a media host for its largest derivative and many assets will not have it —
but the miss is not an error event. The 404 carries a decodable placeholder
body, so the browser decodes it and fires `load`; an `onerror` chain never runs
and the slot shows a grey stub at full size. Test the decoded width against a
floor and downgrade once to the tier that always exists, with `error` pointing
at the same one-shot for genuine failures.

```js
const down = () => { if (img.dataset.fell) return
  img.dataset.fell = '1'; img.src = baseTier }
img.onload = () => img.naturalWidth <= FLOOR && down()   // FLOOR 120–200
img.onerror = down
```
⚠ `complete && naturalWidth` is not this test — the stub passes both. Set
`width`/`height` from the tier you asked for, or the downgrade reflows the card.
