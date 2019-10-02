// Info config babel.config.js
// https://babeljs.io/docs/en/configuration#babelconfigjs

module.exports = function(api) {
  api.cache(true);

  // Los presets son las indicaciones que decimos a babel de como debe cambiar el codigo moderno a viejo
  // que debe soportar etc.
  // preset env, indicamos que transpile el codigo de todo el js que esté ya en el standard
  // podemos instalar más presets como todo lo nuevo que está por llegar en los diferentes staged, como staged 2 etc..
  // https://babeljs.io/docs/en/babel-preset-stage-2
  // npm install --save-dev @babel/preset-stage-2
  // si nuestro codigo usa react, debemos instalar un preset para soportar react
  // https://babeljs.io/docs/en/babel-preset-react
  const presets = [
    '@babel/env'
    // "@babel/preset-stage-2"
    // "@babel/preset-react"
  ];
  // Necesitamos instalar este plugin
  // lo dice la documentación https://github.com/babel/babel-loader
  // y su dependencia @babel/runtime que no hace falta configurar
  // npm install --save @babel/runtime @babel/plugin-transform-runtime
  const plugins = ['@babel/plugin-transform-runtime'];

  return {
    presets,
    plugins
  };
};
