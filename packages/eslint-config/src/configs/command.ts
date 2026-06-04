import type { FlatConfig } from '../types'

import { GLOB_SRC } from '../globs'
import { commandPlugin } from '../plugins'

export const command = (): FlatConfig[] => [
  {
    ...commandPlugin(),
    name: 'mcdougald/command/rules',
    files: [GLOB_SRC]
  }
]
