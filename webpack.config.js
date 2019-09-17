const path = require('path');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  mode: process.env.mode || 'development',
  entry: {
    natacha: './src/pages/home.js',
    // ['eventos-aaa']: './src/pages/event.js',
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
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssPresetEnv({
                stage: 2,
                features: {
                  'nesting-rules': true,
                  'custom-selectors': true,
                },
              })
            ]
          } }
        ],
      },
    ]
  },
  plugins: [
    new Serve({
        "host": "localhost",
        "port": 3001,
        "hmr": true,
        "liveReload": true,
        "open": true
      })
  ],
};