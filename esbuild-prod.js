const esbuild = require('esbuild')
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html')
const { compress } = require('esbuild-plugin-compress');

(async () => {
  const ctx = await esbuild.context({
    logLevel: 'info',
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'build',
    metafile: true,
    loader: { '.png': 'file' },
    minify: true,
    plugins: [
      htmlPlugin({
        files: [
          {
            entryPoints: ['src/index.js'],
            filename: 'index.html',
          },
        ],
      }),
    ],
  })

  await ctx.rebuild()
  await ctx.dispose()
})()
