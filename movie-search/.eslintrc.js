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
    'func-names': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-globals': 'off',
    'no-unused-vars': 'off',
    'no-restricted-syntax': 'off',
    'class-methods-use-this': 'off',
    'no-mixed-operators': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'default-case': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'no-undef': 'off',
    'no-empty': 'off',
  },
};
