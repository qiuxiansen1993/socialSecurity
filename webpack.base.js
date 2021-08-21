'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProd = mode === 'production';
const customPage = {
  NODE_ENV:'production' || process.env.NODE_ENV,
  css:[
    (isProd ? '/asset/mui/css/mui.min.css':'http://localhost:8000/asset/mui/css/mui.min.css'),
    (isProd ? '/asset/mui/css/mui.picker.css':'http://localhost:8000/asset/mui/css/mui.picker.css'),
    (isProd ? '/asset/mui/css/mui.poppicker.css':'http://localhost:8000/asset/mui/css/mui.poppicker.css'),
    (isProd ? '/asset/mui/css/mui.picker.min.css':'http://localhost:8000/asset/mui/css/mui.picker.min.css')
  ],
  js:[
    (isProd ? '/asset/tools/rem.js':'http://localhost:8000/asset/tools/rem.js'),
    (isProd ? '/asset/mui/js/mui.min.js':'http://localhost:8000/asset/mui/js/mui.min.js'),
    (isProd ? '/asset/mui/js/mui.picker.js':'http://localhost:8000/asset/mui/js/mui.picker.js'),
    (isProd ? '/asset/mui/js/mui.poppicker.js':'http://localhost:8000/asset/mui/js/mui.poppicker.js'),
    (isProd ? '/asset/mui/js/mui.picker.min.js':'http://localhost:8000/asset/mui/js/mui.picker.min.js')
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
  devtool:'inline-source-map',
  entry: {
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
    MyServer:"./pages/MyServer/index.js",
    Withdrawal:"./pages/Withdrawal/index.js",
    CreateOrder:"./pages/CreateOrder/index.js",
    PayCost:"./pages/PayCost/index.js",
    PayList:"./pages/PayList/index.js",
    OrderDetails:"./pages/OrderDetails/index.js",
    Offline:"./pages/Offline/index.js",
    TransferNotice:"./pages/TransferNotice/index.js",
    TransferRecord:"./pages/TransferRecord/index.js",
    WithdrawalRecore:"./pages/WithdrawalRecore/index.js",
    PayDetails:"./pages/PayDetails/index.js",
    GjjTool:"./pages/GjjTool/index.js",
    Announce:"./pages/Announce/index.js",
    MyInviteRecommand:"./pages/MyInviteRecommand/index.js",
    SbView:"./pages/SbView/index.js",
    GjjView:"./pages/GjjView/index.js",
    SbViewDateList:"./pages/SbView/DateList/index.js",
    
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
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "Personal",
      filename: "Personal/index.html",
      template: "./pages/Personal/index.html",
      chunks: ["Personal"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "AddUserInfo",
      filename: "AddUserInfo/index.html",
      template: "./pages/AddUserInfo/index.html",
      chunks: ["AddUserInfo"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "Login",
      filename: "Login/index.html",
      template: "./pages/Login/index.html",
      chunks: ["Login"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "MyInvite",
      filename: "MyInvite/index.html",
      template: "./pages/MyInvite/index.html",
      chunks: ["MyInvite"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "MyBalance",
      filename: "MyBalance/index.html",
      template: "./pages/MyBalance/index.html",
      chunks: ["MyBalance"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "Feedback",
      filename: "Feedback/index.html",
      template: "./pages/Feedback/index.html",
      chunks: ["Feedback"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "MyInfo",
      filename: "MyInfo/index.html",
      template: "./pages/MyInfo/index.html",
      chunks: ["MyInfo"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "MyInvite",
      filename: "MyInvite/index.html",
      template: "./pages/MyInvite/index.html",
      chunks: ["MyInvite"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "MyOrder",
      filename: "MyOrder/index.html",
      template: "./pages/MyOrder/index.html",
      chunks: ["MyOrder"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "MyServer",
      filename: "MyServer/index.html",
      template: "./pages/MyServer/index.html",
      chunks: ["MyServer"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "Withdrawal",
      filename: "Withdrawal/index.html",
      template: "./pages/Withdrawal/index.html",
      chunks: ["Withdrawal"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "CreateOrder",
      filename: "CreateOrder/index.html",
      template: "./pages/CreateOrder/index.html",
      chunks: ["CreateOrder"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "PayCost",
      filename: "PayCost/index.html",
      template: "./pages/PayCost/index.html",
      chunks: ["PayCost"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "PayList",
      filename: "PayList/index.html",
      template: "./pages/PayList/index.html",
      chunks: ["PayList"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "OrderDetails",
      filename: "OrderDetails/index.html",
      template: "./pages/OrderDetails/index.html",
      chunks: ["OrderDetails"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "Offline",
      filename: "Offline/index.html",
      template: "./pages/Offline/index.html",
      chunks: ["Offline"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "TransferNotice",
      filename: "TransferNotice/index.html",
      template: "./pages/TransferNotice/index.html",
      chunks: ["TransferNotice"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "TransferRecord",
      filename: "TransferRecord/index.html",
      template: "./pages/TransferRecord/index.html",
      chunks: ["TransferRecord"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "WithdrawalRecore",
      filename: "WithdrawalRecore/index.html",
      template: "./pages/WithdrawalRecore/index.html",
      chunks: ["WithdrawalRecore"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "PayDetails",
      filename: "PayDetails/index.html",
      template: "./pages/PayDetails/index.html",
      chunks: ["PayDetails"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "GjjTool",
      filename: "GjjTool/index.html",
      template: "./pages/GjjTool/index.html",
      chunks: ["GjjTool"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "Announce",
      filename: "Announce/index.html",
      template: "./pages/Announce/index.html",
      chunks: ["Announce"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "MyInviteRecommand",
      filename: "MyInviteRecommand/index.html",
      template: "./pages/MyInviteRecommand/index.html",
      chunks: ["MyInviteRecommand"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "GjjView",
      filename: "GjjView/index.html",
      template: "./pages/GjjView/index.html",
      chunks: ["GjjView"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "SbView",
      filename: "SbView/index.html",
      template: "./pages/SbView/index.html",
      chunks: ["SbView"],
      inject:'body',
      files:customPage
    }),
    new HtmlWebpackPlugin({
      title: "SbViewDateList",
      filename: "SbViewDateList/index.html",
      template: "./pages/SbView/DateList/index.html",
      chunks: ["SbViewDateList"],
      inject:'body',
      files:customPage
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
