"use strict";

const path = require("path");
const webpack = require("webpack");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let Dashboard = require('webpack-dashboard');
let DashboardPlugin = require('webpack-dashboard/plugin');
let dashboard = new Dashboard();
const config = require("./webpack.config");

config.entry = ['webpack-hot-middleware/client', path.join(process.cwd(), "src/index.js")]
config.output.path = path.resolve(__dirname, '../../public');
config.output.filename = config.output.filename.replace(/\.min\.js$/, ".js");

config.plugins = [
  new webpack.SourceMapDevToolPlugin("[file].map"),
  new ExtractTextPlugin('bundle.css'),
  new DashboardPlugin(dashboard.setData),
  new webpack.HotModuleReplacementPlugin()
];

// Export mutated base.
module.exports = config;
