const esbuild = require('esbuild')
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html')

;(async () => {
  const ctx = await esbuild.context({
    logLevel: 'info',
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'dist',
    metafile: true,
    loader: { '.png': 'file' },
    write: false,
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

  await ctx.watch()

  await ctx.serve({
    servedir: 'dist',
  })

  // ctx.dispose()
})()
