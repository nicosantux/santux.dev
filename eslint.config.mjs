import eslint from '@eslint/js'
import eslintPluginNext from '@next/eslint-plugin-next'
import eslintConfigPrettier from 'eslint-config-prettier'
import checkFile from 'eslint-plugin-check-file'
import pluginImport from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tslint from 'typescript-eslint'

export default [
  {
    ignores: ['node_modules', '.next', 'out', 'coverage'],
  },
  // Vanilla ESLint
  {
    rules: {
      ...eslint.configs.recommended.rules,
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-await-in-loop': 'error',
      'no-console': 'error',
      'no-else-return': 'warn',
      'no-implicit-coercion': 'error',
      'no-param-reassign': 'error',
      'no-self-compare': 'error',
      'no-undef-init': 'warn',
      'no-unneeded-ternary': 'error',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-const': 'warn',
      'prefer-object-spread': 'warn',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'warn',
    },
  },
  // Check files
  {
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{js,jsx,ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': ['error', { 'src/**/': 'NEXT_JS_APP_ROUTER_CASE' }],
    },
  },
  // Import order
  {
    plugins: { import: pluginImport },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'warn',
      'import/no-cycle': 'error',
      'import/no-extraneous-dependencies': ['error', { includeTypes: true }],
      'import/no-mutable-exports': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '{next,next/**,react,react-dom,react-dom/**}',
              group: 'builtin',
              position: 'before',
            },
            { pattern: '@/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'internal'],
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
  // Next.js
  {
    plugins: { '@next/next': eslintPluginNext },
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
    },
  },
  // React
  {
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-compiler': eslintPluginReactCompiler,
      'jsx-a11y': pluginJsxA11y,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      'react-compiler/react-compiler': 'error',
      'react/function-component-definition': 'warn',
      'react/hook-use-state': 'error',
      'react/jsx-boolean-value': 'warn',
      'react/jsx-curly-brace-presence': 'warn',
      'react/jsx-fragments': 'warn',
      'react/jsx-no-leaked-render': 'warn',
      'react/jsx-no-target-blank': ['error', { allowReferrer: true }],
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/jsx-sort-props': ['warn', { noSortAlphabetically: false }],
      'react/no-array-index-key': 'warn',
      'react/no-unstable-nested-components': 'error',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'warn',
    },
    settings: { react: { version: 'detect' } },
  },
  // Stylistic
  {
    rules: {
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['singleline-const', 'singleline-let', 'singleline-var'],
          next: ['singleline-const', 'singleline-let', 'singleline-var'],
        },
      ],
    },
  },
  // TypeScript
  ...[
    ...tslint.configs.strictTypeChecked,
    ...tslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: import.meta.dirname,
        },
      },
      rules: {
        '@typescript-eslint/consistent-type-exports': [
          'warn',
          { fixMixedExportsWithInlineTypeSpecifier: true },
        ],
        '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/member-ordering': [
          'error',
          { interfaces: { order: 'natural-case-insensitive' } },
        ],
        '@typescript-eslint/method-signature-style': 'warn',
        '@typescript-eslint/naming-convention': [
          'error',
          { format: ['PascalCase'], selector: ['typeLike', 'enumMember'] },
          {
            custom: {
              match: false,
              regex: '^I[A-Z]|^(Interface|Props|State)$',
            },
            format: ['PascalCase'],
            selector: 'interface',
          },
        ],
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          { ignoreArrowShorthand: true },
        ],
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'warn',
        '@typescript-eslint/no-unnecessary-qualifier': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: false,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/prefer-nullish-coalescing': [
          'error',
          { ignorePrimitives: { bigint: true, boolean: true, number: true, string: true } },
        ],
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
      },
    },
  ],
  // Disable type checked in .js files
  {
    files: ['**/*.{js,cjs,mjs}'],
    ...tslint.configs.disableTypeChecked,
  },
  // Unicorn
  {
    plugins: { unicorn: pluginUnicorn },
    rules: {
      'unicorn/error-message': 'error',
      'unicorn/no-empty-file': 'error',
      'unicorn/prefer-node-protocol': 'warn',
    },
  },
  // Prettier
  eslintConfigPrettier,
]