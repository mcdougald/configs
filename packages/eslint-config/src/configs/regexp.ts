import type { FlatConfig, RuleOverrides } from '../types'

import { regexpPlugin } from '../plugins'

export const regexp = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/regexp/rules',
    plugins: {
      regexp: regexpPlugin
    },
    rules: {
      ...regexpPlugin.configs['flat/recommended'].rules,

      ...overrides
    }
  }
]
