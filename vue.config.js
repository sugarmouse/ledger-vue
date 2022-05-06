/*eslint-disable*/
const path =require('path')


module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ledger-vue-website/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')

    config.module
      .rule('svg-sprite')
      .test(/\.(svg)(\?.*)?$/)
      .include.add(dir).end() // 只处理 icons 目录
      .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract: false}).end()
      .use('svgo-loader').loader('svgo-loader')
      // .tap(options => ({...options, plugins: [{removeAttrs:{attrs:'fill'}}]}))
      .end()
    /* */
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'),[{plainSprite:true}])
    config.module.rule('svg').exclude.add(dir) // 对于其他文件路劲的 svg 的 loader 配置，排除当前 dir 路径
  }
}
