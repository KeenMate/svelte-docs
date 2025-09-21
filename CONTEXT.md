# Svelte Documentation Library - Project Context

## 🎯 Project Vision
A **highly opinionated**, **restrictive** documentation framework for Svelte/SvelteKit projects that enforces consistency and professional design patterns. This is NOT a flexible UI kit - it's a structured documentation system where users work within predefined constraints.

## 🏗️ Architecture Philosophy

### Core Principles
1. **Convention over Configuration** - Minimal choices, maximum consistency
2. **Restriction by Design** - Users can only use provided components, no custom HTML/CSS
3. **Bootstrap Foundation** - Leverages Bootstrap 5.3+ for reliable, tested patterns
4. **TypeScript First** - Full type safety with Svelte 5 and TypeScript
5. **Static Site Ready** - Optimized for SSG with @sveltejs/adapter-static

### Design Decisions
- **No Custom Styling** - Users cannot add custom CSS classes or inline styles
- **Fixed Component Structure** - Components have rigid internal structure
- **Predefined Variants Only** - Limited to Bootstrap's standard variants
- **Encapsulated Styles** - All styling is hidden within components
- **Standardized Layouts** - Single layout system (sidebar + content)

## 📦 Component Library

### Layout Components
- **ConfigProvider** - Global configuration wrapper (site metadata, navigation, theme)
- **DocLayout** - Main documentation layout with sidebar, header, footer
- **Navigation** - Fixed sidebar navigation with collapsible submenus

### Content Components
- **FeatureCard** - Structured cards with icon, title, description, action
- **CardGrid** - Grid container enforcing Bootstrap column layout
- **ShowcaseSection** - Three-column layout with customizable column titles (default: demo, controls, description)
- **CodeShowcase** - Multi-tab code viewer with syntax highlighting via highlight.js
- **CodeBlock** - Simple code display with syntax highlighting and copy functionality

### Code Highlighting
The library includes automatic syntax highlighting powered by highlight.js:
- **Automatic Language Detection**: When no language is specified, the library auto-detects the language
- **50+ Languages Supported**: Including JavaScript, TypeScript, Svelte, CSS, HTML, Python, Java, and more
- **Dark Theme Optimized**: Custom color scheme designed for dark code backgrounds
- **Copy Functionality**: One-click copy to clipboard for all code blocks
- **Property Names**: Use `languageType` to specify the language, `codeContent` for the code string

### Planned Components
- **Alert** - Standardized alert/callout boxes
- **Table** - Structured data tables with sorting
- **Tabs** - Content tabs for organizing information
- **Breadcrumb** - Automatic breadcrumb generation
- **TOC** - Table of contents generator
- **SearchBox** - Integrated search functionality

## 🎨 Styling System

### Color Scheme
```scss
$color-primary: #00A7E1;      // Bright Blue
$color-primary-dark: #007EA7;  // Dark Blue
$color-secondary: #003459;     // Navy
$color-dark: #00171F;          // Almost Black
```

### Bootstrap Integration
- Uses Bootstrap 5.3.2 CSS (not components)
- Custom SCSS variables override Bootstrap defaults
- Consistent spacing, typography, and responsive behavior
- No Bootstrap JavaScript dependencies

### Theme Customization
- CSS custom properties for runtime theming
- Predefined theme variables only
- No arbitrary color inputs
- Dark mode support (planned)

## 🔧 Configuration System

### Site Configuration
```typescript
interface DocsConfig {
  site: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    url: string;
    language: string;
  };
  company: {
    name: string;
    website: string;
    logo?: string;
    social?: {
      github?: string;
      twitter?: string;
    };
  };
  navigation: {
    main: NavigationItem[];
  };
  theme?: {
    primaryColor?: string;  // From predefined list only
    darkMode?: boolean;
  };
  features?: {
    search?: boolean;
    breadcrumbs?: boolean;
    tableOfContents?: boolean;
  };
}
```

### Page-Level Overrides
- Pages can extend metadata (title, description, keywords)
- Automatic merging with site configuration
- SEO and Open Graph tags generation
- No structural changes allowed

## 🚀 Usage Pattern

### For Library Users
```svelte
<!-- App.svelte -->
<ConfigProvider config={siteConfig}>
  <DocLayout>
    <FeatureCard
      icon="📚"
      title="Documentation"
      description="Read our docs"
      href="/docs"
      variant="primary"
    />
  </DocLayout>
</ConfigProvider>
```

