import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import {uglify} from 'rollup-plugin-uglify';
// import camelCase from 'lodash.camelcase'
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import css from "rollup-plugin-import-css";

const pkg = require('./package.json')

const isProd = process.env.NODE_ENV === 'production'

let destFilePath = isProd ? pkg.main: './example/dist.js'

// const libraryName = 'eft-face-detection'

export default {
  input: `src/index.ts`,
  output: [
    { file: destFilePath, name: 'exe', format: 'umd', sourcemap: true }
    // { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    css({ output: 'bundle.css' }),
    // Allow json resolution
    json(),

    // 压缩代码
    isProd ? uglify() : null,
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),


    // Resolve source maps to the original source
    sourceMaps(),

    // Using proxy server in configuration development environment
    isProd ? null : serve({
      open: true,
      port: 8080,
      contentBase: 'example'
    })
  ],
}
