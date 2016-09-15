const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

function getPreLoaders() {
  const preLoaders = [];

  // If environment != production, then add the
  // eslint preloader
  if (process.env.NODE_ENV !== 'production' && process.env.ENABLE_LINTER) {
    preLoaders.push({
      test: /\.js?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    });
  }

  return preLoaders;
}

function getPlugins() {
  const plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        ENABLE_LINTER: JSON.stringify(process.env.ENABLE_LINTER),
      },
    }),
    // new webpack.HotModuleReplacementPlugin(), // Don't do this if passing the --hot flag (https://github.com/webpack/webpack-dev-server/issues/87)
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      new CopyWebpackPlugin([
        { from: 'index.html', to: '../index.html' },
      ])
    );
  } else {
    plugins.push(
      new CopyWebpackPlugin([
        { from: 'index.html', to: '../../index.html' },
      ])
    );
  }

  return plugins;
}

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'eval-source-map',
  name: 'factory-client',
  context: __dirname,
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
  entry: [
    // 'webpack-dev-server/src?http://localhost:8080',
    // 'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'index.js'),
    // path.resolve(__dirname, "examples/example-react-01.js")
  ],
  output: {
    path: path.join(__dirname, '../../build/public/js/', process.env.NODE_ENV === 'production' ? '' : 'debug'),
    publicPath: '/js/',
    filename: 'client_bundle.js',
    sourceMapFilename: '[file].map',
  },
  module: {
    preLoaders: getPreLoaders(),
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          __dirname,
        ],
        exclude: [
          path.join(__dirname, 'node_modules'),
          path.join(__dirname, 'client/examples'),
        ],
        // loader: "react-hot!babel?presets[]=es2015&presets[]=react",
        loader: 'babel?presets[]=es2015&presets[]=react',
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'css'),
        loader: 'style!css',
      },
      {
        test: /\.json$/,
        include: path.resolve(__dirname, 'locales'),
        loader: 'json-loader',
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]',  // <-- retain original file name
      },
      // {
      //   test: /\.js$/,
      //   include: path.join(__dirname, 'client'),
      //   loader: "react-hot"
      // }
    ],
  },

  plugins: getPlugins(),

  eslint: {
    configFile: 'client/.eslintrc.js',
    // emitWarning results in any lint errors to only be reported as a warning,
    // which allows Webpack to generate the bundle. If it reports as an error,
    // then webpack does not generate the bundle.
    // --------------
    // We can remove this once we want the build to fail if there are any
    // lint errors
    emitWarning: true,
  },

  devServer: {
    contentBase: path.join(__dirname, '../../build/public'),
    historyApiFallback: true,
    port: 8080,
    // proxy: {
    //   '/installTool*': {
    //     target: 'http://localhost:3001',
    //     secure: false,
    //     bypass: function(req, res, proxyOptions) {
    //       if (req.headers.accept.indexOf('html') !== -1) {
    //         console.log('Skipping proxy for browser request.');
    //         return '/index.html';
    //       }
    //     }
    //   }
    // }
  },
};
