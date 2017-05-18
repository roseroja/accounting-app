var path = require('path');
var webpack = require('webpack');
var combineLoaders = require('webpack-combine-loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, '../../build');
var APP_DIR = path.resolve(__dirname, '../../app');

module.exports = {
  entry: {
    entry: APP_DIR + '/index.js'
  },
  output: {
    path: BUILD_DIR,
    filename: 'index.bundle.js'
  },
  resolve: {
    modules: ["node_modules", "app", "app/*"],
    extensions: [".js", ".css",".jsx", ".json"]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject:false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include : APP_DIR,
        loaders: ['react-hot-loader','babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          combineLoaders([{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }])
        )
      },
      {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file',
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
