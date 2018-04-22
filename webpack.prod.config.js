const config = require('./webpack.common.config');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

config.plugins.push(new OptimizeCSSAssetsPlugin({}));

module.exports = config;
