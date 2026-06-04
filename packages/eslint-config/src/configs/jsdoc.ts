import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { jsdocPlugin } from '../plugins'

export const jsdoc = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/jsdoc/rules',
    files: [GLOB_SRC],
    plugins: {
      jsdoc: jsdocPlugin
    },
    rules: {
      ...jsdocPlugin.configs['flat/recommended'].rules,

      ...overrides
    }
  }
]
