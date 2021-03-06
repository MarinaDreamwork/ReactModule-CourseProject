module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'multiline-ternary': ['off'],
    indent: [0, 2],
    semi: [2, 'always'],
    quotes: ['error', 'single',
      {
        allowTemplateLiterals: true
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'eol-last': 2,
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }
    ]
  }
};
