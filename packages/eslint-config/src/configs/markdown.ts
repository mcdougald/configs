import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_MARKDOWN } from '../globs'
import { markdownPlugin } from '../plugins'

// Merge the rules from every entry of the recommended config (currently one).
const recommendedRules = Object.assign({}, ...markdownPlugin.configs.recommended.map((config) => config.rules))

export const markdown = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/markdown/rules',
    files: [GLOB_MARKDOWN],
    // GitHub Flavored Markdown so tables, task lists, etc. are parsed correctly.
    language: 'markdown/gfm',
    plugins: {
      markdown: markdownPlugin
    },
    rules: {
      ...recommendedRules,

      ...overrides
    }
  }
]
