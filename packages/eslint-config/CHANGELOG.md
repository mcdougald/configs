# @mcdougald/eslint-config

## 2.0.0

### Major Changes

- Upgrade `@biomejs/biome` to `^2.4.12`, `eslint` to `^10.2.1`, and `typescript` to `^6.0.3`.
  - **`@mcdougald/biome-config`**: bump `@biomejs/biome` to `2.4.12` and update all `$schema` references to the matching schema URL.
  - **`@mcdougald/eslint-config`** (**breaking**): bump `eslint` peer dependency from `>=9.0.0` to `>=10.0.0`. Major bumps for many plugins (`@eslint-react/eslint-plugin` → `4.x`, `@next/eslint-plugin-next` → `16.x`, `eslint-plugin-react-hooks` → `7.x`, `eslint-plugin-sonarjs` → `4.x`, `eslint-plugin-jsdoc` → `62.x`, `eslint-plugin-unicorn` → `64.x`, `eslint-plugin-regexp` → `3.x`, `eslint-plugin-simple-import-sort` → `13.x`, `eslint-plugin-better-tailwindcss` → `4.x`, `eslint-plugin-de-morgan` → `2.x`, `globals` → `17.x`). Source adapted to new plugin APIs (React Hooks v7 config shape, SonarJS v4 named configs export, removed rules in `@eslint-react` v4). Build output moves to stable `dist/index.mjs` + `dist/index.d.mts` via `tsdown` upgrade.
  - **`@mcdougald/typescript-config`**: bump `typescript` dev dependency to `6.0.3`.

## 1.0.0

### Major Changes

- 4168b2a: Re-configure some rules
  - Remove `n/prefer-global/buffer`
  - Remove `n/prefer-global/process`
  - Disable `@eslint-react/no-complex-conditional-rendering`
  - Disable `@eslint-react/no-array-index-key`
  - Disable `@typescript-eslint/no-floating-promises`
  - Disable `@typescript-eslint/no-unsafe-member-access`
  - Disable `@typescript-eslint/no-unsafe-assignment`
  - Disable `@typescript-eslint/no-non-null-assertion`
  - Disable `unicorn/no-null`

- 4168b2a: Update node plugin rules

### Minor Changes

- 4168b2a: Disable `@typescript-eslint/consistent-type-definitions` rule
- 4168b2a: Make tsconfigRootDir optional
- 4168b2a: Allow rule overrides for each plugin in ESLint config
- 4168b2a: Disable `@eslint-react/avoid-shorthand-boolean` rule
- 4168b2a: Remove `eslint-plugin-react-refresh` plugin
- 4168b2a: Configure some rules
  - `@eslint-community/eslint-comments/no-use` allows `eslint-disable-next-line`
  - `@eslint-react/naming-convention/filename` enforces kebab-case
  - `@eslint-react/avoid-shorthand-fragment` is turned off
  - `react-refresh/only-export-components` allows some Next.js specific export names

### Patch Changes

- 4168b2a: Remove `consistent-type-specifier-style` rule from import-lite
- 4168b2a: `eslint-plugin-better-tailwindcss` setting name correction
- 4168b2a: Remove unnecessary nullish coalescing
- e0ea602: Update package.json to match ESM-only style
- 4168b2a: Make all configs to be functions
  - Move types to types.ts for better organization
  - Rename `types.d.ts` to `global.d.ts`

- 4168b2a: Enable rules manually for better-tailwindcss

## 0.0.2

### Patch Changes

- 714f933: Fix type errors
  - Add documentation to ESLint `Option` type
  - Export useful globs
  - Remove `FlatConfigComposer` and renaming plugins
  - Remove duplicated imports in ESLint plugin declaration
  - Update README instructions

## 0.0.1

### Patch Changes

- 03bd2f6: Initial release
