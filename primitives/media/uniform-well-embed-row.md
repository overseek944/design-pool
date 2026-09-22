---
id: uniform-well-embed-row
category: media
tags: [media,embed,iframe,third-party,layout,accessibility]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Embeds from three vendors arrive at three heights, three widths and three
themes, and none of them can be restyled. Normalise by framing rather than by
styling: one well per column at a shared fixed height with `overflow: clip`,
the last 60–90px faded into the page ground so the cut reads as a horizon and
not as a crop, and the real link to the source placed *below* the well, where
its label is yours to write. A cover anchor makes the whole well clickable
without putting a tab stop over content nobody can describe. Well 280–420px.

```css
.well { position: relative; block-size: clamp(280px, 34vw, 400px); overflow: clip }
.well::after { content: ""; position: absolute; inset: auto 0 0; block-size: 78px;
  background: linear-gradient(transparent, var(--page) 92%); pointer-events: none }
.well > .cover { position: absolute; inset: 0 }   /* aria-hidden tabindex="-1" */
```
⚠ The cover swallows everything under it — well an embed meant to be read,
never one meant to be operated. What the clip hides is still in the
accessibility tree and still found by find-in-page: the well crops pixels, not
content, so nothing load-bearing may live below the fade.
