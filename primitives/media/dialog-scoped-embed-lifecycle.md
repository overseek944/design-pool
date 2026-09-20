---
id: dialog-scoped-embed-lifecycle
category: media
tags: [media,performance,dialog,correctness,lifecycle]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: [state-preserving-frame-relocation]
---
A third-party embed is not yours to pause — you cannot reach into a cross-origin
iframe, and `hidden` keeps it playing. So do not ship it at rest: build the
iframe when the dialog opens and destroy it on `close`. The page costs nothing
until someone asks, and closing genuinely stops the audio.

```js
open.onclick = () => { frame.replaceChildren(makeIframe(src)); dlg.showModal() }
dlg.addEventListener('close', () => frame.replaceChildren())
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close() })
```
⚠ `e.target === dialog` is the backdrop test — it works only while the dialog's
own padding is zero and a child fills it, or clicks near the edge close it by
accident. Reserve the media box with `aspect-ratio` so opening shifts nothing.

Rebuild is the right default and the wrong answer in one case: when the *same*
embed is what the reader asked to enlarge. Destroying and recreating it there
restarts the thing they were already watching. Either policy is defensible; the
choice is whether continuity or a guaranteed stop matters more, and it has to
be made once for the surface rather than per component.
