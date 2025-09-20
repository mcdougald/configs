# @mcdougald/biome-config

A comprehensive Biome configuration package providing optimized linting, formatting, and code organization for modern JavaScript/TypeScript projects.

## Features

- 🚀 **Fast & Modern** - Built on Biome's Rust-based engine for lightning-fast performance
- 🎯 **Multiple Presets** - Tailored configurations for different project types
- 🔧 **Comprehensive Rules** - Carefully curated rule sets for code quality and consistency
- 📦 **Modular Design** - Mix and match different configuration modules
- 🎨 **Smart Formatting** - Intelligent code formatting with import organization
- ♿ **Accessibility Focus** - Built-in a11y rules and best practices
- 🔒 **Security Aware** - Security-focused linting rules
- ⚛️ **React Optimized** - Specialized rules for React applications

## Installation

```bash
pnpm add @mcdougald/biome-config
```

## Available Configurations

### Core Configurations

#### `formatter.jsonc` - Formatter Configuration

Comprehensive formatting rules with smart import organization:

```json
{
  "extends": ["@mcdougald/biome-config/formatter"]
}
```

**Features:**

- 2-space indentation with LF line endings
- Single quotes for consistency
- Smart import organization with grouped imports
- CSS Modules support
- JSON with comments support

#### `linter.jsonc` - Linter Configuration

Advanced linting rules with React and accessibility focus:

```json
{
  "extends": ["@mcdougald/biome-config/linter"]
}
```

**Features:**

- Accessibility (a11y) rules
- React-specific linting
- Security-focused rules
- Performance optimizations
- Code complexity detection

### Project-Specific Configurations

#### `library.json` - Library Development

Optimized for building reusable libraries:

```json
{
  "extends": ["@mcdougald/biome-config/library"]
}
```

**Features:**

- Tab indentation for library code
- Strict type checking
- No default exports enforcement
- Comprehensive error checking

#### `next.json` - Next.js Applications

Specialized for Next.js projects:

```json
{
  "extends": ["@mcdougald/biome-config/next"]
}
```

**Features:**

- Next.js specific file handling
- App Router support
- Middleware file configuration
- Enhanced accessibility rules

#### `react-internal.json` - Internal React Projects

For internal React applications:

```json
{
  "extends": ["@mcdougald/biome-config/react-internal"]
}
```

**Features:**

- Double quotes for JSX
- Template literal enforcement
- React-specific optimizations

#### `overrides.jsonc` - Smart Overrides

Intelligent rule overrides for specific file types:

```json
{
  "extends": ["@mcdougald/biome-config/overrides"]
}
```

**Features:**

- Config file handling
- Framework-specific overrides
- Generated file exclusions
- Default export exceptions

## Usage

### Basic Setup

Create a `biome.json` file in your project root:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "extends": ["@mcdougald/biome-config/formatter", "@mcdougald/biome-config/linter"]
}
```

### Next.js Project

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "extends": [
    "@mcdougald/biome-config/formatter",
    "@mcdougald/biome-config/linter",
    "@mcdougald/biome-config/next",
    "@mcdougald/biome-config/overrides"
  ]
}
```

### Library Development

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "extends": ["@mcdougald/biome-config/library"]
}
```

### React Internal Application

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "extends": [
    "@mcdougald/biome-config/formatter",
    "@mcdougald/biome-config/linter",
    "@mcdougald/biome-config/react-internal",
    "@mcdougald/biome-config/overrides"
  ]
}
```

## Key Features

### Smart Import Organization

The formatter configuration includes intelligent import organization:

```typescript
// Automatically organizes imports in this order:
// 1. Node built-ins
// 2. React and React Router
// 3. Third-party packages (grouped by category)
// 4. Internal components and pages
// 5. Utilities and helpers
// 6. Local files

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { debounce } from 'use-debounce'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/date'
import './styles.css'
```

### Accessibility Rules

Comprehensive accessibility linting:

- `useButtonType` - Ensures buttons have proper type attributes
- `useKeyWithClickEvents` - Requires keyboard handlers for click events
- `useValidAnchor` - Validates anchor tag usage
- `noBlankTarget` - Prevents security issues with blank targets

### React-Specific Rules

Optimized for React development:

- `useHookAtTopLevel` - Ensures hooks are called at component top level
- `useExhaustiveDependencies` - Validates useEffect dependencies
- `useJsxKeyInIterable` - Requires keys in mapped elements
- `noChildrenProp` - Warns about children prop usage
- `noVoidElementsWithChildren` - Prevents void elements with children

### Security Rules

Security-focused linting:

- `noDangerouslySetInnerHtml` - Warns about dangerous HTML injection
- `noBlankTarget` - Prevents security vulnerabilities
- `noUndeclaredDependencies` - Ensures all dependencies are declared

### Performance Rules

Code performance optimizations:

- `noNamespaceImport` - Configurable namespace import warnings
- `noExcessiveCognitiveComplexity` - Detects overly complex code
- `noUselessFragments` - Removes unnecessary React fragments

## Configuration Details

### Formatter Settings

```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80,
    "lineEnding": "lf",
    "formatWithErrors": false
  }
}
```

### JavaScript/TypeScript Settings

```json
{
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "single",
      "trailingCommas": "all",
      "semicolons": "always",
      "arrowParentheses": "always"
    }
  }
}
```

### File Handling

```json
{
  "files": {
    "ignore": [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/build/**",
      "**/.cache/**",
      "coverage/**"
    ]
  }
}
```

## Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "format": "biome format --write .",
    "format:check": "biome format .",
    "lint": "biome lint .",
    "lint:fix": "biome lint --write .",
    "check": "biome check .",
    "check:fix": "biome check --write ."
  }
}
```

## IDE Integration

### VS Code

Install the Biome extension:

```bash
code --install-extension biomejs.biome
```

### Cursor

The configuration works seamlessly with Cursor's built-in Biome support.

## Migration from ESLint/Prettier

This configuration can replace both ESLint and Prettier:

1. Remove ESLint and Prettier dependencies
2. Add Biome configuration
3. Update your scripts to use Biome commands
4. Configure your IDE to use Biome

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by [Trevor McDougald](https://github.com/mcdougald/)
