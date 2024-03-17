import * as fs from 'node:fs/promises'
//import * as esbuild from 'esbuild'

const result = await Bun.build({
  entrypoints: ['example/main.ts'],
  outdir: 'dist',
  //bundle: true
})

if (!result.success) {
  throw result.logs[0]
}

await fs.copyFile('appsscript.json', 'dist/appsscript.json')

console.log('Built')
