# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-rc08] - 2025-11-22

### Added
- **SCSS Module Exports** - All SCSS partials now available as individual exports
  - `@keenmate/svelte-docs/styles/variables` - SCSS variables only
  - `@keenmate/svelte-docs/styles/global` - Global styles partial
  - `@keenmate/svelte-docs/styles/layout` - Layout styles partial
  - `@keenmate/svelte-docs/styles/navigation` - Navigation styles partial
  - `@keenmate/svelte-docs/styles/components` - Component styles partial
  - `@keenmate/svelte-docs/styles/code-rendering` - Code block styles partial
  - `@keenmate/svelte-docs/styles/mermaid` - Mermaid chart styles partial
  - `@keenmate/svelte-docs/styles/root` - CSS custom properties partial
  - Allows users to selectively import and customize individual modules
  - Users can override variables and build custom themes

- **SCSS Variable Expansion** - Comprehensive variable system for better theming
  - Added 48 new SCSS variables for improved customization
  - Gray scale colors: `$gray-600`, `$gray-500`
  - Code header colors: `$code-header-bg`, `$code-header-border`, `$code-button-color`
  - Inline code color: `$code-inline-color`
  - Body background: `$body-bg-color`
  - Syntax highlighting: 10 syntax color variables (`$syntax-keyword-color`, `$syntax-string-color`, etc.)
  - Spacing system: 6 spacing variables (`$spacing-xs` through `$spacing-2xl`)
  - Mermaid chart colors: `$mermaid-bg-color`, chart error colors
  - Opacity scale: `$opacity-light`, `$opacity-medium`, `$opacity-heavy`
  - Navigation utilities: `$navbar-brand-offset`, scrollbar colors, backdrop colors

### Changed
- **SCSS Variable Standardization** - Replaced hardcoded values with variables throughout
  - `_global.scss`: Body background now uses `$body-bg-color`
  - `_navigation.scss`: Navbar brand offset, opacity, and scrollbar colors use variables
  - `_components.scss`: Spacing, colors, and code styling use variables
  - `_code-rendering.scss`: All code header/button colors and syntax highlighting use variables
  - `_mermaid.scss`: All chart colors, spacing, and error states use variables
  - 80+ hardcoded values replaced with semantic variables
  - Improved consistency across all SCSS files

- **Component Style Consolidation** - Moved all component-specific styles to SCSS partials
  - Removed `<style>` blocks from `CodeBlock.svelte` (~52 lines)
  - Removed `<style>` blocks from `Card.svelte` - styles moved to `_components.scss` (~34 lines)
  - Removed `<style>` blocks from `FeatureCard.svelte` - styles moved to `_components.scss` (~50 lines)
  - Removed `<style>` blocks from `CardGrid.svelte` - styles moved to `_components.scss` (~11 lines)
  - Removed `<style>` blocks from `MenuItem.svelte` - styles moved to `_navigation.scss` (~135 lines)
  - All components now use centralized SCSS files for consistent theming
  - Replaced hardcoded values in component styles with SCSS variables
  - Better maintainability and single source of truth for styling (~280 lines consolidated)

## [1.0.0-rc07] - 2025-11-22

### Added
- **MermaidChart Component** - Interactive diagram and chart rendering
  - Integrated Mermaid.js library (v11.12.1) for creating diagrams from text definitions
  - Support for flowcharts, sequence diagrams, class diagrams, state diagrams, and more
  - `chartDefinition` prop for Mermaid syntax input
  - `titleText` prop for optional chart title
  - `themeType` prop with theme options: 'default', 'dark', 'forest', 'neutral'
  - Automatic reactive re-rendering on chart definition or theme changes
  - Error handling with user-friendly error messages
  - Unique chart ID generation to prevent conflicts
  - Uses Svelte 5 `$effect` for reactive chart rendering

- **Card Component** - Flexible Bootstrap-based card component
  - `titleText` and `subtitleText` props for card content
  - `variantType` prop for background colors (primary, secondary, success, info, warning, danger, light, dark)
  - `borderVariantType` prop for border color variants
  - `hasHoverEffect` prop for interactive hover animation (lift and shadow)
  - Three snippet slots: `headerContent`, `bodyContent`, `footerContent`
  - Image support with `imageUrl`, `imageAltText`, and `imagePosition` ('top' | 'bottom')
  - Scoped component styles with smooth transitions
  - Full Bootstrap card structure with header, body, and footer sections

- **Demo Pages** - Comprehensive component showcases
  - `/card-demo` route demonstrating Card component variants and features
  - `/mermaid-demo` route showcasing MermaidChart capabilities with various diagram types

