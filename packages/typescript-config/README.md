# @mcdougald/typescript-config

Personal TypeScript configurations for Trevor McDougald's projects.

## Installation

```bash
npm i -D @mcdougald/typescript-config
```

Create a `tsconfig.json` file with the following content:

```jsonc
{
  "extends": "@mcdougald/typescript-config/base.json",
  "compilerOptions": {
    // Custom TypeScript configuration options
  }
}
```

### Presets

You can also use predefined presets for your configuration.

- `@mcdougald/typescript-config/base.json`
- `@mcdougald/typescript-config/next.json`
- `@mcdougald/typescript-config/react-library.json`
