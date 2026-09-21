---
id: render-fault-reserved-slot
category: media
tags: [media,correctness,third-party,layout-shift,fallback,lifecycle]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A vendor visual runtime — vector player, chart, map, viewer — can throw
inside render, and a component framework answers by unmounting the whole
ancestor tree: one ornament takes the view with it. Contain it at the seam and
paint an empty box of the same size, from the size props the real thing was
given. Not a message, not a spinner — a hole where the decoration was, so the
failure costs its own rectangle and nothing reflows. Log it; never surface it.

```jsx
class Contain extends Component {          // one boundary per runtime instance
  state = {}
  static getDerivedStateFromError = () => ({ dead: true })
  componentDidCatch = e => console.warn('[viz]', e.message)
  render = () => this.state.dead
    ? <div style={{ width: this.props.w, height: this.props.h }} aria-hidden />
    : this.props.children }
```
⚠ It catches render only — a fault in the runtime's own loop or asset fetch
needs the vendor's error callback instead. The boundary wraps the component that
mounts the runtime; inside it, it catches nothing.
