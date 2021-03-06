const path = require("path");
const config = require("./webpack.base");

config.devServer = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  inline: true,
  host:'0.0.0.0',
  port: 9000,
  openPage: "Home/index.html",
  index: "Home/index.html",
  proxy: {
    "/asset": {
      target: 'http://localhost:8000', //""http://192.168.2.11:8000"",
      changeOrigin: true,
    },
    '/': {
      target: 'http://user.liweirenli.com',//'http://shizhongwei.com', //'http://user.liweirenli.com',//'http://user.liweirenli.com',//'http://user.liweirenli.com',//'http://shizhongwei.com'
      changeOrigin: true,
      // pathRewrite: {'^/api' : ''}
    },
  },
};
module.exports = config;
