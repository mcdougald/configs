import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { reactHooksConfigs, reactHooksPlugin, reactPlugin } from '../plugins'

export const react = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/react/rules',
    files: [GLOB_SRC],
    plugins: {
      ...reactPlugin.configs.all.plugins,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      ...reactPlugin.configs.all.rules,
      ...reactHooksConfigs['recommended-latest'].rules,

      // `@eslint-react/naming-convention/filename` was removed in v2+. Use
      // `unicorn/filename-case` from the unicorn config for filename linting.

      // Unnecessary
      '@eslint-react/no-array-index-key': 'off',

      ...overrides
    }
  }
]
