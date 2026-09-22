---
id: frame-relayed-theme-token
category: media
tags: [media,iframe,embed,theme,custom-property,postmessage,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: [unowned-frame-message-guard]
tension: []
---
Custom properties stop at a frame boundary, so an embedded scene keeps its
baked palette when the host retints. Relay the resolved value, not the rule:
post it on the frame's `load` and on every change, and let the child apply it
to its own root or uniforms. Send a computed hex or channel triplet, never a
variable name. One to four tokens; beyond that, share a stylesheet.

```js
const relay = v => f.contentWindow?.postMessage({ type: 'theme', accent: v }, origin)
f.addEventListener('load', () => relay(current()))
```
⚠ A post before `load` is dropped silently. Never target `'*'`; the child
checks `e.origin` before applying.
