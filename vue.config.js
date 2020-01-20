const path = require('path')
const webpack = require('webpack')
require('babel-polyfill')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  assetsDir: 'assets',
  devServer: {
    open: false, //是否自动在浏览器打开
    host: '0.0.0.0', //真机测试 0.0.0.0
    port: 8081, //配置端口号
    https: false, //是否配置https
    hotOnly: false, //是否热更新
  },
  chainWebpack: () => {},
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        // data: `@import "~@/assets/common.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    }
  }
}