// Example configuration for documentation sites
import type { PartialDocsConfig } from '../types/config.js';

// Basic configuration example
export const basicConfig: PartialDocsConfig = {
	site: {
		title: 'My Documentation',
		description: 'Comprehensive documentation for my project',
		keywords: ['documentation', 'api', 'guide'],
		author: 'My Company',
		language: 'en',
		url: 'https://docs.example.com'
	},
	company: {
		name: 'My Company',
		website: 'https://example.com',
		email: 'contact@example.com',
		social: {
			github: 'https://github.com/mycompany',
			twitter: 'https://twitter.com/mycompany'
		}
	},
	navigation: {
		main: [
			{ label: 'Home', href: '/', icon: '🏠' },
			{ label: 'Getting Started', href: '/getting-started', icon: '🚀' },
			{
				label: 'Components',
				href: '/components',
				icon: '🧩',
				children: [
					{ label: 'Buttons', href: '/components/buttons' },
					{ label: 'Forms', href: '/components/forms' },
					{ label: 'Layout', href: '/components/layout' }
				]
			},
			{ label: 'API Reference', href: '/api', icon: '📚' },
			{ label: 'GitHub', href: 'https://github.com/mycompany/my-project', icon: '📁', external: true }
		]
	}
};

// Advanced configuration with custom theming
export const advancedConfig: PartialDocsConfig = {
	site: {
		title: 'Advanced Docs',
		description: 'Advanced documentation with custom theming and features',
		keywords: ['documentation', 'api', 'advanced', 'custom'],
		author: 'Advanced Company',
		language: 'en',
		url: 'https://advanced-docs.example.com',
		ogImage: 'https://advanced-docs.example.com/og-image.png',
		twitterHandle: '@advancedcompany'
	},
	company: {
		name: 'Advanced Company',
		website: 'https://advanced.example.com',
		logo: 'https://advanced.example.com/logo.svg',
		logoAlt: 'Advanced Company Logo',
		email: 'support@advanced.example.com',
		phone: '+1-555-123-4567',
		address: '123 Tech Street, Innovation City, IC 12345',
		social: {
			github: 'https://github.com/advancedcompany',
			twitter: 'https://twitter.com/advancedcompany',
			linkedin: 'https://linkedin.com/company/advancedcompany',
			discord: 'https://discord.gg/advancedcompany',
			youtube: 'https://youtube.com/@advancedcompany'
		}
	},
	navigation: {
		main: [
			{ label: 'Home', href: '/', icon: '🏠' },
			{ label: 'Quick Start', href: '/quick-start', icon: '⚡', badge: 'New' },
			{
				label: 'Documentation',
				href: '/docs',
				icon: '📖',
				children: [
					{ label: 'Installation', href: '/docs/installation' },
					{ label: 'Configuration', href: '/docs/configuration' },
					{ label: 'Usage', href: '/docs/usage' },
					{ label: 'Advanced', href: '/docs/advanced' }
				]
			},
			{
				label: 'Components',
				href: '/components',
				icon: '🧩',
				children: [
					{ label: 'Layout', href: '/components/layout' },
					{ label: 'Navigation', href: '/components/navigation' },
					{ label: 'Forms', href: '/components/forms' },
					{ label: 'Data Display', href: '/components/data-display' },
					{ label: 'Feedback', href: '/components/feedback' }
				]
			},
			{
				label: 'Examples',
				href: '/examples',
				icon: '💡',
				children: [
					{ label: 'Basic Usage', href: '/examples/basic' },
					{ label: 'Advanced Patterns', href: '/examples/advanced' },
					{ label: 'Integration', href: '/examples/integration' }
				]
			},
			{ label: 'API Reference', href: '/api', icon: '📚' },
			{ label: 'Changelog', href: '/changelog', icon: '📝' },
			{ label: 'Support', href: '/support', icon: '💬' }
		],
		footer: [
			{ label: 'Privacy Policy', href: '/privacy' },
			{ label: 'Terms of Service', href: '/terms' },
			{ label: 'License', href: '/license' },
			{ label: 'Contact', href: '/contact' }
		]
	},
	theme: {
		colors: {
			primary: '#6366f1',
			primaryDark: '#4f46e5',
			secondary: '#1e293b',
			dark: '#0f172a',
			success: '#10b981',
			warning: '#f59e0b',
			danger: '#ef4444',
			info: '#06b6d4'
		},
		fonts: {
			body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
			heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
			mono: '"Fira Code", "Cascadia Code", "Roboto Mono", monospace'
		},
		components: {
			navbar: {
				height: '64px'
			},
			sidebar: {
				width: '320px'
			}
		}
	},
	features: {
		search: true,
		tableOfContents: true,
		breadcrumbs: true,
		editOnGitHub: true,
		lastModified: true,
		nextPrevious: true,
		copyCode: true,
		darkMode: true,
		analyticsScripts: [
			'<script defer data-domain="docs.example.com" src="https://plausible.io/js/script.js"></script>'
		],
		github: {
			repo: 'advancedcompany/advanced-docs',
			branch: 'main',
			docsPath: 'src/content'
		}
	}
};

// SvelteKit-specific configuration
export const svelteKitConfig: PartialDocsConfig = {
	site: {
		title: 'SvelteKit Documentation',
		description: 'Complete guide to building modern web applications with SvelteKit',
		keywords: ['sveltekit', 'svelte', 'web development', 'typescript'],
		author: 'SvelteKit Team',
		language: 'en'
	},
	company: {
		name: 'SvelteKit',
		website: 'https://kit.svelte.dev',
		social: {
			github: 'https://github.com/sveltejs/kit',
			twitter: 'https://twitter.com/sveltejs',
			discord: 'https://svelte.dev/chat'
		}
	},
	navigation: {
		main: [
			{ label: 'Home', href: '/', icon: '🏠' },
			{ label: 'Tutorial', href: '/tutorial', icon: '🎓' },
			{
				label: 'Documentation',
				href: '/docs',
				icon: '📖',
				children: [
					{ label: 'Introduction', href: '/docs/introduction' },
					{ label: 'Creating a project', href: '/docs/creating-a-project' },
					{ label: 'Project structure', href: '/docs/project-structure' },
					{ label: 'Routing', href: '/docs/routing' },
					{ label: 'Loading data', href: '/docs/loading-data' },
					{ label: 'Form actions', href: '/docs/form-actions' },
					{ label: 'Hooks', href: '/docs/hooks' },
					{ label: 'Modules', href: '/docs/modules' },
					{ label: 'Adapters', href: '/docs/adapters' },
					{ label: 'Configuration', href: '/docs/configuration' }
				]
			},
			{ label: 'FAQ', href: '/faq', icon: '❓' },
			{ label: 'Migration', href: '/migration', icon: '🔄' },
			{ label: 'Glossary', href: '/glossary', icon: '📖' }
		]
	},
	theme: {
		colors: {
			primary: '#ff3e00',
			primaryDark: '#cc3200',
			secondary: '#676778'
		}
	}
};

// Minimal configuration example
export const minimalConfig: PartialDocsConfig = {
	site: {
		title: 'Simple Docs'
	},
	company: {
		name: 'My Project'
	},
	navigation: {
		main: [
			{ label: 'Home', href: '/' },
			{ label: 'Docs', href: '/docs' },
			{ label: 'About', href: '/about' }
		]
	}
};