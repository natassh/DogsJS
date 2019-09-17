module.exports = {
    syntax: 'postcss-scss',
    plugins: [
      require('postcss-preset-env')({
        stage: 2,
        features: {
          'nesting-rules': true,
          'custom-selectors': true,
        },
      }),
    ],
  };