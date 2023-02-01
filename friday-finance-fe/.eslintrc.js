module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier', 'plugin:storybook/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': ['error', {
      semi: false,
      singleQuote: true,
      trailingComma: 'none'
    }],
    'vue/multi-word-component-names': ['off'],
    'vue/no-reserved-component-names': ['off'],
    'vue/script-setup-uses-vars': ['error'],
    'no-unused-vars': ['error']
  }
};