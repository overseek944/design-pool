---
id: mount-deferred-environment-value
category: perf
tags: [perf,hydration,ssr,cls,correctness,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A capability query has a safe degraded answer; the reader's clock, timezone and
locale-formatted date have none — whatever the server prints is wrong for
somebody and visibly flips on hydration. Render the *shape* rather than a guess:
a mask of the final form, in the slot the real value will occupy, replaced from
an effect after mount. Nothing mismatches, nothing reflows, and a pending slot
reads as pending instead of briefly lying. Swap it unanimated, or cross-fade
120–200ms; longer and the mask starts reading as content.

```jsx
const [now, set] = useState(null)      // null on the server and at first paint
useEffect(() => set(new Date()), [])
return <time>{now ? fmt.format(now) : '--:--'}</time>
```
⚠ The mask must be at least as wide as the widest real value in the face that
renders it, or the swap still moves the line. `suppressHydrationWarning`
silences the console and leaves the flip on the screen.
