# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**@keenmate/svelte-docs** is a highly opinionated documentation framework for SvelteKit projects. It's built with Svelte 5, TypeScript, and Bootstrap 5.3, designed for creating professional documentation sites with strict design constraints and zero custom styling allowed.

## Core Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build static site
npm run package          # Build library for NPM publishing
npm run preview          # Preview production build

# Quality Assurance
npm run check            # TypeScript validation
npm run check:watch      # TypeScript validation in watch mode

# Styling
npm run build:css        # Compile SCSS to CSS (sass command)

# Publishing
npm run prepublishOnly   # Automatically runs before npm publish
```

## Project Architecture

### Component Library Structure
- **Layout Components**: `DocLayout`, `ConfigProvider`, `Navigation` - Core layout system with fixed sidebar/content structure
- **Content Components**: `ShowcaseSection`, `CodeShowcase`, `CodeBlock`, `FeatureCard`, `CardGrid` - Pre-styled content display components
- **Configuration System**: Comprehensive config via `DocsConfig` interface with site metadata, company info, navigation, theme, and features

### Core Design Philosophy
This is NOT a flexible UI kit - it's a **restrictive documentation framework** where:
- Users cannot add custom CSS or HTML
- All styling is encapsulated within components
- Only Bootstrap utility classes are allowed (limited)
- Components have rigid internal structure
- Configuration over customization approach

### Styling Architecture
- **Bootstrap 5.3 Foundation**: Uses Bootstrap CSS (not JS components) with custom SCSS overrides
- **SCSS Preprocessing**: Main styles in `src/lib/styles/main.scss`, compiled to `dist/styles/main.css`
- **CSS Custom Properties**: Runtime theming via CSS variables (`--docs-primary`, `--docs-secondary`, etc.)
- **No Custom Styling**: Users work within predefined component constraints only

### Code Organization
- **`src/lib/`**: Main library code
  - `components/`: Svelte 5 components using runes and snippets
  - `types/config.ts`: TypeScript interfaces for configuration system
  - `stores/config.svelte.ts`: Svelte 5 runes-based configuration store
  - `styles/main.scss`: SCSS source for the library styles
- **`src/routes/`**: Demo/development routes for testing components
- **Export Structure**: All public APIs exported through `src/lib/index.ts`

## Svelte 5 & TypeScript Standards

### Property Naming Convention (MANDATORY)
The library enforces explicit, self-documenting property names:

- **Boolean properties**: `isVisible`, `hasChildren`, `canEdit`, `shouldRender` (NOT `visible`, `children`, `edit`)
- **Text properties**: `titleText`, `descriptionText`, `labelText` (NOT `title`, `description`, `label`)
- **Type/variant properties**: `variantType`, `colorType`, `sizeType` (NOT `variant`, `color`, `size`)
- **Collections**: `navItems`, `childItems`, `buttonList` (NOT `nav`, `children`, `buttons`)
- **URLs**: `linkHref`, `websiteUrl`, `imageUrl` (NOT `link`, `website`, `image`)

**Exception**: Svelte 5 reserved keywords like `children` (for snippets) must remain unchanged.

### Svelte 5 Runes Best Practices
- **Always use `$derived.by`** for function-based derivations (NOT `$derived(() => ...)`)
- **Access `$derived.by` values directly** - no function call syntax in templates
- **Use runes for reactivity** - `$state`, `$derived`, `$effect` patterns

## Build & Package System

### Static Site Generation
- Uses `@sveltejs/adapter-static` for SSG
- Outputs to `build/` directory
- All routes prerendered for optimal performance

### Library Packaging
- Uses `@sveltejs/package` to build library distribution
- Outputs to `dist/` directory with proper TypeScript definitions
- CSS compiled separately via `sass` command
- Package exports: main component library + CSS files

### Cross-Platform Support
- Makefile provides cross-platform commands (Windows/Unix)
- Handles Windows-specific path operations
- Use `make dev`, `make build`, `make package` for convenience

## Dependencies & Integration

### Core Dependencies
- **Svelte 5**: Latest features including runes and snippets
- **SvelteKit**: Framework with static adapter
- **TypeScript**: Full type safety required
- **Sass**: SCSS preprocessing for styles
- **highlight.js**: Automatic code syntax highlighting (50+ languages)

### Peer Dependencies
- **@sveltejs/kit**: ^2.0.0 (provided by consumer)
- **svelte**: ^4.0.0 || ^5.0.0 (provided by consumer)

## Development Workflow

### Component Development
1. All components must follow the naming convention
2. Use Svelte 5 runes (`$state`, `$derived.by`, `$effect`)
3. Implement proper TypeScript interfaces
4. Follow Bootstrap integration patterns
5. Ensure responsive design

### Configuration System
The library uses a comprehensive config system - reference `src/lib/types/config.ts` for:
- **Site metadata**: title, description, SEO settings
- **Company info**: name, logo, social links
- **Navigation**: main menu, footer, social navigation
- **Theme**: colors, fonts, component styling
- **Features**: toggles for search, breadcrumbs, etc.

### Quality Assurance
- Always run `npm run check` before committing
- TypeScript validation is mandatory
- Follow the established component patterns
- Test across the demo routes in `src/routes/`

## Restrictions & Guidelines

### What's NOT Allowed
- Custom CSS files in user projects
- HTML elements outside provided components
- Modifying component internal structure
- Breaking Bootstrap grid system
- Arbitrary color/theme values

### What's Required
- Follow property naming conventions
- Use TypeScript interfaces
- Work within component constraints
- Maintain Bootstrap compatibility
- Preserve responsive behavior

This framework prioritizes **consistency over flexibility** - every documentation site should look professional and follow the same patterns.