import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { nextPlugin } from '../plugins'

export const nextjs = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/nextjs/rules',
    files: [GLOB_SRC],
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      ...overrides
    }
  }
]
