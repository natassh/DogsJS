module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    PUBLIC_DIR: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    // https://eslint.org/docs/rules/
    "no-console": "error",
    quotes: ["error", "single"], // enforce the consistent use of either backticks, double, or single quotes (quotes)
    semi: ["error", "always"], // require or disallow semicolons instead of ASI (semi)
    "no-unused-vars": "off"
  }
};
