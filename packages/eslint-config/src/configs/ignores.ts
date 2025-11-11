import type { FlatConfig } from '../types'

export const ignores = (userIgnores: string[] = []): FlatConfig[] => [
  {
    name: 'mcdougald/ignores',
    ignores: [...userIgnores]
  }
]
