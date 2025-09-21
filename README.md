# @keenmate/svelte-docs

A professional component library for building beautiful documentation and showcase sites with SvelteKit.

[![npm version](https://img.shields.io/npm/v/@keenmate/svelte-docs.svg)](https://www.npmjs.com/package/@keenmate/svelte-docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **🚧 Release Candidate**: This is version 1.0.0-rc01 - a release candidate for testing and feedback. The API is stable but may have minor changes before the final 1.0.0 release.

## Features

- 🎨 **Beautiful Components** - Pre-styled components with Bootstrap integration
- 🌈 **Syntax Highlighting** - Powered by highlight.js with 50+ language support
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🚀 **Svelte 5 Ready** - Built with the latest Svelte 5 features and runes
- 🎯 **TypeScript Support** - Full TypeScript support with type definitions
- 🔧 **Highly Configurable** - Extensive configuration system for customization
- 📦 **Zero Config** - Works out of the box with sensible defaults

## Installation

```bash
npm install @keenmate/svelte-docs
```

### Import Styles

You need to import the CSS styles in your app. You have several options:

#### Option 1: Import CSS in your main layout
```svelte
<!-- src/app.html or your main layout -->
<script>
  import '@keenmate/svelte-docs/styles';
</script>
```

#### Option 2: Import in your CSS/SCSS file
```css
/* src/app.css */
@import '@keenmate/svelte-docs/styles/main.css';
```

#### Option 3: Import SCSS for customization
```scss
/* src/app.scss */
// Override variables before import
$primary-color: #your-color;
@import '@keenmate/svelte-docs/styles/main.scss';
```

## Quick Start

### 1. Configure Your Layout

Create a `+layout.svelte` file in your routes directory:

```svelte
<script lang="ts">
  import { ConfigProvider } from '@keenmate/svelte-docs';
  import type { PartialDocsConfig } from '@keenmate/svelte-docs';

  const config: PartialDocsConfig = {
    site: {
      title: 'My Documentation',
      description: 'Documentation for my awesome project',
      keywords: ['documentation', 'svelte', 'awesome']
    },
    company: {
      name: 'My Company',
      website: 'https://example.com'
    },
    navigation: {
      main: [
        { label: 'Home', href: '/', icon: '🏠' },
        { label: 'Docs', href: '/docs', icon: '📚' },
        { label: 'API', href: '/api', icon: '🔌' }
      ]
    }
  };
</script>

<ConfigProvider configData={config}>
  <slot />
</ConfigProvider>
```

### 2. Create a Documentation Page

```svelte
<script>
  import { DocLayout, ShowcaseSection, CodeShowcase } from '@keenmate/svelte-docs';
</script>

<DocLayout titleText="Getting Started">
  <ShowcaseSection
    titleText="Installation"
    subtitleText="Get started in minutes"
  >
    {#snippet demoContent()}
      <h4>Quick Install</h4>
      <p>Install the package using npm:</p>
    {/snippet}

    {#snippet controlsContent()}
      <button class="btn btn-primary">Copy Command</button>
    {/snippet}

    {#snippet descriptionContent()}
      <p>This will install the latest version of the library.</p>
    {/snippet}
  </ShowcaseSection>

  <CodeShowcase
    titleText="Example Code"
    svelteCodeContent={`<Button variantType="primary">Click me</Button>`}
    typescriptCodeContent={`const handleClick = () => console.log('Clicked!');`}
  />
</DocLayout>
```

## Components

### Layout Components

#### DocLayout
Main page layout with navigation sidebar.

**Props:**
- `titleText?: string` - Page title
- `descriptionText?: string` - Page description for SEO
- `isNavigationVisible?: boolean` - Show/hide navigation (default: true)
- `areBreadcrumbsVisible?: boolean` - Show/hide breadcrumbs (default: true)

#### ConfigProvider
Global configuration provider for the entire app.

**Props:**
- `configData: PartialDocsConfig` - Configuration object
- `pageTitleText?: string` - Override page title
- `pageDescriptionText?: string` - Override page description
- `pageKeywordsList?: string[]` - Additional page keywords
- `pageAuthorName?: string` - Page author
- `pageOgImageUrl?: string` - Open Graph image URL

### Content Components

#### ShowcaseSection
Three-column layout for demonstrations with customizable column titles.

**Props:**
- `titleText: string` - Section title
- `subtitleText?: string` - Section subtitle
- `demoContent?: Snippet` - Demo column content
- `controlsContent?: Snippet` - Controls column content
- `descriptionContent?: Snippet` - Description column content
- `demoColumnTitle?: string` - Custom demo column title (default: "Demo")
- `controlsColumnTitle?: string` - Custom controls column title (default: "Controls")
- `descriptionColumnTitle?: string` - Custom description column title (default: "Description")

#### CodeShowcase
Multi-tab code viewer with syntax highlighting.

**Props:**
- `titleText?: string` - Component title
- `tabItems?: TabItem[]` - Custom tabs array
- `svelteCodeContent?: string` - Svelte code content
- `typescriptCodeContent?: string` - TypeScript code content
- `cssCodeContent?: string` - CSS code content

#### CodeBlock
Simple code display with syntax highlighting and copy functionality.

**Props:**
- `codeContent: string` - Code to display
- `languageType?: string` - Programming language
- `titleText?: string` - Optional title/filename
- `isCopyable?: boolean` - Enable copy button (default: true)

#### FeatureCard
Feature cards with icons and descriptions.

**Props:**
- `iconEmoji?: string` - Icon emoji
- `titleText: string` - Card title
- `descriptionText: string` - Card description
- `linkHref?: string` - Link URL
- `linkLabel?: string` - Link text
- `variantType?: string` - Bootstrap variant
- `badgeText?: string` - Badge text
- `badgeVariantType?: string` - Badge variant
- `isDisabled?: boolean` - Disabled state

## Configuration

The library uses a comprehensive configuration system:

```typescript
interface PartialDocsConfig {
  site?: {
    title?: string;
    description?: string;
    keywords?: string[];
    author?: string;
    url?: string;
    language?: string;
    ogImage?: string;
    twitterHandle?: string;
  };
  company?: {
    name?: string;
    website?: string;
    logo?: string;
    logoAlt?: string;
    social?: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      facebook?: string;
    };
  };
  navigation?: {
    main?: NavigationItem[];
    social?: SocialLink[];
  };
  features?: {
    search?: boolean;
    breadcrumbs?: boolean;
    tableOfContents?: boolean;
  };
}
```

## Property Naming Convention

This library follows explicit, self-documenting property naming conventions:

- Boolean properties use prefixes: `is*`, `has*`, `can*`, `should*`
- Text properties use suffix: `*Text`
- Type/variant properties use suffix: `*Type`
- Collection properties use specific suffixes: `*Items`, `*List`
- URL properties use suffix: `*Url` or `*Href`

Examples:
- `titleText` instead of `title`
- `isDisabled` instead of `disabled`
- `variantType` instead of `variant`
- `tabItems` instead of `tabs`

## Code Highlighting

The library includes automatic syntax highlighting powered by highlight.js:

```svelte
<CodeBlock
  codeContent={yourCode}
  languageType="javascript"
  titleText="Example"
  isCopyable={true}
/>
```

Supports 50+ languages including:
- JavaScript, TypeScript, Svelte
- Python, Java, C++, Rust, Go
- HTML, CSS, SCSS
- JSON, YAML, Markdown
- SQL, GraphQL
- And many more...

## Styling

The library includes custom styling with CSS variables that you can override.

### CSS Variables
Override these CSS custom properties to customize the theme:

```css
:root {
  --docs-primary: #00A7E1;
  --docs-primary-rgb: 0, 167, 225;
  --docs-secondary: #003459;
  --docs-secondary-rgb: 0, 52, 89;
  --docs-dark: #00171F;
  --docs-light: #f8f9fa;
  --docs-border: #dee2e6;
  --docs-body-color: #212529;
  --navbar-height: 56px;
  --sidebar-width: 280px;
  --footer-height: 60px;
}
```

### SCSS Variables
If you import the SCSS file, you can override these variables:

```scss
// Override before importing
$color-primary: #your-primary-color;
$color-secondary: #your-secondary-color;
$sidebar-width: 320px;
$navbar-height: 64px;

@import '@keenmate/svelte-docs/styles/main.scss';
```

## Static Site Generation

This library is optimized for SvelteKit static builds:

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};
```

```typescript
// src/routes/+layout.ts
export const prerender = true;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

```bash
# Clone repository
git clone https://github.com/keenmate/svelte-docs.git
cd svelte-docs

# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run package

# Run checks
npm run check
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT © KeenMate

## Links

- [Documentation](https://github.com/keenmate/svelte-docs)
- [GitHub Repository](https://github.com/keenmate/svelte-docs)
- [NPM Package](https://www.npmjs.com/package/@keenmate/svelte-docs)
- [Report Issues](https://github.com/keenmate/svelte-docs/issues)

---

Made with ❤️ by [KeenMate](https://keenmate.com)