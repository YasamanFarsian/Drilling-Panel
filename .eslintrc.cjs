module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'import', 'unused-imports'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['*.js'],
  // ignore files outside src
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/react-in-jsx-scope': 'off',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: ['error', 'always'],
    'react/prop-types': 'off',
    'no-console': [
      'warn',
      {
        allow: ['error'],
      },
    ],
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: ['>', '"', '}'],
      },
    ],
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    // Sort imports
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    // Format imports
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/no-duplicates': 'warn',
    'import/no-useless-path-segments': 'warn',
    // Rules regarding minimize code complexity
    'no-param-reassign': ['error'],
    'max-lines': [
      'warn',
      {
        max: 200,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-lines-per-function': [
      'warn',
      {
        max: 30,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    complexity: [
      'warn',
      {
        max: 5,
      },
    ],
    'max-nested-callbacks': [
      'warn',
      {
        max: 2,
      },
    ],
    'max-depth': [
      'warn',
      {
        max: 3,
      },
    ],
    'max-params': [
      'warn',
      {
        max: 2,
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}', '**/*.style.{ts,tsx}'],
      rules: {
        complexity: 'off',
        'max-nested-callbacks': 'off',
        'max-depth': 'off',
        'max-params': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
      },
    },
    {
      files: ['use*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};
