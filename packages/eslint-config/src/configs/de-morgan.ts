import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { deMorganPlugin } from '../plugins'

export const deMorgan = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/de-morgan/rules',
    files: [GLOB_SRC],
    plugins: {
      'de-morgan': deMorganPlugin
    },
    rules: {
      ...deMorganPlugin.configs.recommended.rules,

      ...overrides
    }
  }
]
