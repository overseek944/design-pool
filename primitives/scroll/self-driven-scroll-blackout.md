---
id: self-driven-scroll-blackout
category: scroll
tags: [scroll,state,observer,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Any state derived from scroll position — an active section, a highlighted row —
fights the scroll the page performs itself. A scripted scroll sweeps past every
item between here and the target, the spy claims each in turn, and where that
state asked for the scroll it never settles. Stamp a deadline as the scroll
starts and have the spy return early until it passes. 600–1000ms covers a smooth
scroll of a screen or two.
```js
lock.current = performance.now() + 800
port.scrollTo({ top, behavior: 'smooth' })
// first line of the spy: if (performance.now() < lock.current) return
```
⚠ The deadline only guesses the browser's smooth-scroll duration — prefer a
one-shot `scrollend` listener, keeping the deadline as its ceiling. A reader who
grabs the wheel mid-blackout sees stale state until it expires; never set the
window longer than the motion it covers.
