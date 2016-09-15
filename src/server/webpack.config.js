'use strict';

const path = require('path');
const webpack = require('webpack');

/**
 * Add any preloaders that require dev environment
 * within this function
 */
function getPreLoaders() {
  const preLoaders = [];

  // If environment != production, then add the
  // eslint preloader
  if (process.env.ENABLE_LINTER === 'true') {
    preLoaders.push({
      test: /\.js?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    });
  }

  return preLoaders;
}

module.exports = {
  devtool: 'eval-source-map',
  name: 'factory-server',
  target: 'node',
  resolve: {
    root: path.resolve(__dirname, 'node_modules'),
    extensions: ['', '.js'],
  },
  entry: [
    path.resolve(__dirname, 'index.js'),
  ],
  output: {
    path: path.join(__dirname, '../../build'),
    filename: 'server.js',
    sourceMapFilename: '[file].map',
  },
  module: {
    preLoaders: getPreLoaders(),
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],

  eslint: {
    configFile: 'src/client/.eslintrc.js',
    // emitWarning results in any lint errors to only be reported as a warning,
    // which allows Webpack to generate the bundle. If it reports as an error,
    // then webpack does not generate the bundle.
    // --------------
    // We can remove this once we want the build to fail if there are any
    // lint errors
    emitWarning: true,
  },
};