- **ShowcaseSection Flexible Layout** - Support for 2-column and 3-column layouts with configurable widths
  - New `columnCountType` prop (2 | 3) to select layout mode (default: 3)
  - New `leftColumnSize`, `rightColumnSize`, `middleColumnSize` props for custom Bootstrap grid column widths
  - Automatic column size calculation (right column auto-calculated if not specified)
  - Validation ensures columns sum to 12 (Bootstrap requirement) with console warnings
  - Default column sizes: 4-4-4 for 3-column, 6-6 for 2-column layouts
  - Full responsive support: all layouts auto-stack to full-width on mobile (< 992px)

### Changed
- **SCSS Architecture Refactoring** - Modular file structure for improved maintainability
  - Split monolithic `main.scss` (899 lines) into 7 focused partial files
  - New structure: `_root.scss` (CSS custom properties), `_global.scss` (typography), `_layout.scss` (main wrapper), `_navigation.scss` (navbar/sidebar/footer), `_components.scss` (cards/showcase), `_code-rendering.scss` (code blocks/highlight.js), `_mermaid.scss` (mermaid charts)
  - `main.scss` now acts as central import hub using modern `@use` syntax
  - No breaking changes - compilation output remains identical
  - Improved code organization and easier maintenance
  - Better developer experience when working with specific style sections

- **Navigation Configuration** - Updated sidebar menu links
  - Added "Card Demo" link to showcase Card component features
  - Added "Mermaid Demo" link to showcase MermaidChart diagram capabilities
  - Renamed "Anchor Demo" to "Showcase Demo" for clarity

- **ShowcaseSection Column Title Props** - Simplified naming convention ⚠️ **BREAKING CHANGE**
  - Renamed `demoColumnTitle` → `col1Title` (default: "Demo")
  - Renamed `controlsColumnTitle` → `col2Title` (default: "Controls")
  - Renamed `descriptionColumnTitle` → `col3Title` (default: "Description")
  - Existing code using custom column titles needs prop name updates

## [1.0.0-rc06] - 2025-11-07

### Added
- **Floating UI Integration** - Smart tooltip positioning system
  - Integrated `@floating-ui/dom` for intelligent tooltip placement
  - Automatic collision detection and viewport boundary awareness
  - Dynamic fallback positioning based on available space
  - Supports top, right, bottom, and left placements with smart fallbacks

- **Tooltip Configuration System** - Comprehensive tooltip customization
  - Global enable/disable toggle (`theme.components.tooltip.isEnabled`)
  - Configurable default placement (`placement`: 'top' | 'right' | 'bottom' | 'left')
  - Mobile behavior control (`showOnMobile`)
  - Configurable show/hide delays (`showDelay`, `hideDelay` in milliseconds)
  - Full styling customization (backgroundColor, textColor, fontSize, etc.)
  - Z-index, border radius, padding, and arrow size controls
  - CSS custom properties for runtime theming
  - All settings optional with sensible defaults

### Enhanced
- **Sidebar Navigation** - Full-height display on long pages
  - Changed sidebar positioning from `relative` to `fixed`
  - Sidebar now stays visible at all times regardless of page length
  - Properly pinned below navbar with full viewport height
  - Main content automatically adjusts with left margin on desktop
  - Smooth transitions when toggling sidebar visibility

- **Sidebar Scrolling** - Improved overflow handling
  - Added vertical scrolling with `overflow-y: auto`
  - Custom scrollbar styling for dark sidebar theme
  - Works on both desktop and mobile views
  - Proper height calculations: `calc(100vh - var(--navbar-height))`

- **ShowcaseSection Component** - Consistent spacing across columns
  - Removed `demo-container` wrapper for cleaner structure
  - All three columns (demo, controls, description) now have consistent 0.5rem padding
  - Fixed CodeBlock margin stacking in controls column
  - Removed unused demo-container styles from SCSS

- **SCSS Architecture** - Eliminated inline styles
  - Moved all inline styles to proper SCSS classes
  - Added `.nav-expand-arrow` and `.expanded` classes for menu expansion
  - Added `.nav-children` class with slideDown animation
  - Added `.nav-link-child` class for nested menu items
  - Added `@keyframes slideDown` animation definition
  - Cleaner, more maintainable component templates

- **Tooltip Positioning** - Optimized fallback strategy
  - Primary placement: right (for sidebar menus)
  - Smart fallbacks: top → bottom → left (avoids sidebar overlap)
  - Placement-aware fallback order adapts to primary position
  - Better UX for menu tooltips in left-positioned sidebars

### Fixed
- **Tooltip Reactivity** - Resolved Svelte 5 binding warnings
  - Fixed `bind:this` non-reactive property warnings
  - Changed from Map to reactive object for element storage
  - Proper reactive state management with `$state`
  - Tooltips now position correctly (no more top-left corner bug)

