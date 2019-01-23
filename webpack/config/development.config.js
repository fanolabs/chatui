const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

const commonConfig = require("./common.config")("development");
const srcPath = path.join(process.cwd(), "src")

const devConfig = Object.assign({}, commonConfig, {

  devtool: "inline-source-map",

  devServer: {
    // contentBase: srcPath,
    historyApiFallback: true,
    overlay: true,
    hot: true,
    inline: true,
    host: "0.0.0.0",
    port: 3001,
    disableHostCheck: true
  },

  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    ...commonConfig.plugins
  ]

})

module.exports = devConfig