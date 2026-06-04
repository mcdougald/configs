import type { FlatConfig, RuleOverrides } from '../types'

import { packageJsonPlugin } from '../plugins'

export const packageJson = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    // Spreads `files` (`**/package.json`), `plugins` and the jsonc parser from
    // the plugin's recommended config.
    ...packageJsonPlugin.configs.recommended,
    name: 'mcdougald/package-json/rules',
    rules: {
      ...packageJsonPlugin.configs.recommended.rules,

      ...overrides
    }
  }
]
