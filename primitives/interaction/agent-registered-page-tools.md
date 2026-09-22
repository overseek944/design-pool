---
id: agent-registered-page-tools
category: interaction
tags: [architecture,progressive-enhancement,interop,capability,lifecycle,feature-detection]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A page can publish a few callable tools to an agent driving the browser instead
of leaving it to scrape rendered DOM. Two shapes are in the wild — per-tool
registration taking an `AbortSignal`, and a whole-set call cleared by passing an
empty list — so detect which exists and keep the teardown each needs, or a
client-side route change leaves stale tools registered. Three to six tools, each
returning text the page already publishes elsewhere, is the useful size; beyond
that the answers drift from the copy.

```js
const mc = navigator.modelContext; if (!mc) return
const ac = new AbortController()
mc.registerTool ? tools.forEach(t => mc.registerTool(t, { signal: ac.signal }))
                : mc.provideContext?.({ tools })
return () => { ac.abort(); mc.provideContext?.({ tools: [] }) }
```
⚠ Absent in most browsers and unstable where present — pure enhancement, never
the only route to anything, and wrap the registration in a `try` because a
partial implementation throws rather than declining.

`navigator.modelContext` is script, and the readers that matter most are the
ones that never run it. Publish the same surface declaratively as well: one
`<link rel="service-desc">` pointing at a machine-readable description of what
the page can be asked to do, plus a `rel="api-catalog"` entry point for anything
larger than one document. Both are in the served bytes, so a fetch-only client
has them before it parses. Generate the description from the same source as the
tool list or the two drift silently.
```html
<link rel="service-desc" type="application/vnd.oai.openapi+json" href="/agent-tools/openapi.json">
<link rel="api-catalog" type="application/linkset+json" href="/.well-known/api-catalog">
```
⚠ A declared surface is a public one — everything reachable through it is
unauthenticated traffic you have invited, and it is the first thing scanned.

The reader can be handed the same job, and that version is ordinary HTML. A
short list of links to assistants, each carrying the page's own question
pre-encoded in its query string, lets someone leave to ask about the thing with
the framing already set. The prompt is authored copy — it will be read back as
the page's summary of itself, so write it rather than generating it, and keep it
to the claims the page already makes. Four to six destinations is the whole
field.
```html
<a href="https://example-assistant/?q=What%20is%20…" rel="noopener">Ask an assistant</a>
```
⚠ These leave the site, so they belong below the content, never beside a
primary action — and the same summary has to exist on the page, or the only
answer to the question is one you do not control.
