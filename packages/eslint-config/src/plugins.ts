import type { ESLint, Linter } from 'eslint'

import reactHooksPluginRaw from 'eslint-plugin-react-hooks'

export { default as commentsPlugin } from '@eslint-community/eslint-plugin-eslint-comments'
export { default as reactPlugin } from '@eslint-react/eslint-plugin'
export { default as nextPlugin } from '@next/eslint-plugin-next'
export { default as typescriptPlugin } from '@typescript-eslint/eslint-plugin'
export { default as vitestPlugin } from '@vitest/eslint-plugin'
export { default as tailwindcssPlugin } from 'eslint-plugin-better-tailwindcss'
export { default as commandPlugin } from 'eslint-plugin-command/config'
export { default as deMorganPlugin } from 'eslint-plugin-de-morgan'
export { default as importLitePlugin } from 'eslint-plugin-import-lite'
export { default as jsdocPlugin } from 'eslint-plugin-jsdoc'
export { default as jsxA11yPlugin } from 'eslint-plugin-jsx-a11y'
export { default as nodePlugin } from 'eslint-plugin-n'
export { default as playwrightPlugin } from 'eslint-plugin-playwright'
export { default as prettierPlugin } from 'eslint-plugin-prettier'
export { default as prettierPluginRecommended } from 'eslint-plugin-prettier/recommended'
export { default as regexpPlugin } from 'eslint-plugin-regexp'
export { default as importSortPlugin } from 'eslint-plugin-simple-import-sort'
export { configs as sonarjsConfigs, default as sonarjsPlugin } from 'eslint-plugin-sonarjs'
export { default as unicornPlugin } from 'eslint-plugin-unicorn'
export { default as unusedImportsPlugin } from 'eslint-plugin-unused-imports'

// `eslint-plugin-react-hooks` v7 augments `configs` with a nested `flat` key
// that is not assignable to ESLint 10's `Plugin.configs` index signature.
export const reactHooksPlugin = reactHooksPluginRaw as unknown as ESLint.Plugin
export const reactHooksConfigs = reactHooksPluginRaw.configs as {
  recommended: { plugins: string[]; rules: Linter.RulesRecord }
  'recommended-latest': { plugins: string[]; rules: Linter.RulesRecord }
}
