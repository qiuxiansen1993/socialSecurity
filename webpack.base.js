'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProd = mode === 'production';
const customPage = {
  css:[
    (isProd ? '/asset/mui/css/mui.min.css':'http://localhost:8000/asset/mui/css/mui.min.css')
  ],
  js:[
    (isProd ? '/asset/mui/js/mui.min.js':'http://localhost:8000/asset/mui/js/mui.min.js')
  ],
  meta:[
    {
      name:'keywords',
      content:'人事代理,社保管理,工资代发,劳务派遣,社保托管'
    },
    {
      name:'description',
      content:'致力于通过互联网提供高效便捷的人事服务,提供人事代理、社保管理、社保托管、工资代发、个税申报、灵活用工、社会化用工、人力资源外包、工资代发、个税申报、福利保险、劳务派遣等服务'
    },
    {
      name:'apple-mobile-web-app-capable',
      content:'yes'
    },
    {
      name:'format-detection',
      content:'telephone=no'
    },
    {
      name:'author',
      content:''
    },
    {
      name:'browsermode',
      content:'application'
    },
    {
      name:'x5-fullscreen',
      content:'true'
    },
    {
      name:'x5-page-mode',
      content:'app'
    },
    {
      name:'baidu-hm-key',
      content:''
    },
    {
      name:'360-site-verification',
      content:''
    },
    {
      name:'baidu-site-verification',
      content:''
    },
  ]
}

const config = {
  mode,
  entry: {
    // main: './pages/utils/main.js',
    Home: "./pages/Home/index.js", // home页面
    Personal: "./pages/Personal/index.js", // personal页面,
    AddUserInfo: "./pages/AddUserInfo/index.js", // personal页面
    Login:"./pages/Login/index.js",
    MyInvite:"./pages/MyInvite/index.js",
    MyBalance:"./pages/MyBalance/index.js",
    Feedback:"./pages/Feedback/index.js",
    MyInfo:"./pages/MyInfo/index.js",
    MyInvite:"./pages/MyInvite/index.js",
    MyOrder:"./pages/MyOrder/index.js",
    ServiceDetails:"./pages/ServiceDetails/index.js",
    SetInsured:"./pages/SetInsured/index.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name]/[name].[contenthash].js' : '[name]/[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home",
      filename: "Home/index.html",
      template: "./pages/Home/index.html",
      chunks: ["Home"],
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "Personal",
      filename: "Personal/index.html",
      template: "./pages/Personal/index.html",
      chunks: ["Personal"],
    }),
    new HtmlWebpackPlugin({
      title: "AddUserInfo",
      filename: "AddUserInfo/index.html",
      template: "./pages/AddUserInfo/index.html",
      chunks: ["AddUserInfo"],
    }),
    new HtmlWebpackPlugin({
      title: "Login",
      filename: "Login/index.html",
      template: "./pages/Login/index.html",
      chunks: ["Login"],
    }),
    new HtmlWebpackPlugin({
      title: "MyInvite",
      filename: "MyInvite/index.html",
      template: "./pages/MyInvite/index.html",
      chunks: ["MyInvite"],
    }),
    new HtmlWebpackPlugin({
      title: "MyBalance",
      filename: "MyBalance/index.html",
      template: "./pages/MyBalance/index.html",
      chunks: ["MyBalance"],
    }),
    new HtmlWebpackPlugin({
      title: "Feedback",
      filename: "Feedback/index.html",
      template: "./pages/Feedback/index.html",
      chunks: ["Feedback"],
    }),
    new HtmlWebpackPlugin({
      title: "MyInfo",
      filename: "MyInfo/index.html",
      template: "./pages/MyInfo/index.html",
      chunks: ["MyInfo"],
    }),
    new HtmlWebpackPlugin({
      title: "MyInvite",
      filename: "MyInvite/index.html",
      template: "./pages/MyInvite/index.html",
      chunks: ["MyInvite"],
    }),
    new HtmlWebpackPlugin({
      title: "MyOrder",
      filename: "MyOrder/index.html",
      template: "./pages/MyOrder/index.html",
      chunks: ["MyOrder"],
    }),
    new HtmlWebpackPlugin({
      title: "ServiceDetails",
      filename: "ServiceDetails/index.html",
      template: "./pages/ServiceDetails/index.html",
      chunks: ["ServiceDetails"],
    }),
    new HtmlWebpackPlugin({
      title: "SetInsured",
      filename: "SetInsured/index.html",
      template: "./pages/SetInsured/index.html",
      chunks: ["SetInsured"],
    }),
    new MiniCssExtractPlugin({
        filename: isProd ? '[name]/[name].[contenthash].css' : '[name]/[name].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
module.exports = config;
