module.exports = {
  root: true,
  env: { browser: true, es2020: true, es6: true },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:github/recommended',
    'plugin:sonarjs/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', '*.generated.ts'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    'import',
    '@typescript-eslint',
    'github',
    'sonarjs',
    'functional',
  ],
  settings: {
    'import/extensions': ['.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSpacing: true,
        bracketSameLine: false,
        printWidth: 120,
        proseWrap: 'preserve',
        requirePragma: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'preserve',
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
        overrides: [
          {
            files: '*.json',
            options: {
              printWidth: 200,
            },
          },
        ],
      },
      {
        usePrettierrc: false,
      },
    ],
    camelcase: 'off',
    'i18n-text/no-en': 'off',
    'import/no-cycle': ['error'],
    'prefer-const': ['error'],
    'no-undef': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-redeclare': 'off',
    'no-param-reassign': ['error'],
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme'] }],
    'no-return-await': 'off',
    'no-invalid-this': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/prefer-readonly': 'off', // later
    '@typescript-eslint/prefer-readonly-parameter-types': 'off', // later
    '@typescript-eslint/switch-exhaustiveness-check': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/method-signature-style': ['warn', 'property'],
    '@typescript-eslint/no-invalid-this': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'quote-props': ['error', 'consistent'],
    'filenames/match-regex': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        "pathGroups": [
          { "pattern": "./**", "group": "parent" },
          { "pattern": "~/**", "group": "parent" }
        ],
        'newlines-between': 'always'
      },
    ],
    'import/no-unresolved': 'off',
    'import/default': 'off',
    'import/named': 'off',
    'import/no-deprecated': 'warn',
    'import/no-namespace': 'off',
    'import/no-named-as-default-member': 'off',
    'no-restricted-imports': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'github/no-then': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/prefer-single-boolean-return': 'off',
    'sonarjs/no-small-switch': 'off',
    'sonarjs/no-extra-arguments': 'off',
    'sonarjs/cognitive-complexity': 'off',
    'eslint-comments/no-use': 'off',
    'eslint-comments/no-restricted-disable': 'off',
    'import/extensions': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
  },
  parserOptions: {
    project: './tsconfig.json'
  }
}
