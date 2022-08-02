module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    semi: [2, 'always'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }]
  },
  plugins: ['react', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:prettier/recommended'
  ]
};
