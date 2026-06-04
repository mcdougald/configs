import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_CSS } from '../globs'
import { cssPlugin } from '../plugins'

export const css = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/css/rules',
    files: [GLOB_CSS],
    language: 'css/css',
    plugins: {
      css: cssPlugin
    },
    rules: {
      ...cssPlugin.configs.recommended.rules,

      ...overrides
    }
  }
]
