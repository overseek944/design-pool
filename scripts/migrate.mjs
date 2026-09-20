#!/usr/bin/env node
// Restructure the repo when it crosses a size threshold.
// tier1 <100: flat manifest, agents may read it whole
// tier2 100-400: manifest + per-category manifests
// tier3 400+: sharded manifests only; root manifest becomes a category router
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
execSync(`${join(ROOT, 'bin/pool')} index`, { stdio: 'inherit' })
const all = JSON.parse(readFileSync(join(ROOT, 'index.json'), 'utf8'))
const tier = all.length < 100 ? 1 : all.length < 400 ? 2 : 3
const byCat = {}
for (const p of all) (byCat[p.category] ||= []).push(p)

if (tier >= 2) {
  const dir = join(ROOT, 'manifests'); if (!existsSync(dir)) mkdirSync(dir)
  for (const [cat, ps] of Object.entries(byCat)) {
    const lines = ps.map(p => `${p.id} | ${p.axes ? `E${p.axes.energy} D${p.axes.density} W${p.axes.weight} F${p.axes.finish}` : 'neutral '} $${p.cost} | ${(p.tags || []).join(' ')} | ${p.gist.slice(0, 64)}`)
    writeFileSync(join(dir, `${cat}.md`), `# ${cat} (${ps.length})\n\n\`\`\`\n${lines.join('\n')}\n\`\`\`\n`)
  }
  console.log(`sharded ${Object.keys(byCat).length} category manifests`)
}

if (tier >= 3) {
  const rows = Object.entries(byCat).sort((a, b) => b[1].length - a[1].length).map(([c, ps]) => {
    const scored = ps.filter(p => p.axes)
    const mean = a => scored.length ? (scored.reduce((s, p) => s + p.axes[a], 0) / scored.length).toFixed(1) : '–'
    return `| ${c} | ${ps.length} | ${mean('energy')} | ${mean('density')} | ${mean('weight')} | ${mean('finish')} | manifests/${c}.md |`
  })
  writeFileSync(join(ROOT, 'MANIFEST.md'),
    `# Router\n\n${all.length} primitives across ${Object.keys(byCat).length} categories.\n` +
    `**Too large to read. Use \`bin/pool query\` and \`bin/pool near\`.**\n` +
    `Mean axis position per category, for orientation only:\n\n` +
    `| category | n | E | D | W | F | manifest |\n|---|---|---|---|---|---|---|\n${rows.join('\n')}\n`)
  console.log('root manifest converted to category router')
}
console.log(`tier ${tier} — ${all.length} primitives`)
