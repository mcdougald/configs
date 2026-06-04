import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { reactHooksConfigs, reactHooksPlugin, reactPlugin, reactYouMightNotNeedAnEffectPlugin } from '../plugins'

export const react = (
  overrides?: RuleOverrides,
  reactYouMightNotNeedAnEffectOverrides?: RuleOverrides
): FlatConfig[] => [
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
  },
  {
    name: 'mcdougald/react/you-might-not-need-an-effect',
    ...reactYouMightNotNeedAnEffectPlugin.configs.recommended,
    files: [GLOB_SRC],
    rules: {
      ...reactYouMightNotNeedAnEffectPlugin.configs.recommended.rules,
      ...reactYouMightNotNeedAnEffectOverrides
    }
  }
]
