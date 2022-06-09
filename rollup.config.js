import typescript from '@rollup/plugin-typescript'
import PostCSS from 'rollup-plugin-postcss'
import pkg from './package.json'

const external = ['vue-demi']

const plugins = [typescript(), PostCSS()]

export default [
  {
    plugins,
    external,
    input: 'src/index.ts',
    output: [
      {
        format: 'esm',
        file: pkg.module,
        sourcemap: true,
      },
      {
        format: 'cjs',
        file: pkg.main,
        exports: 'named',
      },
      {
        format: 'umd',
        file: pkg.unpkg,
        name: 'testing23',
        sourcemap: true,
        globals: {
          'vue-demi': 'VueDemi',
        },
      },
    ],
  },
]
