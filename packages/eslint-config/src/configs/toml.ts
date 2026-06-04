import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_TOML } from '../globs'
import { tomlPlugin } from '../plugins'

export const toml = (overrides?: RuleOverrides): FlatConfig[] => [
  ...tomlPlugin.configs['flat/recommended'],
  {
    name: 'mcdougald/toml/rules',
    files: [GLOB_TOML],
    rules: {
      ...overrides
    }
  }
]
