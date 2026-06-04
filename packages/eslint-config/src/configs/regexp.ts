import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { regexpPlugin } from '../plugins'

export const regexp = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/regexp/rules',
    files: [GLOB_SRC],
    plugins: {
      regexp: regexpPlugin
    },
    rules: {
      ...regexpPlugin.configs['flat/recommended'].rules,

      ...overrides
    }
  }
]
