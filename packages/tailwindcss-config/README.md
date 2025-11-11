# @mcdougald/tailwindcss-config

A comprehensive Tailwind CSS configuration with modern plugins and utilities for React applications.

## Features

- 🎨 **Modern Design System** - Pre-configured color palette, typography, and spacing
- 🚀 **Performance Optimized** - Optimized content paths and purging
- 🌙 **Dark Mode Support** - Built-in dark mode with class-based switching
- 🎭 **Rich Animations** - 20+ custom animations and keyframes
- 📱 **Responsive Design** - Extended breakpoints including extra small screens
- 🎯 **Plugin Integration** - Pre-configured with essential Tailwind plugins
- 🎪 **Motion Support** - Advanced motion and transition utilities

## Installation

```bash
pnpm add @mcdougald/tailwindcss-config
```

## Usage

### Basic Setup

Create a `tailwind.config.js` file in your project root:

```javascript
import config from '@mcdougald/tailwindcss-config'

export default config
```

### TypeScript Support

For TypeScript projects, create a `tailwind.config.ts` file:

```typescript
import type { Config } from 'tailwindcss'
import config from '@mcdougald/tailwindcss-config'

export default config satisfies Config
```

### Next.js Integration

For Next.js projects, update your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('@mcdougald/tailwindcss-config'),
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

## Included Plugins

- **@tailwindcss/forms** - Better form styling defaults
- **@tailwindcss/typography** - Beautiful typographic defaults
- **@tailwindcss/aspect-ratio** - Aspect ratio utilities
- **tailwindcss-animate** - Animation utilities
- **tailwindcss-motion** - Motion and transition utilities

## Custom Features

### Extended Breakpoints

```css
/* Extra small screens */
@media (min-width: 380px) { /* xs */ }
```

### Custom Color Palette

The configuration includes a comprehensive gray scale and semantic colors:

- **Primary Colors**: Blue, Pink, Green, Red, Yellow
- **Gray Scale**: 15 shades from dark (100) to light (35)
- **Semantic Colors**: Primary, Secondary, Muted, Accent, Background

### Custom Animations

20+ custom animations including:

- `ellipsis` - Loading dots animation
- `heartbeat` - Heartbeat effect
- `shimmer` - Shimmer loading effect
- `marquee` - Horizontal scrolling text
- `gradient` - Animated gradient background
- `meteor` - Falling meteor effect
- `spotlight` - Spotlight reveal effect
- `waving-hand` - Waving hand animation

### Custom Shadows

Pre-defined shadow utilities:

- `shadow-depth-1` - Subtle depth shadow
- `shadow-hover-card` - Card hover effect
- Enhanced `md`, `lg`, `xl` shadows

### Background Gradients

Custom gradient utilities:

- `bg-gradient-radial` - Radial gradient
- `bg-shimmer-gradient` - Shimmer effect
- `bg-shimmer-gradient-dark` - Dark mode shimmer

## Content Paths

The configuration includes optimized content paths for:

- App directory structure
- Components directory
- Pages directory
- UI components
- Library packages

## Dark Mode

Dark mode is enabled using the `class` strategy. Add the `dark` class to enable dark mode:

```html
<html class="dark">
  <!-- Your app content -->
</html>
```

## CSS Variables

The configuration uses CSS variables for theming:

```css
:root {
  --font-inter: 'Inter', sans-serif;
  --font-roboto-mono: 'Roboto Mono', monospace;
  --color: /* primary color */;
  --secondary: /* secondary color */;
  --muted: /* muted color */;
  --accent: /* accent color */;
  --background: /* background color */;
  --green: /* green color */;
  --red: /* red color */;
}
```

## Examples

### Using Custom Animations

```html
<div class="animate-shimmer bg-shimmer-gradient">
  Loading content...
</div>

<div class="animate-heartbeat">
  ❤️ Heartbeat animation
</div>

<div class="animate-marquee">
  Scrolling text content
</div>
```

### Using Custom Colors

```html
<div class="bg-primary text-primary-foreground">
  Primary themed content
</div>

<div class="bg-gray-100 dark:bg-gray-35">
  Adaptive background
</div>
```

### Using Custom Shadows

```html
<div class="shadow-depth-1">
  Subtle depth effect
</div>

<div class="shadow-hover-card hover:shadow-lg">
  Interactive card
</div>
```

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
