---
id: focus-handoff-on-self-removal
category: interaction
tags: [accessibility,focus,correctness,form,state]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A control that removes itself when used — a form replaced by its confirmation, a
row that deletes itself, a chip that vanishes once applied — drops the keyboard
onto `<body>`, and the next Tab restarts from the top of the document. Choose
the successor before the removal, give it `tabindex="-1"`, and focus it after
the swap. Announcement and position are separate problems: a live region tells
the reader what happened, the focus move keeps them where it happened.

```js
const inside = form.contains(document.activeElement)
form.hidden = true; done.hidden = false
if (inside) { done.tabIndex = -1; done.focus() }
```
⚠ Move focus only if it was inside what you removed, or a pointer user is
scrolled to a message already on screen. A `role="status"` present at load and
then unhidden announces reliably; one inserted at that moment often does not.
