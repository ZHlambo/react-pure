import config from './config'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import cssnano from 'cssnano'
const paths = config.utils_paths

const APP_ENTRY_PATH = paths.base(config.dir_client) + '/main.js'
const plugins = [
    new HtmlWebpackPlugin({
        template: config.utils_paths.client('index.html'),
        favicon: config.utils_paths.client('static/favicon.ico'),
        filename: 'index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true
        }
    }),
    //配合UglifyJsPlugin，否则会提示warning
    new webpack.DefinePlugin(config.globals),//实现全代码替换字段
]

const webpackConfig = {
    plugins,
    entry: {main:[APP_ENTRY_PATH],vendor: config.compiler_vendor},
    output: {
        path: config.utils_paths.base(config.dir_dist),
        filename: `[name].[${config.compiler_hash_type}].js`,
        publicPath: config.compiler_public_path,
    },
    //配置查找模块的路径和扩展名和别名（方便书写）
    resolve: { root: config.utils_paths.base(config.dir_client), extensions: ['', '.js', '.jsx', '.json'] },
    devServer: { inline: true, port: config.server_port, },
    module: {
        loaders: [{
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loader: "babel",
            query: { presets: ['es2015',"react",'stage-0'], plugins: ['transform-decorators-legacy'] }
        },{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }]
    }
}
// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'
const cssModulesLoader = [
  BASE_CSS_LOADER,
  'modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&')
webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: /node_modules/,
  loaders: [ 'style', cssModulesLoader, 'postcss', 'sass?sourceMap' ]
})
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: /node_modules/,
  // include: cssModulesRegex,
  loaders: [ 'style', cssModulesLoader, 'postcss' ]
})

webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
]


//development and production env config
if(config.env === "development"){
  //log出来的东西知道哪个文件,开发才使用，否则文件很大
   webpackConfig.devtool = config.compiler_devtool
   //热更新功能，修改代码实时刷新到浏览器ui
   webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin(),)
   webpackConfig.entry.main = [APP_ENTRY_PATH, `webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`]
 }else if(config.env === 'production'){
   //压缩代码,测试效果：js 1900K-->600K
   webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),)
   //entry中定义了vendor，把几个模块打包进vendor
   webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] }),)
   /*css 分离打包*/
   webpackConfig.plugins.push(new ExtractTextPlugin(`[name].[${config.compiler_hash_type}].css`, { allChunks: true }))
   webpackConfig.module.loaders.filter((loader) =>
     loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
   ).forEach((loader) => {
     const [first, ...rest] = loader.loaders
     loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
     delete loader.loaders
   })
 }

module.exports = webpackConfig
