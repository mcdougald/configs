import type { FlatConfig, RuleOverrides } from '../types'

import eslint from '@eslint/js'
import globals from 'globals'

import { GLOB_SRC } from '../globs'
import { unusedImportsPlugin } from '../plugins'

export const javascript = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/javascript/setup',
    files: [GLOB_SRC],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        // `globals.browser` already provides `document`, `navigator`, `window`, etc.
        ...globals.browser,
        ...globals.es2025,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      sourceType: 'module'
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error'
    }
  },
  {
    name: 'mcdougald/javascript/rules',
    files: [GLOB_SRC],
    plugins: {
      'unused-imports': unusedImportsPlugin
    },
    rules: {
      ...eslint.configs.recommended.rules,

      // Recommended to disable
      // https://github.com/sweepline/eslint-plugin-unused-imports?tab=readme-ov-file#usage
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],

      ...overrides
    }
  }
]
