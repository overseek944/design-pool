---
id: self-painting-theme-scope
category: color
tags: [color,tokens,theming,architecture,dark]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A theme is one class that both defines the semantic colour tokens and paints
itself from them. Components read only semantic names, never a swatch, so the
class inverts any subtree it lands on and a nested scope flips back — no
per-component dark rules, no duplicated selectors.
```css
.theme-dark { --bg:#141413; --fg:#faf9f5; --line:#faf9f51a; color-scheme:dark;
              background-color:var(--bg); color:var(--fg) }
.card { background:var(--bg); border:var(--hair) solid var(--line) }
```
⚠ `color-scheme` has to ride along or form controls, scrollbars and autofill
stay on the old ground. Any component that hardcodes a colour survives one theme
and breaks in the other, silently — audit for literals, not for themes.
