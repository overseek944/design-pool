---
id: rule-harvested-theme-bank
category: color
tags: [color,tokens,theming,cssom,architecture,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Script that has to interpolate a theme — scrubbing it from scroll position, or
handing the same colours to a renderer — needs values, and `getPropertyValue`
on a role token returns the literal `var(--palette-token)`, not a colour. Author
each theme as an ordinary rule in one inline `<style>`, then walk `sheet.cssRules`
and resolve every alias through the root's computed style. One flat map per
theme, still authored in CSS only, and a new theme is a rule rather than a
second copy of the palette in script.

```js
const root = getComputedStyle(document.documentElement)
themes = [...sheet.cssRules].map(rule => Object.fromEntries(
  [...rule.cssText.matchAll(/--([\w-]+):\s*var\(--([\w-]+)\)/g)]
    .map(([, role, src]) => ['--' + role, root.getPropertyValue('--' + src).trim()])))
```
⚠ `cssRules` throws a `SecurityError` cross-origin and is empty until the sheet
parses, so keep the block inline and defer the read. Where a class swap is all
that is wanted, register the roles with `@property` and let CSS interpolate.
