---
id: origin-conditional-sandbox
category: media
tags: [media,iframe,embed,security,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A sandboxed iframe that is also `allow-same-origin` *and* served from your own
origin is not sandboxed — the frame reaches into the parent and strips its own
attribute. So the token list is computed per embed, never a static string:
grant `allow-same-origin` only when the source origin differs from the host's.

```js
const base = ['allow-scripts', 'allow-forms', 'allow-popups', 'allow-modals']
const cross = new URL(src, location.href).origin !== location.origin
f.sandbox = [...base, ...(cross ? ['allow-same-origin'] : [])].join(' ')
```
⚠ Treat a URL parse failure as same-origin and withhold the token. Permissions
are a separate axis and default off: name each one the embed needs in `allow`
(`autoplay`, `gamepad`, `pointer-lock`) and set a `referrerpolicy`.
