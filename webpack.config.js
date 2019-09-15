const path = require('path');

module.exports = {
  entry: {
    natacha: './src/pages/home.js',
    ['eventos-aaa']: './src/pages/event.js',
  },
  output: {
    path: path.resolve(__dirname, 'salida'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
          },
        ],
      },
    ]
  }
};