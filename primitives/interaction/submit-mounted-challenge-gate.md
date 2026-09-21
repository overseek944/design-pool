---
id: submit-mounted-challenge-gate
category: interaction
tags: [forms,third-party,performance,privacy,accessibility,progressive-enhancement]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [mounted-empty-status-slot]
tension: []
---
A verification widget mounted on load costs a third-party script and its cookies
for every reader, and most never submit. Mount it on the first submit that
passes local validation instead: the attempt reveals the challenge, and the
challenge's own success callback — not the submit handler — performs the send.
A later submit reuses a live token and skips the challenge. Every failure path
the vendor exposes (expired, load error, network) has to re-enable the control
and say why, or the form dead-ends on a disabled button.

```js
form.onsubmit = e => { e.preventDefault()
  if (!valid()) return fail('Enter a valid email address.')
  const t = widget && vendor.getResponse(widget)
  t ? send(t) : mountChallenge(send)          // the callback is the send
}
```
⚠ The challenge appears in response to a press, so announce it and move focus —
otherwise a screen reader hears nothing and the button has simply stopped
working. Reserve its box, 80–110px, before it mounts.
