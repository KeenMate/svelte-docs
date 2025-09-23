# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-rc02] - 2025-09-23

### Major Improvements
- **Layout Spacing** - Optimized header and content spacing in DocLayout component
  - Reduced excessive top margins on h2 elements (2rem → 1.25rem)
  - Reduced excessive top margins on h3 elements (1.5rem → 1rem)
  - Improved bottom margins for better vertical rhythm (h2: 1rem → 0.75rem, h3: 0.75rem → 0.5rem)
  - Reduced main content container padding (p-4 → p-3) for cleaner layout
  - Added first-child rule to remove top margin from initial headings
  - Overall cleaner, more professional spacing matching industry standards

- **SSR Configuration System** - Implemented complete Server-Side Rendering support
  - Added `+layout.server.ts` for server-side configuration loading
  - Updated `ConfigProvider` to accept both SSR and client-side configurations
  - Created `ssr-styles.ts` utility for generating inline CSS
  - **Eliminated FOUC** (Flash of Unstyled Content) on page loads
  - Improved SEO and performance with server-side config rendering

- **CSS Architecture Overhaul** - Complete consolidation and modernization
  - **Centralized CSS** - All code rendering styles moved to `main.scss`
  - Removed duplicate CSS from individual components (`CodeRenderer`, `CodeBlock`, `CodeShowcase`)
  - Updated SCSS imports to modern `@use` syntax (eliminates deprecation warnings)
  - Improved maintainability with single source of truth for styling

- **SCSS Variables System** - Comprehensive customization framework
  - Added `_variables.scss` with 50+ customization variables
  - Typography spacing variables (`$h1-margin-top`, `$h2-margin-top`, etc.)
  - Color customization (`$heading-color-h1`, `$code-bg-color`, etc.)
  - Content spacing (`$paragraph-margin-bottom`, `$list-padding-left`, etc.)
  - Layout variables (`$navbar-height`, `$sidebar-width`, etc.)
  - Font family customization (`$font-family-base`, `$font-family-monospace`)

- **Component Architecture Enhancement** - Improved whitespace handling
  - Moved `<pre>` tag into `CodeRenderer` component to prevent whitespace issues
  - Updated `CodeBlock` and `CodeShowcase` to use new architecture
  - **Eliminated unwanted tabs/indentation** in rendered code blocks
  - Robust solution that prevents whitespace issues from code reformatting

### Fixed
- **Homepage 404 Errors** - Updated navigation links to point to existing demo pages
- **Code Block Whitespace** - Resolved unwanted tabs/indentation in HTML output
- **SCSS Deprecation Warnings** - Updated to modern `@use` syntax from deprecated `@import`

### Enhanced
- **Build System** - Added publishing commands to Makefile
  - `make publish-dry` - Dry run publish for testing packages
  - `make publish` - Actual NPM publishing
  - Improved cross-platform compatibility

### Documentation
- **CLAUDE.md Updates** - Enhanced development guidelines
  - Added comprehensive SSR implementation notes
  - Updated CSS architecture documentation
  - Added SCSS customization examples
  - Improved component development standards

## [1.0.0-rc01] - 2025-09-21

First release candidate of @keenmate/svelte-docs - A professional component library for building beautiful documentation and showcase sites with SvelteKit.

### Added
- **NEW: MenuItem Component** - A flexible menu item component with comprehensive feature set
  - Icon support through Svelte 5 snippets
  - Customizable labels with proper naming conventions (`labelText`)
  - Tooltip functionality with accessibility support
  - Badge support with Bootstrap variant types
  - Target window control (`targetWindow` property)
  - Active/disabled/external state management
  - Automatic security attributes for external links
  - Responsive design with mobile-optimized tooltips

### Enhanced
- **Navigation Component** - Complete redesign using the new MenuItem component
  - Migrated from legacy `NavItem` to modern `NavigationItem` interface
  - Improved styling with CSS custom properties
  - Better sub-navigation handling with visual hierarchy
  - Enhanced accessibility with proper ARIA attributes
  - Support for all MenuItem features in navigation context

