"use strict";

const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/eriko-scroller.js",
  output: {
    filename: "eriko-scroller.min.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
  },
  mode: 'production',
  devtool: 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          }
        }
      },
    ]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  plugins: [
    new CleanWebpackPlugin({ dry: true, protectWebpackAssets: false }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
        uglifyOptions: {
          keep_fnames: true
        }
      }
    )]
  }
};