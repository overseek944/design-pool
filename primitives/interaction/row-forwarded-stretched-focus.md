---
id: row-forwarded-stretched-focus
category: interaction
tags: [accessibility,focus,link,correctness,cards]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A link stretched over its whole row or card — a pseudo-element at `inset: 0` —
moves the hit area to the container but leaves the focus ring on the inline
text, so a keyboard reader sees an outline around three words of a target forty
times that size. Suppress the link's own ring and let the container draw it,
keyed off `:has()`. A negative `outline-offset` lands the ring inside the row's
own rule instead of straddling the divider it shares with the row above.
Offset −1 to −3px, matched to the row's border.

```css
.row a::after        { content: ""; position: absolute; inset: 0 }
.row a:focus-visible { outline: none }
.row:has(a:focus-visible) { outline: 2px solid var(--ring); outline-offset: -2px }
```
⚠ Ship both rules together — the suppression alone leaves the row with no
visible focus anywhere. The overlay also swallows text selection across the row.
