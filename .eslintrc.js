module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'prettier/prettier': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '_' }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
