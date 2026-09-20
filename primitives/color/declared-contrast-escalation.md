---
id: declared-contrast-escalation
category: color
tags: [accessibility,contrast,tokens,type,color]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`prefers-contrast: more` is not a second theme — it is permission to spend the
headroom restraint left on the table. Re-resolve the three tokens tuned down
for elegance (muted text, secondary text, hairlines) and restore the
affordances taste removed: link underlines, a heavier body weight, bolder data
cells. Move muted text 20–40% closer to the foreground and hairlines from
~12% to ~25% alpha.

```css
@media (prefers-contrast: more) {
  :root { --muted: #444; --hair: #00000040 }
  body { font-weight: 500 }
  a { text-decoration: underline; text-underline-offset: 3px }
}
```
⚠ A supplement, never the fix — the default must already clear 4.5:1.
`forced-colors: active` is a separate branch that discards your palette.
