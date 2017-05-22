"use strict";

const path = require("path");
const webpack = require("webpack");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require("./webpack.config");

config.entry = ['webpack-hot-middleware/client', path.join(process.cwd(), "src/index.js")]

config.output.filename = config.output.filename.replace(/\.min\.js$/, ".js");

config.plugins = [
  new webpack.SourceMapDevToolPlugin("[file].map"),
  new ExtractTextPlugin('bundle.css'),
  new webpack.HotModuleReplacementPlugin()
];

// Export mutated base.
module.exports = config;
