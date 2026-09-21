---
id: build-captured-product-shot
category: media
tags: [media,asset,build,product,screenshot,architecture,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page showing the product either carries a hand-kept screenshot that drifts
from the app, or mounts the real components and ships their CSS, bundle and
hydration with them. Take a third path: an export-only route renders those
components at one fixed width and a build step captures it to a static asset.
The picture is generated from the code it depicts, so it cannot go stale.
Export width 540–1280px.

```js
await page.setViewportSize({ width: 1280, height: 900 })
await page.locator('.frame').screenshot({ path: out, omitBackground: true })
```
⚠ Capture without a background or the rounded corners come back square. The
image carries nothing to a screen reader — restate anything load-bearing in
markup, and ship explicit `width`/`height` against layout shift.
