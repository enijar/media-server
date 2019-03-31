const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postCSSLoaderPlugins = [
  require('autoprefixer')({
    browsers: [
      '> 0.3%',
      'last 7 versions',
      'Android >= 4',
      'Firefox >= 20',
      'iOS >= 8',
    ],
    flexbox: true,
  }),
];

if (process.argv[process.argv.length - 1] === 'production') {
  postCSSLoaderPlugins.push(require('cssnano')({preset: 'default'}));
}

module.exports = {
  target: 'web',
  node: {
    fs: 'empty',
  },
  entry: [
    path.resolve(__dirname, 'src', 'client', 'js', 'app.js'),
    path.resolve(__dirname, 'src', 'client', 'sass', 'app.scss'),
  ],
  output: {
    filename: 'app.js',
    chunkFilename: `[id].[chunkhash].js`,
    path: path.resolve(__dirname, 'public', 'dist'),
    publicPath: '/dist/',
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => postCSSLoaderPlugins,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new WebpackNotifierPlugin({
      alwaysNotify: process.argv[process.argv.length - 1] === 'development',
      skipFirstNotification: process.argv[process.argv.length - 1] === 'production',
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,
    }),
  ],
  devtool: 'source-map',
};
