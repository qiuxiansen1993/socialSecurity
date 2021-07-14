const path = require('path');
const config = require("./webpack.base");
config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    proxy:{
      '/mock/736/api/thh': {
        target: 'http://yapi.bmp.sankuai.com',
        changeOrigin: true,
      },
    }
  };
module.exports = config