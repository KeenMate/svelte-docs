// Main exports
export { default as DocLayout } from './components/DocLayout.svelte';
export { default as Navigation } from './components/Navigation.svelte';
export { default as MenuItem } from './components/MenuItem.svelte';
export { default as Tooltip } from './components/Tooltip.svelte';
export { default as CodeBlock } from './components/CodeBlock.svelte';
export { default as CodeRenderer } from './components/CodeRenderer.svelte';
export { default as ShowcaseSection } from './components/ShowcaseSection.svelte';
export { default as CodeShowcase } from './components/CodeShowcase.svelte';
export { default as ConfigProvider } from './components/ConfigProvider.svelte';
export { default as Card } from './components/Card.svelte';
export { default as FeatureCard } from './components/FeatureCard.svelte';
export { default as CardGrid } from './components/CardGrid.svelte';
export { default as MermaidChart } from './components/MermaidChart.svelte';

// Configuration exports
export type {
	DocsConfig,
	PartialDocsConfig,
	SiteConfig,
	CompanyConfig,
	NavigationConfig,
	NavigationItem,
	ThemeConfig,
	FeaturesConfig
} from './types/config.js';

export {
	defaultConfig,
	validateConfig,
	mergeConfig
} from './types/config.js';

export {
	configStore,
	initializeConfig,
	getConfig,
	getSiteConfig,
	getCompanyConfig,
	getNavigationConfig,
	getThemeConfig,
	getFeaturesConfig
} from './stores/config.svelte.js';

// Viewport store
export { viewportStore } from './stores/viewport.svelte.js';

// SSR utilities
export { generateSSRStyles } from './utils/ssr-styles.js';

// Legacy types for backward compatibility
export interface NavItem {
	title: string;
	href: string;
	children?: NavItem[];
}

export interface DocConfig {
	title: string;
	description?: string;
	navigation?: NavItem[];
}

// Legacy utility for backward compatibility
export function createDocConfig(config: DocConfig): DocConfig {
	return {
		title: config.title,
		description: config.description || '',
		navigation: config.navigation || []
	};
}
