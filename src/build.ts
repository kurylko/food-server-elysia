import './index'

await Bun.build({
    "entrypoints": ['./index.ts'],
    "outdir": "./dist",
    "sourcemap": "external"
})