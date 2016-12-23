import path from "path"
var config={
  server_host              :getIPAdress(),
  server_port              :3333,
  static                   :"src/static",//暂时无用
  compiler_hash_type       :"hash",//hash类型
  path_base                : path.resolve(__dirname, '..'),
  dir_client               :"src",
  dir_dist                 :"dist",
  env                      :process.env.NODE_ENV || 'development',
  compiler_vendor          :[ 'history', 'react-redux', 'react-router', 'react-router-redux','react','redux' ],
  compiler_devtool         :'source-map',//wepackconfig 49.js 设置后log出来的东西知道哪个文件,development才使用，否则生成文件很大
  compiler_stats           : {chunks : false,chunkModules : false,colors : true},//webpack 不打印每个文件打包过程 undefined则打印
}
config.utils_paths=(() => {
const resolve = path.resolve
const base = (...args) =>
  resolve.apply(resolve, [config.path_base, ...args])

return {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist)
}
})()
if(config.env == "development"){
  config.compiler_public_path = `http://${config.server_host}:${config.server_port}/`
}else if(config.env == "production"){
  config.compiler_public_path = "/"
}

config.globals = {//暂无使用
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__DEBUG__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || ''),
  "__DEBUG_NEW_WINDOW__":false
}

module.exports = config



function getIPAdress(){//o获取本机ip
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i=0;i<iface.length;i++){
               var alias = iface[i];
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                     return alias.address;
               }
          }
    }
}
