import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_YAML } from '../globs'
import { yamlPlugin } from '../plugins'

export const yaml = (overrides?: RuleOverrides): FlatConfig[] => [
  ...yamlPlugin.configs['flat/recommended'],
  // Disable stylistic rules that conflict with Prettier's YAML formatting.
  ...yamlPlugin.configs['flat/prettier'],
  {
    name: 'mcdougald/yaml/rules',
    files: [GLOB_YAML],
    rules: {
      ...overrides
    }
  }
]
