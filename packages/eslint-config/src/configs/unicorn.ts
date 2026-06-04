import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { unicornPlugin } from '../plugins'

export const unicorn = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/unicorn/rules',
    files: [GLOB_SRC],
    plugins: {
      unicorn: unicornPlugin
    },
    rules: {
      ...unicornPlugin.configs.recommended.rules,

      // Too opinionated
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',

      ...overrides
    }
  }
]
