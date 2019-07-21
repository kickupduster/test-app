const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    config: { path: './config/postcss.config.js' },
  },
};

const cssLoaders = ({ modules }) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules,
    },
  },
  postCssLoader,
];

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development', // app mode
  devServer: { // devserver property
    contentBase: path.resolve(__dirname, '../dist'),
    port: 3000,
    overlay: true,
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
  devtool: 'eval-sourcemap',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/public/template.html'), // плагин для генерации html
    }),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
