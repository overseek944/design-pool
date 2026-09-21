---
id: consent-free-analytics-default
category: perf
tags: [architecture,analytics,third-party,privacy,layout,correctness]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
The consent banner is a decision made in the analytics config, not the layout.
Storage is what triggers it, so a tag persisting in memory — no cookie, no
`localStorage` — needs no banner, and the first screen keeps the 60–120px a
desktop bar costs, or the quarter to third of a phone viewport. Turn off what
reintroduces storage: autocapture and session replay both do.

```js
tag.init(KEY, { persistence: 'memory', autocapture: false,
                disable_session_recording: true })
```
⚠ Identity now lasts one pageload: returning readers count as new and
cross-session funnels stop working. Take this where the page is one surface
with one conversion, not where retention is the question being asked.

The one-pageload limit is a default, not a ceiling. Keep memory persistence as
the pre-consent state and *graduate* the same instance when consent arrives —
re-configure persistence and opt back in rather than initialising a second
time, so no event is lost across the switch and readers who never answer the
banner still cost nothing. Point `api_host` at a same-origin path while doing
it: one fewer cross-origin handshake on the critical path, and the tag stops
being the thing a content blocker recognises.
```js
tag.init(KEY, { persistence: 'memory', api_host: '/m', autocapture: false })
onConsent(ok => ok ? (tag.opt_in_capturing(),
  tag.set_config({ persistence: 'localStorage+cookie' })) : tag.opt_out_capturing())
```
⚠ The proxy path must not be a guessable vendor name, or the blocklists catch
up with it; and re-configuring persistence writes storage immediately, so the
call has to sit behind the granted branch, never beside it.

Cookieless is not the same as carrying nothing. The SDK still derives
`$current_url`, `$referrer` and page properties from whatever sits in the
address bar, so a reset token or an email in a query string leaves the page
anyway. Rebuild the payload in the last-hop hook rather than trimming it:
declare the events you send and the values each field may take, drop any event
missing from that table, and re-add only the handful of SDK fields ingestion
needs — 8–16, not the whole bag. Strip URLs to origin plus path. The table is
then the audit, and nothing new ships by accident.
```js
before_send: e => schema[e.event]
  ? { ...e, properties: pick(e.properties, schema[e.event], KEEP_SDK) }
  : null                                   // unknown event: never sent
```
⚠ Enumerate field *values*, not only names — a free-text field passed through
because its name was on the list is how form input reaches a vendor.

Session replay is the same decision made in the DOM. Leave the vendor's default
masking on — every text node and every input redacted — and unmask by explicit
attribute on the handful of elements that are provably not reader data:
navigation, headings, button labels. An allowlist is auditable and fails closed,
where the usual mask-this-class list fails open the first time a template adds a
field nobody tagged.
```js
tag.init(KEY, { session_recording: { maskAllInputs: true,
  maskTextSelector: '*', unmaskTextSelector: '[data-replay-safe]' } })
```
⚠ Unmasking a container unmasks its subtree. Put the attribute on the leaf that
holds the words, never on a wrapper that will later grow a form.
