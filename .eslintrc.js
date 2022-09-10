module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  ignorePatterns: ['__tests__/**', 'dist/**'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['error', { args: 'none' }],
    'no-console': 'off',
    curly: 'error',
    eqeqeq: 'error',
    'no-throw-literal': 'error',
    strict: 'error',
    'no-var': 'error',
    'dot-notation': 'error',
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-use-before-define': 'error',
    'no-useless-call': 'error',
    'no-with': 'error',
    'operator-linebreak': 'error',
    yoda: 'error',
    'quote-props': ['error', 'as-needed']
  }
};
