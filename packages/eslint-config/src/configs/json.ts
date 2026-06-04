import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_PACKAGE_JSON, GLOB_TSCONFIG } from '../globs'
import { jsonPlugin } from '../plugins'

export const json = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/json/rules',
    files: [GLOB_JSON],
    // `package.json` is handled by `eslint-plugin-package-json` (jsonc parser),
    // and `tsconfig.json` allows comments, so both are excluded here.
    ignores: [GLOB_PACKAGE_JSON, ...GLOB_TSCONFIG],
    language: 'json/json',
    plugins: {
      json: jsonPlugin
    },
    rules: {
      ...jsonPlugin.configs.recommended.rules,

      ...overrides
    }
  },
  {
    name: 'mcdougald/jsonc/rules',
    files: [GLOB_JSONC, ...GLOB_TSCONFIG],
    language: 'json/jsonc',
    plugins: {
      json: jsonPlugin
    },
    rules: {
      ...jsonPlugin.configs.recommended.rules,

      ...overrides
    }
  },
  {
    name: 'mcdougald/json5/rules',
    files: [GLOB_JSON5],
    language: 'json/json5',
    plugins: {
      json: jsonPlugin
    },
    rules: {
      ...jsonPlugin.configs.recommended.rules,

      ...overrides
    }
  }
]
