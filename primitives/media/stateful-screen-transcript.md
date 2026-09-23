---
id: stateful-screen-transcript
category: media
tags: [accessibility, a11y, transcript, demo, mock, details, disclosure]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A rendered product screen — a device UI in an iframe, canvas or image — is
pictured text: pull it out of the tab order and the accessibility tree, and
put its reading beneath it in a collapsed native `<details>`. Transcribe
*state*, not only strings: which row is selected, what is dimmed behind,
which gesture dismisses. Collapsed, it costs one line. 1–4 sentences per
screen.

```html
<iframe src="…" title="…" tabindex="-1" aria-hidden="true"></iframe>
<details><summary>Read screen text</summary>
  <p>Inbox. Selected, message 2 of 5. The calendar stays dimly visible behind.</p></details>
```
⚠ Anything interactive inside the frame becomes unreachable by keyboard;
hide only purely illustrative screens, and update the transcript with the demo.
