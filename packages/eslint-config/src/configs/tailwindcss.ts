import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { tailwindcssPlugin } from '../plugins'

export const tailwindcss = (entryPoint: string, overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'mcdougald/tailwindcss/rules',
    files: [GLOB_SRC],
    plugins: {
      'better-tailwindcss': tailwindcssPlugin
    },
    rules: {
      'better-tailwindcss/enforce-consistent-class-order': 'error',
      'better-tailwindcss/enforce-consistent-important-position': 'error',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
      'better-tailwindcss/enforce-consistent-variant-order': 'error',
      'better-tailwindcss/enforce-shorthand-classes': 'error',
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-unnecessary-whitespace': 'error',
      // Renamed from `no-unregistered-classes` in better-tailwindcss v4.5.
      'better-tailwindcss/no-unknown-classes': 'error',

      ...overrides
    },
    settings: {
      'better-tailwindcss': {
        entryPoint
      }
    }
  }
]
