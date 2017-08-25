var path = require("path");
var webpack = require("webpack");
var WebpackBuildNotifierPlugin = require("webpack-build-notifier");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, './src'),
  build: path.join(__dirname, '.')
};

module.exports = {

  entry: {
    "c3-gauge": PATHS.src + '/c3-gauge.ts',
  },
  output: {
    path: PATHS.build,
    filename: 'dist/[name].js',
    libraryTarget: 'umd'
  },
  //devtool: "source-map",
  module: {
    rules: [{
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader'
      },
    ]
  },

  externals: {
    '@angular/core': '@angular/core',
    'c3': 'c3',
    'c3/c3.min.css': 'c3/c3.min.css',
    'd3-format': 'd3-format'
  },

  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['.ts', '.js', 'scss']
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "Construcción c3-gauge"
    })
  ]
};