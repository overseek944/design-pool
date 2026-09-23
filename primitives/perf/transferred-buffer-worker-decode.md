---
id: transferred-buffer-worker-decode
category: perf
tags: [performance,worker,binary,loading,webgl,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A raw binary asset — voxel data, a point cloud, packed mesh arrays — that needs
unpacking or normalising before upload will stall the main thread for as long
as the loop runs. Fetch the `ArrayBuffer`, post it to a worker with the buffer
in the transfer list so ownership moves instead of copying, and transfer the
result back. Terminate the worker once it answers.
```js
const w = new Worker('/decode.js')
w.onmessage = e => { upload(new Uint8Array(e.data.out)); w.terminate() }
w.postMessage({ buf, dims }, [buf])
```
⚠ A transferred buffer is detached — any later read of it on the sender returns zero bytes. Guard against unmount: ignore late replies and terminate in cleanup.
