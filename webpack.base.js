'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProd = mode === 'production';
const config = {
  mode,
  entry: {
    main: './pages/utils/main.js',
    Home: "./pages/Home/index.js", // home页面
    Personal: "./pages/Personal/index.js", // personal页面
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
      chunks: ["Home","main"],
    }),
    new HtmlWebpackPlugin({
      title: "Personal",
      filename: "Personal/index.html",
      template: "./pages/Personal/index.html",
      chunks: ["Personal","main"],
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
