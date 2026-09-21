---
id: shadow-scoped-label-patch
category: interaction
tags: [accessibility,third-party,shadow-dom,correctness,observer,lifecycle]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A vendor launcher — chat, feedback, consent — mounts a bare `<button>` inside its
own shadow root and announces as "button". No selector, stylesheet or label
element reaches it, and it does not exist when your script runs. Watch the host
for its `shadowRoot`, re-target the observer *into* that root, set the missing
`aria-label`, disconnect on first success. Bound it on a timer so a widget that
never loads leaves no observer running. Hard stop 10–20s.

```js
const patch = () => { const b = host.shadowRoot?.querySelector('button')
  if (!b || b.ariaLabel) return false; b.ariaLabel = 'Open chat'; return true }
const inner = new MutationObserver(() => patch() && stop())
const outer = new MutationObserver(() => { if (!host.shadowRoot) return
  outer.disconnect(); patch() ? stop() : inner.observe(host.shadowRoot, OPTS) })
```
⚠ Only an open shadow root is reachable; a closed one leaves the control
unlabelled and the fix is the vendor's config, not script. Never overwrite a
label the vendor already set — it is localised and yours is not.