- **Sidebar Overflow** - Resolved menu truncation on long pages
  - Fixed issue where sidebar would stop mid-screen on long pages
  - Sidebar content no longer scrolls away with page content
  - All menu items remain accessible through scrolling

### Configuration
- **New Configuration Options** - `theme.components.tooltip`
  ```typescript
  tooltip: {
    isEnabled: true,                      // Default: enabled
    placement: 'right',                   // Default: right side
    showOnMobile: false,                  // Default: hidden on mobile
    showDelay: 0,                         // Default: no delay
    hideDelay: 0,                         // Default: no delay
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    textColor: "white",
    fontSize: "0.875rem",
    maxWidth: "300px",
    zIndex: 1060,
    borderRadius: "0.375rem",
    padding: "0.5rem 0.75rem",
    arrowSize: "8px"
  }
  ```

### Developer Experience
- **CSS Variables** - New tooltip-specific CSS custom properties
  - `--tooltip-bg`, `--tooltip-color`, `--tooltip-font-size`
  - `--tooltip-max-width`, `--tooltip-z-index`, `--tooltip-border-radius`
  - `--tooltip-padding`, `--tooltip-arrow-size`
  - Applied automatically by config store when theme changes

## [1.0.0-rc05] - 2025-10-28

### Fixed
- **Navbar Flex Behavior** - Fixed navbar alignment issue at 991-992px breakpoint
  - Applied `flex-wrap: nowrap !important` to `.navbar-expand-lg` at all times
  - Applied `justify-content: flex-start !important` to `.navbar-expand-lg` at all times
  - Prevents buttons from being pushed down and overlapping navbar border

## [1.0.0-rc04] - 2025-10-28

### Added
- **Viewport Store** - New reactive store for tracking viewport/breakpoint changes
  - `viewportStore` tracks `isMobileView` (< 992px) and `windowWidth`
  - Automatically updates on window resize
  - Exported from main library index for use in consumer applications
  - Uses Svelte 5 runes for reactivity

### Fixed
- **Navbar Alignment at Breakpoint** - Fixed navbar items jumping at 991-992px breakpoint
  - Added explicit vertical centering for `.container-fluid`
  - Removed Bootstrap's default padding that caused height inconsistency
  - Ensured all navbar items stay aligned across all viewport sizes
- **Sidebar State Initialization** - Improved sidebar state initialization timing
  - Changed from `$effect()` to `$state.raw()` with IIFE for immediate initialization
  - Sidebar state now loads from localStorage before first render
  - Eliminates any potential flash or delay in sidebar state
- **Mobile Sidebar Persistence** - Mobile sidebar state no longer persisted to localStorage
  - Only desktop sidebar state (≥992px) is saved to localStorage
  - Mobile sidebar acts as temporary overlay without affecting stored preferences
  - Uses `viewportStore.isMobileView` for consistent breakpoint detection

## [1.0.0-rc03] - 2025-10-27

### Fixed
- **Mobile Sidebar Auto-Open** - Fixed sidebar automatically opening on page reload in mobile view
  - Sidebar state now initializes immediately from localStorage or viewport size (no delay)
  - Changed from `$effect()` to `$state.raw()` initialization to prevent flash
  - Uses Bootstrap's `lg` breakpoint (992px) for consistent responsive behavior
  - Prevents unwanted sidebar overlay on mobile devices after page refresh
  - Sidebar state persisted to localStorage for better UX across page navigations

### Enhanced
- **ConfigProvider SSR Initialization** - Improved configuration initialization timing
  - Config now initializes immediately during SSR instead of waiting for `onMount`
  - Ensures configuration is available throughout the component lifecycle
  - Theme application still happens client-side via `onMount` as required

- **Sidebar State Management** - Complete sidebar persistence system
  - Sidebar visibility state persisted to localStorage
  - Intelligent default: closed on mobile (<992px), open on desktop (≥992px)
  - Smooth transitions with new CSS classes (`sidebar-visible`, `sidebar-hidden`)
  - State updates on toggle and mobile navigation actions

- **Navbar Improvements** - Better mobile responsiveness
  - Brand text now has max-width with ellipsis to prevent overflow on mobile
  - Sidebar toggle button always visible (both desktop and mobile)
  - Improved spacing calculation: `max-width: calc(100vw - 200px)`

### Changed
- **Default Site Title** - Updated default config title from "Demo showcase" to "Documentation"
- **Demo Pages Cleanup** - Removed unnecessary ConfigProvider wrappers from demo pages
  - anchor-demo and menu-example pages simplified
  - Removed +page.ts prerender files (using global prerender settings)

### Removed
- **Search Button** - Temporarily removed non-functional search button from navbar
  - Will be reintroduced when search functionality is implemented

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