### What Users CANNOT Do
- ❌ Add custom components between library components
- ❌ Override component styles with CSS
- ❌ Change component internal structure
- ❌ Use arbitrary HTML elements
- ❌ Customize beyond provided props
- ❌ Break out of the grid system
- ❌ Create custom layouts

### What Users CAN Do
- ✅ Configure site metadata
- ✅ Define navigation structure
- ✅ Choose from predefined color themes
- ✅ Toggle features on/off
- ✅ Provide content through props
- ✅ Use Bootstrap utility classes (limited)
- ✅ Extend page metadata

## 🎯 Target Audience

### Perfect For
- **Open source projects** needing professional docs quickly
- **Enterprise teams** wanting consistency across projects
- **Developers** who prefer convention over configuration
- **Projects** requiring uniform documentation style

### Not Suitable For
- Projects needing custom design systems
- Marketing websites requiring unique layouts
- Applications needing flexible UI components
- Projects with existing design systems

## 📝 Coding Standards & Naming Conventions

### Property Naming Guidelines

We enforce **explicit, self-documenting property names** that clearly indicate their type and purpose:

#### Boolean Properties
Always use prefixes that indicate boolean nature:
- ✅ `isVisible`, `isDisabled`, `isActive`, `isExpanded`
- ✅ `hasChildren`, `hasError`, `hasFocus`
- ✅ `canEdit`, `canDelete`, `canExpand`
- ✅ `shouldRender`, `shouldValidate`
- ❌ `visible`, `disabled`, `active`, `children` (ambiguous)

#### Collection Properties
Be explicit about what the collection contains:
- ✅ `childItems`, `menuItems`, `navItems`, `dataRows`
- ✅ `buttonList`, `cardCollection`, `tabArray`
- ❌ `children`, `items`, `data` (unclear type)

#### Type-Suffix Convention
Add type indicators to clarify expected values:
- ✅ `colorTheme`, `variantType`, `sizeOption`
- ✅ `genreType`, `categoryType`, `statusType`
- ✅ `layoutMode`, `displayFormat`, `sortOrder`
- ❌ `color`, `variant`, `size`, `genre` (ambiguous type)

#### Action/Callback Properties
Use verb prefixes for functions:
- ✅ `onClick`, `onSubmit`, `onChange`
- ✅ `handleClick`, `handleSubmit`
- ✅ `validateInput`, `formatData`
- ❌ `click`, `submit`, `change` (unclear if data or function)

#### Examples in Practice

```typescript
// ❌ BAD - Ambiguous property names
interface Props {
  children?: any;        // What type? Boolean? Array? Element?
  disabled?: boolean;    // OK but not consistent
  variant?: string;      // What are valid values?
  icon?: string;         // String? Component? URL?
}

// ✅ GOOD - Self-documenting property names
interface Props {
  childItems?: NavItem[];      // Clearly an array of nav items
  isDisabled?: boolean;        // Clearly a boolean
  variantType?: 'primary' | 'secondary';  // Clear enum type
  iconName?: string;           // Clearly expects icon identifier
  hasIcon?: boolean;           // Separate boolean flag
}
```

#### Rationale
- **Reduces cognitive load** - Developers immediately understand the type
- **Prevents errors** - Clear expectations prevent type mismatches
- **Improves IntelliSense** - Better autocomplete suggestions
- **Self-documenting** - Less need for comments
- **Consistency** - Same patterns across entire codebase

This naming convention is **mandatory** for all components in the library.

#### Svelte 5 Reserved Keywords

**IMPORTANT: `children` is a reserved keyword in Svelte 5 and must NOT be renamed:**

```typescript
// ✅ CORRECT - Keep Svelte 5 reserved keywords as-is
interface Props {
  children: import('svelte').Snippet;  // Must remain 'children'
  navItems: NavItem[];                 // Other props follow naming convention
}

// ❌ WRONG - Don't rename Svelte reserved keywords
interface Props {
  childrenContent: import('svelte').Snippet;  // Breaks Svelte 5
  childItems: import('svelte').Snippet;       // Breaks Svelte 5
}
```

**Other Svelte 5 reserved keywords to preserve:**
- `children` - For snippet content
- `this` - For component references
- `bind:` prefixed props - For binding syntax

**Rationale:**
- Svelte 5 expects specific property names for framework features
- Renaming reserved keywords breaks framework functionality
- Only rename custom/user-defined properties, not framework keywords

