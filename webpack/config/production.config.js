const path = require("path");
const webpack = require("webpack");

const commonConfig = require("./common.config")("production");
const srcPath = path.join(process.cwd(), "src")

const prodConfig = Object.assign({}, commonConfig);

module.exports = prodConfig