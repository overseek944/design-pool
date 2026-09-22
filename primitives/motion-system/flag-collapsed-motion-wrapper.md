---
id: flag-collapsed-motion-wrapper
category: motion-system
tags: [motion,architecture,reduced-motion,accessibility,correctness,feature-flag]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Every entrance in a system is a wrapper component; make each one a conditional
identity function. One early return — a module-level enable constant OR the
reduced-motion query — renders the child in a plain element instead of the
animation library's. The preference is then handled once per wrapper rather
than once per call site, so no author can forget it, and the whole decorative
motion layer retires by flipping one constant.

```jsx
const Enter = ({ children, className, distance = 30 }) =>       /* 16–48px */
  !MOTION_ENABLED || useReducedMotion()
    ? <div className={className}>{children}</div>
    : <motion.div className={className} initial={{ opacity: 0, y: distance }} …/>
```
⚠ Return the *same* element and class in both arms — a bare child changes the
DOM shape and breaks grid placement and `>` selectors in one arm only. The flag
gates behaviour, not bytes: a statically imported runtime still ships when it
is false.
