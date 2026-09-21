---
id: composed-mailto-submit-fallback
category: interaction
tags: [interaction,forms,progressive-enhancement,fallback,correctness,accessibility]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A form posting to a third-party endpoint fails in ways the reader cannot fix —
CORS, a blocker, a dead service — and an error that only says try again discards
everything they typed. Compose a `mailto:` from the same field values, subject
and body already filled, and hand it back inside the failure message as a link.
The submission degrades to the reader's own mail client with nothing retyped, and
the address is one the page already publishes. Encode every part: a raw newline
or ampersand truncates the body with no error.

```js
const href = 'mailto:' + TO
  + '?subject=' + encodeURIComponent(subjectFrom(d))
  + '&body=' + encodeURIComponent(bodyFrom(d))
status.innerHTML = `Couldn't send. <a href="${href}">Email us directly</a>.`
```
⚠ Never reset the form on failure — those values are the only copy. Put the
message in a live region that was already mounted, or a reader looking away
never learns the submission did not land.
