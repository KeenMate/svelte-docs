<script lang="ts">
	import type { NavigationItem } from '../types/config.js';
	import MenuItem from './MenuItem.svelte';

	interface Props {
		navigationItems: NavigationItem[];
		currentPathUrl?: string;
	}

	let { navigationItems, currentPathUrl = '' }: Props = $props();

	function isActive(hrefUrl: string): boolean {
		return currentPathUrl === hrefUrl || currentPathUrl.startsWith(hrefUrl + '/');
	}
</script>

<nav class="navigation">
	<ul class="nav-list">
		{#each navigationItems as navItem}
			<MenuItem
				hrefUrl={navItem.href}
				labelText={navItem.label}
				tooltipText={navItem.tooltip}
				isActive={isActive(navItem.href)}
				isDisabled={navItem.disabled}
				isExternal={navItem.external}
				targetWindow={navItem.target}
				badgeText={navItem.badge}
				cssClass="nav-item-wrapper"
			>
				{#snippet iconContent()}
					{#if navItem.icon}
						<span class="nav-icon">{navItem.icon}</span>
					{/if}
				{/snippet}
			</MenuItem>

			{#if navItem.children && navItem.children.length > 0}
				<ul class="nav-sublist">
					{#each navItem.children as childItem}
						<MenuItem
							hrefUrl={childItem.href}
							labelText={childItem.label}
							tooltipText={childItem.tooltip}
							isActive={isActive(childItem.href)}
							isDisabled={childItem.disabled}
							isExternal={childItem.external}
							targetWindow={childItem.target}
							badgeText={childItem.badge}
							cssClass="nav-subitem-wrapper"
						>
							{#snippet iconContent()}
								{#if childItem.icon}
									<span class="nav-subicon">{childItem.icon}</span>
								{/if}
							{/snippet}
						</MenuItem>
					{/each}
				</ul>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	.navigation {
		background-color: white;
		border-right: 1px solid var(--docs-border, #e2e8f0);
		padding: 1rem;
		min-height: 100vh;
		width: var(--sidebar-width, 280px);
		position: fixed;
		top: 0;
		left: 0;
		overflow-y: auto;
		z-index: 100;
	}

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* Main navigation item styling */
	:global(.nav-item-wrapper) {
		margin-bottom: 0.5rem;
	}

	:global(.nav-item-wrapper .menu-link) {
		font-weight: 600;
		font-size: 0.9rem;
	}

	/* Sub-navigation styling */
	.nav-sublist {
		list-style: none;
		margin: 0.5rem 0 1rem 0;
		padding: 0;
		padding-left: 1.5rem;
		border-left: 2px solid var(--docs-border, #e2e8f0);
	}

	:global(.nav-subitem-wrapper) {
		margin-bottom: 0.25rem;
	}

	:global(.nav-subitem-wrapper .menu-link) {
		padding: 0.5rem 0.75rem;
		font-size: 0.85rem;
		font-weight: 500;
	}

	:global(.nav-subitem-wrapper .menu-link:hover) {
		background-color: var(--docs-light, #f8f9fa);
		border-left: 3px solid var(--docs-primary, #00A7E1);
		padding-left: calc(0.75rem - 3px);
	}

	:global(.nav-subitem-wrapper .menu-link.active) {
		background-color: rgba(var(--docs-primary-rgb, 0, 167, 225), 0.1);
		border-left: 3px solid var(--docs-primary, #00A7E1);
		padding-left: calc(0.75rem - 3px);
		color: var(--docs-primary, #00A7E1);
	}

	/* Icon styling */
	.nav-icon,
	.nav-subicon {
		font-size: 1.1em;
		line-height: 1;
	}

	.nav-subicon {
		font-size: 1em;
		opacity: 0.8;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.navigation {
			display: none;
		}
	}

	/* Dark mode support (future) */
	@media (prefers-color-scheme: dark) {
		.navigation {
			background-color: var(--docs-dark, #1a1a1a);
			border-right-color: var(--docs-border-dark, #374151);
		}
	}
</style>