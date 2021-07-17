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
      '/': {
        target: 'http://192.168.1.112',
        changeOrigin: true,
      },
    }
  };
module.exports = config