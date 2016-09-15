/**
 * [SERVER] ESLint configuration file
 * View rules and package notes at:
 * https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
 *
 * Styleguide Outline: https://github.com/airbnb/javascript
 */
module.exports = {
  "env": {
    "node": true
  },

  "parserOptions": {
      "sourceType": "script" // This fixes issue with "use strict" for node
  },

  // Currently using airbnb's linting rules with a few overrides below
  "extends": "airbnb",

  "rules": {
    "max-len": ["error", { "code": 120, "tabWidth": 2, "ignoreUrls": true }],
    "strict": ["error", "safe"]
  }
};
