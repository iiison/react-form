/*
 *
 * 8888888b.  8888888b.        .d8888b.                     .d888 d8b
 * 888   Y88b 888   Y88b      d88P  Y88b                   d88P'  Y8P
 * 888    888 888    888      888    888                   888
 * 888   d88P 888   d88P      888         .d88b.  88888b.  888888 888  .d88b.
 * 8888888P'  8888888P'       888        d88''88b 888 '88b 888    888 d88P'88b
 * 888        888             888    888 888  888 888  888 888    888 888  888
 * 888        888             Y88b  d88P Y88..88P 888  888 888    888 Y88b 888
 * 888        888              'Y8888P'   'Y88P'  888  888 888    888  'Y88888
 *                                                                         888
 *                                                                    Y8b d88P
 *                                                                     'Y88P'
*/

import path         from 'path'
import chalk        from 'chalk'
import webpack      from 'webpack'
import MinifyPlugin from 'babel-minify-webpack-plugin'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProd         = LAUNCH_COMMAND === 'prod'
const isLocal        = LAUNCH_COMMAND === 'local'
const PATHS          = {
  src        : path.join(__dirname, 'src'),
  build      : path.join(__dirname, 'build'),
  nModules   : path.join(__dirname, 'node_modules'),
  utils      : path.join(__dirname, 'src/utils'),
  config     : path.join(__dirname, 'src/config'),
  components : path.join(__dirname, 'src/components'),
  testUtils  : path.join(__dirname, '__tests__/utils'),
}

// Plugins Configuration Starts
const moduleConcatenationPlugin = new webpack.optimize.ModuleConcatenationPlugin()
const prodPlugin = new webpack.DefinePlugin({
  'process.env' : {
    NODE_ENV : JSON.stringify('production')
  }
})
const envInfo = new webpack.DefinePlugin({
  'env' : {
    isProd,
    isDev   : LAUNCH_COMMAND === 'start',
    command : JSON.stringify(LAUNCH_COMMAND)
  }
})
const minifyPlugin = new MinifyPlugin({}, {
  test    : /\.(js|jsx)$/,
  include : PATHS.src,
  exclude : [/bundle\.js|coverage|node_modules/]
})
// Plugins Configuration Ends

process.env.BABEL_ENV = LAUNCH_COMMAND
process.env.LINT_ENV = LAUNCH_COMMAND
process.env.isProd = isProd

console.log(chalk.green('---------------------------------------------------------------'))
console.log(chalk.green(`-------- Running Application In ${isProd ? 'Production' : 'Development'} Environment -------`))
console.log(chalk.green('---------------------------------------------------------------'))

const base = {
  entry  : path.join(__dirname, 'index.js'),
  output : {
    path           : PATHS.build,
    library        : 'reactStateForm',
    libraryTarget  : 'umd',
    umdNamedDefine : true,
    filename       : 'react-state-form.js'
  },
  externals : {
    react : {
      commonjs  : 'react',
      commonjs2 : 'react',
      amd       : 'React',
      root      : 'React'
    }
  },
  module : {
    rules : [
      // {
      //   enforce : 'pre',
      //   test    : /\.(js|jsx)$/,
      //   use     : 'eslint-loader',
      //   include : PATHS.src,
      //   exclude : [/bundle\.js|coverage/]
      // },
      {
        test    : /\.(js|jsx)$/,
        exclude : [/node_modules/],
        loader  : 'babel-loader'
      }
    ]
  },
  resolve : {
    alias : {
      $SRC        : PATHS.src,
      $BUILD      : PATHS.build,
      $UTILS      : PATHS.utils,
      $TEST_UTILS : PATHS.testUtils,
      $CONFIG     : PATHS.config,
      $COMPONENTS : PATHS.components,
      react       : path.join(PATHS.nModules, 'react')
    },
    enforceExtension : false,
    extensions       : ['.js', '.jsx'],
    modules          : [path.resolve('.'), 'node_modules']
  },
  context : PATHS.src
}

const commonPlugins = [moduleConcatenationPlugin, envInfo]
const devConfig = {
  devtool   : 'cheap-module-eval-source-map',
  devServer : {
    compress           : true,
    historyApiFallback : true,
    clientLogLevel     : 'info',
    open               : true,
    overlay            : {
      warnings : isProd,
      errors   : true
    }
  },
  plugins   : commonPlugins
}
const prodConf = {
  devtool : false,
  plugins : commonPlugins.concat([prodPlugin, minifyPlugin])
}

devConfig.plugins = commonPlugins

export default Object.assign({}, base, isProd ? prodConf : devConfig)

