import Koa from 'koa'
import convert from 'koa-convert'
import serve from 'koa-static'
import config from '../config'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
import webpackMiddleware from 'koa-webpack';
import historyApiFallback from 'koa-connect-history-api-fallback'
import webpackDevMiddleware from '../middleware/webpack-dev'
import _debug from 'debug'
//开发环境以及正式环境下的config处理
const debug = _debug("app:server")
const app = new Koa()

debug(`server in running in http://${config.server_host}:${config.server_port}`)

const compiler = webpack(webpackConfig)
const { publicPath } = webpackConfig.output
if (config.env === 'development') {
  //单页面路由需要加的插件，刷新页面的时候默认读取index.html文件
  app.use(historyApiFallback({ verbose: false }))
  //使用webpack
  app.use(webpackDevMiddleware(compiler, publicPath))
  //静态资源不编译，直接使用，在compile output到dist文件下时，直接复制过去
  app.use(convert(serve(config.utils_paths.client('static'))))
}else {
  debug('Server is being run outside of live development mode.')
}
app.listen(config.server_port)
