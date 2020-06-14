module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    eqeqeq: 'off',
    'no-restricted-syntax': 'off',
    'no-unused-vars': 'off',
    'no-empty': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'array-callback-return': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
  },
};
