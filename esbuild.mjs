import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/JavaScript/app.js'],
  bundle: true,
  outfile: 'public/app.js',
})