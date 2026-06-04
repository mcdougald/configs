# @mcdougald/eslint-config

Personal, modern, composable ESLint flat config for Trevor McDougald's projects.

Requires ESLint `>=10` and uses the flat config format.

## Installation

```bash
npm i -D @mcdougald/eslint-config
```

Create an `eslint.config.ts` file with the following content:

```js
import { defineConfig } from '@mcdougald/eslint-config'

export default defineConfig({
  // Custom ESLint configuration options
})
```

## What's included

These run automatically out of the box:

- **JavaScript / TypeScript** — `@eslint/js`, `typescript-eslint` (strict + stylistic, type-checked), `unused-imports`
- **Imports** — `simple-import-sort`, `import-lite`
- **Code quality** — `sonarjs`, `unicorn`, `de-morgan`, `regexp`, `eslint-comments`, `n` (Node), `jsdoc`, `command`
- **Sorting** — `perfectionist` (object types, interfaces, enums, JSX props, unions, etc.; import/export sorting is delegated to `simple-import-sort`)
- **Data & document files** — JSON / JSONC / JSON5 (`@eslint/json`), `package.json` (`eslint-plugin-package-json`), YAML (`eslint-plugin-yml`), TOML (`eslint-plugin-toml`), CSS (`@eslint/css`), Markdown (`@eslint/markdown`, GitHub Flavored)
- **Formatting** — `prettier` (always applied last)

Enabled on demand (auto-detected, or via options):

- **React** — `@eslint-react`, `react-hooks`, `jsx-a11y`, `react-you-might-not-need-an-effect`
- **Next.js** — `@next/next`
- **Tailwind CSS** — `eslint-plugin-better-tailwindcss`
- **Vitest** / **Playwright**

> React rules auto-enable when `react` is installed; Next.js rules when `next` is installed. Use the options below to override detection.

### Options

```ts
type Options = {
  // Optional — root directory containing tsconfig.json (defaults to process.cwd())
  tsconfigRootDir?: string
  // Optional — enable React-specific rules (auto-detected from installed `react`)
  react?: boolean
  // Optional — enable Next.js-specific rules (auto-detected from installed `next`; also enables React)
  nextjs?: boolean
  // Optional — entry point for Tailwind CSS (also enables tailwindcss rules)
  tailwindEntryPoint?: string
  // Optional — glob for Vitest test files (also enables vitest rules)
  vitestGlob?: string
  // Optional — glob for Playwright test files (also enables playwright rules)
  playwrightGlob?: string
  // Optional — additional files/globs to ignore
  ignores?: string[]
  // Optional — override rules per plugin (see `Overrides` in the type definitions)
  overrides?: Overrides
}
```

### Overriding rules

Every config group accepts rule overrides via the `overrides` option, keyed by group name:

```ts
import { defineConfig } from '@mcdougald/eslint-config'

export default defineConfig({
  overrides: {
    typescript: {
      '@typescript-eslint/no-explicit-any': 'off'
    },
    perfectionist: {
      'perfectionist/sort-objects': 'error'
    },
    json: {
      'json/no-empty-keys': 'off'
    }
  }
})
```

Available override keys: `javascript`, `typescript`, `sonarjs`, `unicorn`, `deMorgan`, `regexp`,
`comments`, `node`, `jsdoc`, `imports`, `importSort`, `jsx`, `perfectionist`, `json`, `packageJson`,
`yaml`, `toml`, `css`, `markdown`, `vitest`, `playwright`, `react`, `reactYouMightNotNeedAnEffect`,
`nextjs`, `tailwindcss`, `prettier`.
