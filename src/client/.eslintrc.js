/**
 * [CLIENT] ESLint configuration file
 * View rules and package notes at:
 * https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
 *
 * Styleguide Outline: https://github.com/airbnb/javascript
 */
module.exports = {
    "parser": "babel-eslint",

    "env": {
      "browser": true,
      "es6": true
    },

    "parserOptions": {
        "sourceType": "module"
    },

    // Currently using airbnb's linting rules with a few overrides below
    "extends": "airbnb",

    "rules": {
      "max-len": ["error", {"code": 120, "tabWidth": 2, "ignoreUrls": true}],
      "react/prefer-es6-class": ["warn", "never"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }
};
