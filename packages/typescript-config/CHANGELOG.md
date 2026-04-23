# @mcdougald/typescript-config

## 0.0.4

### Patch Changes

- Upgrade `@biomejs/biome` to `^2.4.12`, `eslint` to `^10.2.1`, and `typescript` to `^6.0.3`.
  - **`@mcdougald/biome-config`**: bump `@biomejs/biome` to `2.4.12` and update all `$schema` references to the matching schema URL.
  - **`@mcdougald/eslint-config`** (**breaking**): bump `eslint` peer dependency from `>=9.0.0` to `>=10.0.0`. Major bumps for many plugins (`@eslint-react/eslint-plugin` → `4.x`, `@next/eslint-plugin-next` → `16.x`, `eslint-plugin-react-hooks` → `7.x`, `eslint-plugin-sonarjs` → `4.x`, `eslint-plugin-jsdoc` → `62.x`, `eslint-plugin-unicorn` → `64.x`, `eslint-plugin-regexp` → `3.x`, `eslint-plugin-simple-import-sort` → `13.x`, `eslint-plugin-better-tailwindcss` → `4.x`, `eslint-plugin-de-morgan` → `2.x`, `globals` → `17.x`). Source adapted to new plugin APIs (React Hooks v7 config shape, SonarJS v4 named configs export, removed rules in `@eslint-react` v4). Build output moves to stable `dist/index.mjs` + `dist/index.d.mts` via `tsdown` upgrade.
  - **`@mcdougald/typescript-config`**: bump `typescript` dev dependency to `6.0.3`.

## 0.0.3

### Patch Changes

- e0ea602: Update README

## 0.0.2

### Patch Changes

- 714f933: Update README

## 0.0.1

### Patch Changes

- 03bd2f6: Initial release
