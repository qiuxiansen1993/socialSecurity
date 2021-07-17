const path = require('path');
const config = require("./webpack.base");
config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    inline:true,
    port: 9000,
    openPage:'Home/index.html',
    index:'Home/index.html',
    proxy:{
      '/mock/736/api/thh': {
        target: 'http://yapi.bmp.sankuai.com',
        changeOrigin: true,
      },
    }
  };
module.exports = config