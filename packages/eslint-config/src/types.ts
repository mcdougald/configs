import type { Linter } from 'eslint'

/**
 * ESLint configuration options.
 */
export type ConfigOptions = {
  /**
   * A list of file paths or glob patterns that ESLint should ignore.
   */
  ignores?: string[]
  /**
   * Enable additional ESLint rules optimized for Next.js projects.
   * This option also automatically enables React rules.
   */
  nextjs?: boolean
  /**
   * Override specific ESLint rules for each plugin.
   */
  overrides?: Overrides
  /**
   * Glob patterns for your Playwright test files.
   * When provided, ESLint rules for Playwright will be enabled.
   */
  playwrightGlob?: string
  /**
   * Enable additional ESLint rules optimized for React projects.
   */
  react?: boolean
  /**
   * Path to the main entry point of your Tailwind CSS setup.
   * Enabling this also turns on ESLint rules related to Tailwind CSS.
   */
  tailwindEntryPoint?: string
  /**
   * The absolute or relative path to the root directory that contains
   * the `tsconfig.json`. Used to resolve TypeScript configuration.
   */
  tsconfigRootDir?: string
  /**
   * Glob patterns for your Vitest test files.
   * When provided, ESLint rules for Vitest will be enabled.
   */
  vitestGlob?: string
}

export type RuleOverrides = Linter.Config['rules']

export type Overrides = {
  comments?: RuleOverrides
  /**
   * Rules for CSS files via `@eslint/css`.
   */
  css?: RuleOverrides
  deMorgan?: RuleOverrides
  imports?: RuleOverrides
  importSort?: RuleOverrides
  javascript?: RuleOverrides
  jsdoc?: RuleOverrides
  /**
   * Rules for JSON, JSONC and JSON5 files via `@eslint/json`.
   */
  json?: RuleOverrides
  jsx?: RuleOverrides
  /**
   * Rules for Markdown files via `@eslint/markdown`.
   */
  markdown?: RuleOverrides
  nextjs?: RuleOverrides
  node?: RuleOverrides
  /**
   * Rules for `package.json` via `eslint-plugin-package-json`.
   */
  packageJson?: RuleOverrides
  /**
   * Rules for object/type/enum/JSX-prop sorting via `eslint-plugin-perfectionist`.
   */
  perfectionist?: RuleOverrides
  playwright?: RuleOverrides
  prettier?: RuleOverrides
  react?: RuleOverrides
  /**
   * Rules for `eslint-plugin-react-you-might-not-need-an-effect` (enabled with React).
   */
  reactYouMightNotNeedAnEffect?: RuleOverrides
  regexp?: RuleOverrides
  sonarjs?: RuleOverrides
  tailwindcss?: RuleOverrides
  /**
   * Rules for TOML files via `eslint-plugin-toml`.
   */
  toml?: RuleOverrides
  typescript?: RuleOverrides
  unicorn?: RuleOverrides
  vitest?: RuleOverrides
  /**
   * Rules for YAML files via `eslint-plugin-yml`.
   */
  yaml?: RuleOverrides
}

export type FlatConfig = Linter.Config
