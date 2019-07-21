const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '../src'), // точка входа в приложение
  },
  output: { // собранные файлы
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [{ // описание правил для разных типов файлов
      test: /(js|jsx)/,
      loader: ['babel-loader'],
      exclude: '/node_modules/',
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
