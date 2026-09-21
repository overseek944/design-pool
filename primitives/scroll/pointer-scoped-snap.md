---
id: pointer-scoped-snap
category: scroll
tags: [scroll,snap,pointer,input,correctness]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Mandatory snap is right for a thumb and wrong for a wheel: a trackpad flick
that lands between items gets yanked, and a mouse loses the ability to stop
anywhere. Scope it to the input, not the breakpoint — `any-pointer: coarse`
catches touch at any width where a width query does
not. `scroll-snap-stop: always` keeps a fast flick from skipping items.

```css
@media (any-pointer: coarse) {
  .feed      { scroll-snap-type: y mandatory; scroll-padding-top: var(--chrome) }
  .feed > *  { scroll-snap-align: start; scroll-snap-stop: always }
}
```
⚠ `any-pointer` is true if *any* attached pointer is coarse, so a touchscreen
laptop takes the touch branch while using a mouse. Prefer `proximity` where
being pulled is worse than not snapping.

Snap is also a *page's* decision, not a stylesheet-wide one, and in a
client-routed app it has to be revocable. Let the page that wants it declare so
by mounting a behaviour-only component that adds the classes to the root and
removes them on teardown — the next route cannot inherit a snap policy it never
asked for, which is the failure mode of setting it globally and overriding per
page. Ship it as a ladder: proximity by default, `mandatory` and a
`scroll-padding: 0` flush variant as explicit opt-ins.
```js
useEffect(() => { const r = document.documentElement
  r.classList.add('snap', ...(mandatory ? ['snap-mandatory'] : []))
  return () => r.classList.remove('snap', 'snap-mandatory') }, [mandatory])
```
⚠ `scroll-padding-top` must equal the sticky chrome's real height or every
snapped section lands under the header — read it from the same token the header
is sized with, never a second literal.