#### Svelte 5 Runes Best Practices

**Always use `$derived.by` when using functions/lambdas:**
```typescript
// ❌ BAD - Using function with $derived
let computedValue = $derived(() => {
  return someComplexCalculation();
});

// ✅ GOOD - Using $derived.by for functions
let computedValue = $derived.by(() => {
  return someComplexCalculation();
});

// ✅ GOOD - Direct expressions can use $derived
let simpleValue = $derived(count * 2);

// ✅ IMPORTANT - Access $derived.by values directly (no function call)
{#if computedValue?.length > 0}  <!-- NOT computedValue() -->
  <span>{computedValue}</span>     <!-- NOT {computedValue()} -->
{/if}
```

**Rationale:**
- `$derived.by` is specifically designed for function-based derivations
- Provides better performance and debugging in Svelte 5
- Makes the intent clearer - function vs direct expression
- Follows official Svelte 5 best practices

## 🛠️ Technical Stack

### Core Dependencies
- **SvelteKit** - Framework
- **Svelte 5** - Runes, snippets, new reactivity
- **TypeScript** - Type safety
- **Bootstrap 5.3** - CSS framework
- **SCSS** - Style preprocessing

### Build Tools
- **Vite** - Build system
- **@sveltejs/adapter-static** - Static site generation
- **@sveltejs/package** - Library packaging
- **Prettier** - Code formatting
- **ESLint** - Code quality

### Development Workflow
```bash
npm run dev        # Development server
npm run build      # Build library
npm run package    # Package for npm
npm run check      # TypeScript validation
```

## 📐 Future Roadmap

### Phase 1 (Current)
- ✅ Core layout components
- ✅ Configuration system
- ✅ Basic content components
- ✅ Bootstrap integration
- ✅ TypeScript setup

### Phase 2
- ⏳ Search functionality
- ⏳ Dark mode support
- ⏳ More content components
- ⏳ API documentation generator
- ⏳ Markdown support

### Phase 3
- 📋 Plugin system (restricted)
- 📋 Analytics integration
- 📋 Version switcher
- 📋 Multi-language support
- 📋 CLI tool for project setup

## 💡 Design Rationale

### Why So Restrictive?
1. **Consistency** - Every doc site looks professional
2. **Maintenance** - Easier to update and maintain
3. **Quality** - No way to create bad-looking docs
4. **Speed** - No design decisions slow down development
5. **Learning Curve** - Minimal API to learn

### Inspiration
- **Next.js Documentation** - Clean, consistent
- **Stripe Docs** - Professional, structured
- **Bootstrap Docs** - Familiar patterns
- **Docusaurus** - But more restrictive
- **VuePress** - But for Svelte

## 🔒 Constraints as Features

The library's restrictions are intentional features:
- **No custom CSS** → Guaranteed consistency
- **Fixed layouts** → Familiar navigation
- **Limited variants** → Cohesive design
- **Structured components** → Predictable output
- **Typed configuration** → No invalid states

## 📝 Example Use Cases

### Project Documentation
```
/getting-started
/installation
/configuration
/api-reference
/examples
```

### Component Library Showcase
```
/components/button
/components/card
/components/modal
/playground
```

### SDK Documentation
```
/quick-start
/authentication
/endpoints
/sdk-reference
/migration-guide
```

## 🎨 Visual Identity

### Typography
- **Headings**: System UI fonts
- **Body**: -apple-system, BlinkMacSystemFont
- **Code**: 'Courier New', Monaco, monospace

### Spacing
- Consistent Bootstrap spacing scale
- Responsive padding/margins
- Structured component gaps

### Animations
- Subtle hover effects
- Smooth transitions (0.2-0.3s)
- No jarring movements

## 🚦 Success Metrics

A successful implementation will have:
1. **Zero custom CSS files** in the user's project
2. **Consistent look** across all pages
3. **Fast build times** (< 30s)
4. **Small bundle size** (< 200KB CSS)
5. **100% TypeScript coverage**
6. **Accessible** (WCAG 2.1 AA)
7. **SEO optimized** out of the box

---

## 📌 Remember

**This is not a UI kit. This is a documentation framework.**

Users who need flexibility should use other solutions. This library is for those who value:
- **Speed** over customization
- **Consistency** over uniqueness
- **Convention** over configuration
- **Structure** over flexibility

The goal is to make it impossible to create bad-looking documentation.