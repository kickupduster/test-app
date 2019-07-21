const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    config: { path: './config/postcss.config.js' },
    sourceMap: true,
  },
};

const cssLoaders = ({ modules }) => [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {},
  },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: true,
      modules,
    },
  },
  postCssLoader,
];

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: { // optimization property
    splitChunks: {
      name: true,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.module\.(scss|sass)$/,
        loader: cssLoaders({ modules: true }),
      },
      {
        test: /(scss|sass)$/,
        loader: cssLoaders({ modules: false }),
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }), // плагин выносящий css в отдельный файл
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/public/template.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
