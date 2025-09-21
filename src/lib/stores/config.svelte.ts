// Configuration store using Svelte 5 runes
import type { DocsConfig, PartialDocsConfig } from '../types/config.js';
import { defaultConfig, mergeConfig, validateConfig } from '../types/config.js';

// Global configuration store
class ConfigStore {
	private _config = $state<DocsConfig | null>(null);
	private _errors = $state<string[]>([]);
	private _initialized = $state(false);

	constructor() {
		// Initialize with default config
		this._config = defaultConfig as DocsConfig;
	}

	// Getters
	get config() {
		return this._config;
	}

	get errors() {
		return this._errors;
	}

	get initialized() {
		return this._initialized;
	}

	get site() {
		return this._config?.site;
	}

	get company() {
		return this._config?.company;
	}

	get navigation() {
		return this._config?.navigation;
	}

	get theme() {
		return this._config?.theme;
	}

	get features() {
		return this._config?.features;
	}

	// Methods
	initialize(userConfig: PartialDocsConfig) {
		// Validate the configuration
		const validationErrors = validateConfig(userConfig);
		this._errors = validationErrors;

		if (validationErrors.length > 0) {
			console.error('Configuration validation errors:', validationErrors);
			// Still initialize with merged config but log errors
		}

		// Merge user config with defaults
		this._config = mergeConfig(defaultConfig, userConfig);
		this._initialized = true;

		// Apply theme CSS custom properties
		this.applyTheme();
	}

	update(partialConfig: Partial<DocsConfig>) {
		if (this._config) {
			this._config = { ...this._config, ...partialConfig } as DocsConfig;
			this.applyTheme();
		}
	}

	private applyTheme() {
		if (typeof document === 'undefined') return; // SSR guard

		const theme = this._config?.theme;
		if (!theme) return;

		const root = document.documentElement;

		// Apply color variables
		if (theme.colors) {
			Object.entries(theme.colors).forEach(([key, value]) => {
				if (value) {
					root.style.setProperty(`--docs-${key}`, value);

					// Also set RGB values for rgba usage
					if (key === 'primary' || key === 'secondary' || key === 'success' || key === 'danger') {
						const rgb = hexToRgb(value);
						if (rgb) {
							root.style.setProperty(`--docs-${key}-rgb`, `${rgb.r}, ${rgb.g}, ${rgb.b}`);
						}
					}
				}
			});
		}

		// Apply font variables
		if (theme.fonts) {
			if (theme.fonts.body) {
				root.style.setProperty('--docs-font-body', theme.fonts.body);
			}
			if (theme.fonts.heading) {
				root.style.setProperty('--docs-font-heading', theme.fonts.heading);
			}
			if (theme.fonts.mono) {
				root.style.setProperty('--docs-font-mono', theme.fonts.mono);
			}
		}

		// Apply component variables
		if (theme.components) {
			if (theme.components.navbar?.height) {
				root.style.setProperty('--navbar-height', theme.components.navbar.height);
			}
			if (theme.components.sidebar?.width) {
				root.style.setProperty('--sidebar-width', theme.components.sidebar.width);
			}
			if (theme.components.footer?.height) {
				root.style.setProperty('--footer-height', theme.components.footer.height);
			}
		}
	}

	// Helper methods
	getSocialLinks() {
		const social = this._config?.company?.social;
		if (!social) return [];

		return Object.entries(social)
			.filter(([, url]) => url)
			.map(([platform, url]) => ({
				platform,
				url: url!,
				icon: getSocialIcon(platform),
				label: getSocialLabel(platform)
			}));
	}

	getNavItemByHref(href: string): any {
		const findInItems = (items: any[]): any => {
			for (const item of items) {
				if (item.href === href) return item;
				if (item.children) {
					const found = findInItems(item.children);
					if (found) return found;
				}
			}
			return null;
		};

		return findInItems(this._config?.navigation?.main || []);
	}

	getBreadcrumbs(currentPath: string) {
		const breadcrumbs: Array<{ label: string; href: string }> = [
			{ label: 'Home', href: '/' }
		];

		if (currentPath !== '/') {
			const pathParts = currentPath.split('/').filter(Boolean);
			let currentHref = '';

			pathParts.forEach((part, index) => {
				currentHref += '/' + part;
				const navItem = this.getNavItemByHref(currentHref);

				breadcrumbs.push({
					label: navItem?.label || part.charAt(0).toUpperCase() + part.slice(1),
					href: currentHref
				});
			});
		}

		return breadcrumbs;
	}
}

// Utility functions
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
		  }
		: null;
}

function getSocialIcon(platform: string): string {
	const icons: Record<string, string> = {
		github: '📁',
		twitter: '🐦',
		linkedin: '💼',
		discord: '💬',
		slack: '💬',
		youtube: '📺',
		facebook: '📘',
		instagram: '📷',
		email: '📧'
	};
	return icons[platform] || '🔗';
}

function getSocialLabel(platform: string): string {
	const labels: Record<string, string> = {
		github: 'GitHub',
		twitter: 'Twitter',
		linkedin: 'LinkedIn',
		discord: 'Discord',
		slack: 'Slack',
		youtube: 'YouTube',
		facebook: 'Facebook',
		instagram: 'Instagram',
		email: 'Email'
	};
	return labels[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
}

// Export singleton instance
export const configStore = new ConfigStore();

// Export convenience functions
export function initializeConfig(userConfig: PartialDocsConfig) {
	configStore.initialize(userConfig);
}

export function getConfig() {
	return configStore.config;
}

export function getSiteConfig() {
	return configStore.site;
}

export function getCompanyConfig() {
	return configStore.company;
}

export function getNavigationConfig() {
	return configStore.navigation;
}

export function getThemeConfig() {
	return configStore.theme;
}

export function getFeaturesConfig() {
	return configStore.features;
}