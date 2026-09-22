---
id: keyboard-resized-single-screen
category: layout
tags: [layout,mobile,keyboard,viewport,responsive,correctness]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A one-screen layout holding a text field breaks the moment the on-screen
keyboard opens. By default only the *visual* viewport shrinks, so an `svh`-sized
stage keeps its full height and the browser pans it instead — carrying the
field's label, its error and half the page off the top, with nothing in CSS able
to see it happening. `interactive-widget=resizes-content` shrinks the *layout*
viewport too, so viewport units re-resolve and the stage reflows into whatever
room is left.

```html
<meta name="viewport" content="width=device-width, initial-scale=1,
      viewport-fit=cover, interactive-widget=resizes-content">
```
⚠ It changes what `100svh` means mid-session: any height measured once at load
is stale while the keyboard is up, and a `max-height` band can flip under a
reader who is only typing. Chromium honours it, iOS Safari does not — the layout
still has to survive being panned.

Where the hint is ignored — iOS Safari, and anything panning rather than
resizing — the keyboard's height is still knowable, just not to CSS. Publish it:
`visualViewport` reports the shrunken box, the difference against
`innerHeight` is the occluded band, and writing that to a custom property on the
root hands every rule a number it can subtract from a `dvh` or spend as a bottom
margin. Subscribe to `scroll` as well as `resize` — the offset changes while the
page is panned with the keyboard already open.
```js
const set = () => document.documentElement.style.setProperty('--keyboard-inset',
  `${Math.round(Math.max(0, innerHeight - vv.height - vv.offsetTop))}px`)
```
⚠ Remove the property on teardown and default every reader of it to `0px`, or a
view that unmounts mid-edit leaves the whole layout permanently short.
