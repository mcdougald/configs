# Trev's NodeJS Configs

Personal configurations for supporting Trevor McDougald's projects, thanks for viewing!

This monorepo contains shared configuration packages for various tools used across projects, including ESLint, Prettier, TypeScript, Biome, and Tailwind CSS. These configurations are designed to enforce consistent code style, formatting, and best practices across all my projects.

## Contact

### Trevor McDougald

- 📧 **Email**: [mcdougald.job@gmail.com](mailto:mcdougald.job@gmail.com)
- 🐙 **GitHub**: [@mcdougald](https://github.com/mcdougald)
- 💼 **LinkedIn**: [Trevor McDougald](https://linkedin.com/in/trevor-mcdougald)
- 🌐 **Website**: [trev.fyi](https://trevormcdougald.com)

Feel free to reach out for:

- Questions about these configurations
- Collaboration opportunities
- General development discussions
- Feedback on the packages

## Table of Contents

- [Trev's NodeJS Configs](#trevs-nodejs-configs)
  - [Contact](#contact)
    - [Trevor McDougald](#trevor-mcdougald)
  - [Table of Contents](#table-of-contents)
  - [Packages](#packages)
    - [@mcdougald/eslint-config](#mcdougaldeslint-config)
    - [@mcdougald/prettier-config](#mcdougaldprettier-config)
    - [@mcdougald/typescript-config](#mcdougaldtypescript-config)
    - [@mcdougald/biome-config](#mcdougaldbiome-config)
    - [@mcdougald/tailwindcss-config](#mcdougaldtailwindcss-config)
  - [Getting Started](#getting-started)
    - [Quick Setup Examples](#quick-setup-examples)
  - [Contributing](#contributing)
  - [Credits](#credits)
  - [License](#license)

## Packages

### [@mcdougald/eslint-config](packages/eslint-config/README.md)

A comprehensive ESLint configuration that enforces consistent code style and best practices across JavaScript and TypeScript projects.

```bash
pnpm add -D @mcdougald/eslint-config
```

### [@mcdougald/prettier-config](packages/prettier-config/README.md)

A shared Prettier configuration to ensure consistent code formatting across all projects.

```bash
pnpm add -D @mcdougald/prettier-config prettier-plugin-packagejson
```

### [@mcdougald/typescript-config](packages/typescript-config/README.md)

A shared TypeScript configuration to standardize TypeScript compiler options and ensure consistent type checking.

```bash
pnpm add -D @mcdougald/typescript-config
```

### [@mcdougald/biome-config](packages/biome-config/README.md)

A modern Biome configuration for fast formatting and linting, providing an alternative to ESLint and Prettier with better performance.

```bash
pnpm add -D @mcdougald/biome-config
```

### [@mcdougald/tailwindcss-config](packages/tailwindcss-config/README.md)

A comprehensive Tailwind CSS configuration with modern plugins and utilities for React applications. Includes optimized content paths, dark mode support, custom animations, and essential plugins for forms, typography, and aspect ratios.

**Features:**

- 🎨 **Modern Plugins**: Forms, typography, aspect ratio, and motion animations
- 🌙 **Dark Mode**: Class-based dark mode support
- 📱 **Responsive Design**: Custom breakpoints including extra small screens
- 🎭 **Animations**: Built-in animation utilities and motion effects
- ⚡ **Performance**: Optimized content paths for better build performance
- 🎯 **React Ready**: Pre-configured for React and Next.js applications

```bash
pnpm add -D @mcdougald/tailwindcss-config
```

## Getting Started

Each package in this monorepo can be installed independently. Choose the configurations that best fit your project needs:

- **ESLint + Prettier + TypeScript**: Traditional setup with maximum compatibility
- **Biome**: Modern alternative with better performance and fewer dependencies
- **Tailwind CSS**: Comprehensive styling configuration with modern plugins and utilities

### Quick Setup Examples

**For a React/Next.js project:**

```bash
pnpm add -D @mcdougald/eslint-config @mcdougald/prettier-config @mcdougald/typescript-config @mcdougald/tailwindcss-config
```

**For a modern project with Biome:**

```bash
pnpm add -D @mcdougald/biome-config @mcdougald/typescript-config @mcdougald/tailwindcss-config
```

## Contributing

While these are personal configurations, I welcome feedback and suggestions! If you find issues or have ideas for improvements:

1. **Open an issue** on [GitHub](https://github.com/mcdougald/configs/issues)
2. **Submit a pull request** with your proposed changes
3. **Reach out directly** using the [contact information above](#contact)

## Credits

This project is inspired by the excellent work from:

- [antfu/eslint-config](https://github.com/antfu/eslint-config)
- [sxzz/eslint-config](https://github.com/sxzz/eslint-config)
- [nelsonlaidev/config](https://github.com/nelsonlaidev/config)

## License

This project is licensed under the [MIT License](LICENSE).