### Updated
- **Type Definitions** - Enhanced NavigationItem interface
  - Added `tooltip?: string` property for hover help text
  - Added `target?: '_self' | '_blank' | '_parent' | '_top' | string` property
  - Maintains backward compatibility with existing properties
  - Full TypeScript support with proper type constraints

### Security
- **Link Security** - Automatic security attributes for external links
  - Auto-adds `rel="noopener noreferrer"` for `_blank` targets
  - Auto-adds security attributes for external links
  - Prevents tabnabbing attacks on external navigation

### Developer Experience
- **New Demo Page** - Comprehensive MenuItem showcase at `/menu-example`
  - Examples of all component features and states
  - Interactive demonstrations of tooltips and badges
  - Code examples with best practices
  - Responsive design testing

### Documentation
- **CLAUDE.md** - Added comprehensive development guide
  - Project architecture overview
  - Component development standards
  - Svelte 5 best practices and naming conventions
  - Build and deployment instructions
  - Quality assurance guidelines

## [1.0.0-rc01] - Previous Release

### Core Features
- **DocLayout** - Main documentation layout component
- **ConfigProvider** - Global configuration system
- **Navigation** - Sidebar navigation (legacy implementation)
- **ShowcaseSection** - Three-column content layout
- **CodeShowcase** - Multi-tab code viewer with syntax highlighting
- **CodeBlock** - Simple code display with copy functionality
- **FeatureCard** - Feature cards with icons and descriptions
- **CardGrid** - Grid container for cards

### Styling System
- **Bootstrap 5.3 Integration** - Professional styling foundation
- **SCSS Architecture** - Customizable styling system
- **CSS Custom Properties** - Runtime theming support
- **Responsive Design** - Mobile-first approach

### Configuration
- **Comprehensive Config System** - Site metadata, company info, navigation
- **Type Safety** - Full TypeScript support
- **Validation** - Configuration validation helpers

---

## Migration Guide for Navigation Component

If you're upgrading from a previous version and using the Navigation component:

### Before (Legacy)
```typescript
interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

// Usage
<Navigation navItems={items} />
```

### After (Current)
```typescript
interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top' | string;
  children?: NavigationItem[];
  badge?: string;
  disabled?: boolean;
  tooltip?: string;
}

// Usage
<Navigation navigationItems={items} />
```

### Key Changes
1. `title` → `labelText` (follows naming convention)
2. `navItems` → `navigationItems` (clearer prop name)
3. Added icon, tooltip, badge, and target support
4. Enhanced accessibility and security features

---

## Component API Reference

### MenuItem Component

```typescript
interface MenuItemProps {
  hrefUrl: string;
  labelText: string;
  iconContent?: Snippet;
  tooltipText?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isExternal?: boolean;
  targetWindow?: '_self' | '_blank' | '_parent' | '_top' | string;
  badgeText?: string;
  badgeVariantType?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  cssClass?: string;
}
```

### NavigationItem Interface

```typescript
interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top' | string;
  children?: NavigationItem[];
  badge?: string;
  disabled?: boolean;
  tooltip?: string;
}
```

---

## Breaking Changes

### Navigation Component
- **Property Rename**: `navItems` → `navigationItems`
- **Interface Change**: `NavItem` → `NavigationItem` (with additional properties)
- **Styling Updates**: Uses new MenuItem component internally

### Type System
- **Enhanced Types**: NavigationItem now includes tooltip and target properties
- **Naming Convention**: All text properties use `*Text` suffix (e.g., `labelText`)
- **Boolean Properties**: All use `is*`, `has*`, `can*`, `should*` prefixes

---

## Acknowledgments

This release introduces a modern, accessible, and feature-rich menu system that maintains the library's philosophy of consistency over flexibility while providing developers with powerful tools for creating professional documentation sites.

All components follow the established naming conventions and design patterns, ensuring a cohesive developer experience across the entire library.