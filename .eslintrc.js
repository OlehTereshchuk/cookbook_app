module.exports = {
  extends: ['airbnb', '@mate-academy/eslint-config'],
  env: {
    es6: true,
    browser: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'no-console': 'off',
    "no-param-reassign": 0,
    "jsx-a11y/no-template-curly-in-string": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "no-shadow": ["error", { "builtinGlobals": false }],
    "react/destructuring-assignment": 0,
    "camelcase": ["error", { "properties": "never", "ignoreDestructuring": true }],
  }
};
