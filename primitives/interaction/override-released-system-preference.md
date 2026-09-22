---
id: override-released-system-preference
category: interaction
tags: [theme,preference,accessibility,correctness,state]
axes: none
cost: 1
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
A page that mirrors `prefers-color-scheme` and also ships a toggle has two
sources for one fact, and the system usually keeps winning: someone picks light
at midnight, the OS flips on schedule, and the page changes under them.
Subscribe to the media query only while no stored choice exists, and drop the
listener the moment one is written. The system supplies the default, never the
override. Same shape for reduced motion and contrast wherever the product ships a switch.

```js
if (read() === null) {                        // null until the user picks
  const mq = matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', follow)
  return () => mq.removeEventListener('change', follow)
}
```
⚠ Storage throws in partitioned and private contexts — treat a failed read as no
choice and a failed write as did not persist, never as a reason to skip applying
the value. Offer a way back to the default.

Storing `system` as an explicit third value, rather than deleting the key, is
what gives the ⚠ above its way back to the default: absent and following are no
longer the same state, so a three-way control can return the reader to the
system without the storage layer having to distinguish "never chose" from
"chose to follow". The listener attaches for exactly one of the three.
```js
const p = read() ?? 'system'                 // 'light' | 'dark' | 'system'
const resolved = p === 'system' ? (mqDark.matches ? 'dark' : 'light') : p
```
⚠ Two states now resolve to the same appearance, so a control that reflects only
the *resolved* value cannot show which one is set — the toggle has three
positions or it is lying about one of them.

Which source is *fresher* is the other reading. Keep the listener attached
always and let a change to the system setting delete the stored override rather
than be outranked by it — someone reaching for the OS switch mid-session has
made the more recent statement, and the page should follow it. Scope the store
to `sessionStorage` and the override lasts the visit rather than the year, which
is the right lifetime for a choice made about one page. Re-read on `pageshow`
when `persisted`: a bfcache restore brings the old in-memory value back with it.
```js
mq.addEventListener('change', () => { try { sessionStorage.removeItem(K) } catch {}
  stored = null; apply() })
addEventListener('pageshow', e => { if (e.persisted) { read(); apply() } })
```
⚠ Only for preferences the system also states. A choice with no OS counterpart
has nothing to be revoked by, and clearing it on an unrelated change loses it
for nothing.
