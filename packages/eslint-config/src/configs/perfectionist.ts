import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { perfectionistPlugin } from '../plugins'

export const perfectionist = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/perfectionist/rules',
    files: [GLOB_SRC],
    plugins: {
      perfectionist: perfectionistPlugin
    },
    rules: {
      ...perfectionistPlugin.configs['recommended-natural'].rules,

      // Import/export ordering is owned by `eslint-plugin-simple-import-sort`.
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-named-exports': 'off',

      // Too disruptive — declaration and member order frequently carries
      // meaning (e.g. flat-config object shape, class lifecycle order).
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-modules': 'off',
      'perfectionist/sort-classes': 'off',

      ...overrides
    }
  }
]
