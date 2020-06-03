module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-restricted-globals': 'off',
    'no-alert': 'off',
    'no-await-in-loop': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
  },
};
