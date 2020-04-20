const path = require('path')
const buble = require('rollup-plugin-buble')
const alias = require('rollup-plugin-alias')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const node = require('rollup-plugin-node-resolve')
const flow = require('rollup-plugin-flow-no-whitespace')
const version = process.env.VERSION || require('../package.json').version
// const weexVersion = process.env.WEEX_VERSION || require('../packages/weex-vue-framework/package.json').version
const featureFlags = require('./feature-flags')

const banner =
  '/*!\n' +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Evan You\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const weexFactoryPlugin = {
  intro () {
    return 'module.exports = function weexFactory (exports, document) {'
  },
  outro () {
    return '}'
  }
}

const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

const builds = {
  // Runtime+compiler CommonJS build (CommonJS)
  // 'web-full-cjs-dev': {
  //   entry: resolve('web/entry-runtime-with-compiler.js'),
  //   dest: resolve('dist/vue.common.dev.js'),
  //   format: 'cjs',
  //   env: 'development',
  //   alias: { he: './entity-decoder' },
  //   banner
  // },
  // 'web-full-cjs-prod': {
  //   entry: resolve('web/entry-runtime-with-compiler.js'),
  //   dest: resolve('dist/vue.common.prod.js'),
  //   format: 'cjs',
  //   env: 'production',
  //   alias: { he: './entity-decoder' },
  //   banner
  // },
  // Runtime+compiler ES modules build (for bundlers)
  // 'web-full-esm': {
  //   entry: resolve('web/entry-runtime-with-compiler.js'),
  //   dest: resolve('dist/vue.esm.js'),
  //   format: 'es',
  //   alias: { he: './entity-decoder' },
  //   banner
  // },
  // Runtime+compiler ES modules build (for direct import in browser)
  // 'web-full-esm-browser-dev': {
  //   entry: resolve('web/entry-runtime-with-compiler.js'),
  //   dest: resolve('dist/vue.esm.browser.js'),
  //   format: 'es',
  //   transpile: false,
  //   env: 'development',
  //   alias: { he: './entity-decoder' },
  //   banner
  // },
  // Runtime+compiler ES modules build (for direct import in browser)
  // 'web-full-esm-browser-prod': {
  //   entry: resolve('web/entry-runtime-with-compiler.js'),
  //   dest: resolve('dist/vue.esm.browser.min.js'),
  //   format: 'es',
  //   transpile: false,
  //   env: 'production',
  //   alias: { he: './entity-decoder' },
  //   banner
  // },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler production build  (Browser)
  // 'web-full-prod': {
  //   entry: resolve('web/entry-runtime-with-compiler.js'),
  //   dest: resolve('dist/vue.min.js'),
  //   format: 'umd',
  //   env: 'production',
  //   alias: { he: './entity-decoder' },
  //   banner
  // },
}

function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  // built-in vars
  const vars = {
    // __WEEX__: !!opts.weex,
    // __WEEX_VERSION__: weexVersion,
    __VERSION__: version
  }
  // feature flags
  Object.keys(featureFlags).forEach(key => {
    vars[`process.env.${key}`] = featureFlags[key]
  })
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
