const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const srcPath = path.join(process.cwd(), "src");

const generateWebpackConfig = (env) => {
  return {
    context: srcPath,
    entry: "./app",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: {
            test: path.resolve(process.cwd(), "./node_modules"),
          },
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["transform-react-jsx"],
              presets: ["es2015", "stage-2"]
            }
          }
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: [
              {loader: "css-loader"},
              {loader: "less-loader", options: {
                sourceMap: true,
                paths: [
                  path.join(srcPath, "app/style")
                ]
              }}
            ]
          })
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        },
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        }
      ]
    },
    resolve: {
      alias: {
        "config": path.resolve(process.cwd(), `./config`),
      },
    },
    output: {
      path: path.join(process.cwd(), "./dist"),
      filename: "app.[hash].js",
      publicPath: "/chatui"
    },
    plugins: [
      new webpack.EnvironmentPlugin([
        'NODE_ENV',
        'ACCOBOT_ENDPOINT',
        'ACCOBOT_CORP_ID',
        'ACCOBOT_AUTH_KEY',
        'ACCOBOT_USER_ID',
        'SPEECH_ENDPOINT',
        'INPUT_LANGUAGE',
        'OUTPUT_LANGUAGE'
      ]),
      new HtmlWebpackPlugin({
        template: path.join(srcPath, "app/index.html"),
        minify: {
          collapseWhitespace: true
        }
      }),
      new CopyWebpackPlugin([
        {
          from: "./static",
          to: "./"
        }
      ]),
      new ExtractTextPlugin ({
        filename: "style.[hash].css",
        allChunks: true
      })
    ]
  }
}

module.exports = generateWebpackConfig