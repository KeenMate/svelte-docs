<script lang="ts">
	import { page } from '$app/stores';
	import { configStore } from '../stores/config.svelte.js';
	import type { NavigationItem } from '../types/config.js';

	interface Props {
		titleText?: string;
		descriptionText?: string;
		isNavigationVisible?: boolean;
		areBreadcrumbsVisible?: boolean;
		children: import('svelte').Snippet;
	}

	let {
		titleText,
		descriptionText,
		isNavigationVisible = true,
		areBreadcrumbsVisible = true,
		children
	}: Props = $props();

	// Reactive values from config store
	let siteConfig = $derived(configStore.site);
	let companyConfig = $derived(configStore.company);
	let navigationConfig = $derived(configStore.navigation);
	let featuresConfig = $derived(configStore.features);

	// Page metadata
	let pageTitle = $derived.by(() => {
		const siteTitle = siteConfig?.title || 'Documentation';
		return titleText ? `${titleText} - ${siteTitle}` : siteTitle;
	});

	let pageDescription = $derived.by(() => {
		return descriptionText || siteConfig?.description || '';
	});

	// Breadcrumbs
	let breadcrumbItems = $derived.by(() => {
		if (!areBreadcrumbsVisible || !featuresConfig?.breadcrumbs) return [];
		return configStore.getBreadcrumbs($page.url.pathname);
	});

	// Sidebar state
	let isSidebarVisible = $state(true);
	let expandedMenuItems = $state<Set<string>>(new Set());

	function toggleSidebar() {
		isSidebarVisible = !isSidebarVisible;
	}

	function closeSidebarOnMobile() {
		if (typeof window !== 'undefined' && window.innerWidth < 992) {
			isSidebarVisible = false;
		}
	}

	function toggleSubmenu(itemLabelText: string) {
		const newExpanded = new Set(expandedMenuItems);
		if (newExpanded.has(itemLabelText)) {
			newExpanded.delete(itemLabelText);
		} else {
			newExpanded.add(itemLabelText);
		}
		expandedMenuItems = newExpanded;
	}

	function isItemActive(navItem: any): boolean {
		// Check if the current path matches the item or any of its children
		if ($page.url.pathname === navItem.href) return true;
		if (navItem.children) {
			return navItem.children.some((childItem: any) => $page.url.pathname === childItem.href);
		}
		return false;
	}

	function shouldExpandMenu(menuItem: any): boolean {
		// Auto-expand if current page is in this menu
		if (isItemActive(menuItem)) return true;
		// Otherwise check manual expansion state
		return expandedMenuItems.has(menuItem.label);
	}
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	{#if pageTitle}
		<title>{pageTitle}</title>
		<meta property="og:title" content={pageTitle} />
	{/if}
	{#if pageDescription}
		<meta name="description" content={pageDescription} />
		<meta property="og:description" content={pageDescription} />
	{/if}
</svelte:head>

<!-- Top Navigation Bar -->
<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
	<div class="container-fluid">
		{#if isNavigationVisible}
			<!-- Burger menu button -->
			<button
				class="navbar-toggler me-2"
				onclick={toggleSidebar}
				aria-label="Toggle navigation"
				type="button"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
		{/if}

		<!-- Brand -->
		<a class="navbar-brand text-white" href="/">
			{#if companyConfig?.logo}
				<img
					src={companyConfig.logo}
					alt={companyConfig.logoAlt || companyConfig.name}
					height="32"
					class="me-2"
				/>
			{/if}
			<strong>{siteConfig?.title || 'Documentation'}</strong>
			{#if companyConfig?.name && siteConfig?.title !== companyConfig.name}
				<small class="text-white-50 ms-2">{companyConfig.name}</small>
			{/if}
		</a>

		<!-- Navigation actions -->
		<div class="navbar-nav ms-auto d-flex flex-row">
			{#if featuresConfig?.search}
				<button class="nav-link text-white me-2" aria-label="Search">
					🔍
				</button>
			{/if}

			{#if companyConfig?.social?.github}
				<a
					class="nav-link text-white"
					href={companyConfig.social.github}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
				>
					<svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
						<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
					</svg>
					<span class="ms-1 d-none d-md-inline">GitHub</span>
				</a>
			{/if}
		</div>
	</div>
</nav>

<div class="d-flex main-wrapper">
	{#if isNavigationVisible}
		<!-- Backdrop for mobile -->
		{#if isSidebarVisible}
			<div
				class="sidebar-backdrop d-lg-none"
				onclick={toggleSidebar}
				onkeydown={(e) => e.key === 'Escape' && toggleSidebar()}
				role="button"
				tabindex="-1"
				aria-label="Close sidebar"
			></div>
		{/if}

		<!-- Sidebar -->
		<nav class="sidebar text-white p-0 {isSidebarVisible ? 'd-block' : 'd-none'}">
			<div class="nav nav-pills flex-column p-3">
				{#if navigationConfig?.main}
					{#each navigationConfig.main as navItem}
						{#if navItem.children}
							<!-- Parent item with children -->
							<button
								class="nav-link text-white mb-2 d-flex align-items-center justify-content-between {isItemActive(navItem) ? 'active bg-primary' : ''}"
								style="border-radius: 0.5rem;"
								onclick={() => toggleSubmenu(navItem.label)}
								type="button"
							>
								<span class="d-flex align-items-center">
									{#if navItem.icon}
										<span class="me-2">{navItem.icon}</span>
									{/if}
									{navItem.label}
									{#if navItem.badge}
										<small class="badge bg-secondary ms-2">{navItem.badge}</small>
									{/if}
								</span>
								<span class="ms-auto" style="transition: transform 0.2s; transform: rotate({shouldExpandMenu(navItem) ? '90deg' : '0deg'});">
									▶
								</span>
							</button>

							<!-- Collapsible children -->
							{#if shouldExpandMenu(navItem)}
								<div class="nav-children mb-2" style="animation: slideDown 0.2s ease-out; margin-left: 1.25rem;">
									{#each navItem.children as childItem}
										<a
											href={childItem.href}
											class="nav-link text-white-75 mb-1 small {$page.url.pathname === childItem.href ? 'active bg-info' : ''}"
											style="border-radius: 0.375rem; padding: 0.375rem 0.75rem;"
											onclick={closeSidebarOnMobile}
											target={childItem.external ? '_blank' : undefined}
											rel={childItem.external ? 'noopener noreferrer' : undefined}
										>
											{#if childItem.icon}
												<span class="me-1">{childItem.icon}</span>
											{/if}
											{childItem.label}
											{#if childItem.badge}
												<small class="badge bg-warning text-dark ms-2">{childItem.badge}</small>
											{/if}
											{#if childItem.external}
												<small class="ms-1">↗</small>
											{/if}
										</a>
									{/each}
								</div>
							{/if}
						{:else}
							<!-- Regular item without children -->
							<a
								href={navItem.href}
								class="nav-link text-white mb-2 d-flex align-items-center justify-content-between {$page.url.pathname === navItem.href ? 'active bg-primary' : ''}"
								style="border-radius: 0.5rem;"
								onclick={closeSidebarOnMobile}
								target={navItem.external ? '_blank' : undefined}
								rel={navItem.external ? 'noopener noreferrer' : undefined}
							>
								<span class="d-flex align-items-center">
									{#if navItem.icon}
										<span class="me-2">{navItem.icon}</span>
									{/if}
									{navItem.label}
									{#if navItem.badge}
										<small class="badge bg-secondary ms-2">{navItem.badge}</small>
									{/if}
								</span>
								{#if navItem.external}
									<small class="ms-auto">↗</small>
								{/if}
							</a>
						{/if}
					{/each}
				{/if}
			</div>
		</nav>
	{/if}

	<!-- Main content -->
	<main class="flex-fill overflow-auto">
		<div class="container-fluid p-4">
			<!-- Breadcrumbs -->
			{#if breadcrumbItems.length > 1}
				<nav aria-label="breadcrumb" class="mb-3">
					<ol class="breadcrumb">
						{#each breadcrumbItems as crumbItem, index}
							{#if index < breadcrumbItems.length - 1}
								<li class="breadcrumb-item">
									<a href={crumbItem.href}>{crumbItem.label}</a>
								</li>
							{:else}
								<li class="breadcrumb-item active" aria-current="page">
									{crumbItem.label}
								</li>
							{/if}
						{/each}
					</ol>
				</nav>
			{/if}

			<!-- Page content -->
			{@render children?.()}
		</div>
	</main>
</div>

<!-- Footer -->
<footer class="text-white text-center py-3">
	<div class="container-fluid">
		<small>
			{#if companyConfig?.website}
				Made with ❤️ by
				<a
					href={companyConfig.website}
					target="_blank"
					rel="noopener noreferrer"
					class="text-decoration-none"
				>
					<strong>{companyConfig.name}</strong>
				</a>
			{:else if companyConfig?.name}
				Made with ❤️ by <strong>{companyConfig.name}</strong>
			{:else}
				Made with ❤️ for documentation sites
			{/if}
		</small>

		{#if navigationConfig?.social || configStore.getSocialLinks().length > 0}
			<div class="mt-2">
				{#each configStore.getSocialLinks() as social}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-white mx-2"
						aria-label={social.label}
						title={social.label}
					>
						{social.icon}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</footer>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		line-height: 1.6;
		color: #333;
		background-color: #fafafa;
	}


	:global(h1) {
		color: #2563eb;
		margin-bottom: 1rem;
	}

	:global(h2) {
		color: #1e40af;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(h3) {
		color: #3730a3;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(code) {
		background-color: #f1f5f9;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-family: 'Courier New', monospace;
		font-size: 0.9em;
	}

	:global(pre) {
		background-color: #1e293b;
		color: #e2e8f0;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1rem 0;
	}

	:global(pre code) {
		background-color: transparent;
		padding: 0;
		color: inherit;
	}

	:global(ul) {
		padding-left: 1.5rem;
	}

	:global(li) {
		margin-bottom: 0.5rem;
	}

	:global(a) {
		color: #2563eb;
		text-decoration: none;
	}

	:global(a:hover) {
		text-decoration: underline;
	}

	:global(blockquote) {
		border-left: 4px solid #e2e8f0;
		margin: 1rem 0;
		padding-left: 1rem;
		color: #64748b;
	}

	:global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}

	:global(th, td) {
		border: 1px solid #e2e8f0;
		padding: 0.5rem;
		text-align: left;
	}

	:global(th) {
		background-color: #f8fafc;
		font-weight: 600;
	}

	/* Sidebar submenu animation */
	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.nav-children {
		border-left: 2px solid rgba(255, 255, 255, 0.2);
		padding-left: 1rem;
		/* Extra padding to align with parent icon center */
	}

	.nav-link:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	button.nav-link {
		width: 100%;
		border: none;
		background: none;
		cursor: pointer;
	}

	button.nav-link:focus {
		box-shadow: none;
		outline: none;
	}

	button.nav-link.active {
		background-color: var(--bs-primary);
	}
</style>