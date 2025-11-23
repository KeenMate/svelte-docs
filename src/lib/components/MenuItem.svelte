<script lang="ts">
	import type { Snippet } from 'svelte';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		/** Link URL */
		hrefUrl: string;
		/** Menu item text */
		labelText: string;
		/** Icon content (slot) */
		iconContent?: Snippet;
		/** Optional tooltip text */
		tooltipText?: string;
		/** Whether this item is active/selected */
		isActive?: boolean;
		/** Whether this item is disabled */
		isDisabled?: boolean;
		/** Whether this is an external link */
		isExternal?: boolean;
		/** Target window/frame for the link */
		targetWindow?: '_self' | '_blank' | '_parent' | '_top' | string;
		/** Optional badge text */
		badgeText?: string;
		/** Badge variant type */
		badgeVariantType?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
		/** CSS class for custom styling */
		cssClass?: string;
	}

	let {
		hrefUrl,
		labelText,
		iconContent,
		tooltipText,
		isActive = false,
		isDisabled = false,
		isExternal = false,
		targetWindow = '_self',
		badgeText,
		badgeVariantType = 'secondary',
		cssClass = ''
	}: Props = $props();

	let linkElement: HTMLAnchorElement;
	let isHovered = $state(false);
	let isFocused = $state(false);

	// Show tooltip when hovered or focused
	let isTooltipVisible = $derived.by(() => {
		return (isHovered || isFocused) && !!tooltipText && !isDisabled;
	});

	// Generate unique tooltip ID for accessibility
	let tooltipId = $derived.by(() => {
		if (!tooltipText) return undefined;
		return `tooltip-${Math.random().toString(36).substring(2, 9)}`;
	});

	// Determine link attributes based on target and external properties
	let linkAttributes = $derived.by(() => {
		const attrs: Record<string, string> = {
			target: targetWindow
		};

		// Add security attributes for external links or _blank targets
		if (isExternal || targetWindow === '_blank') {
			attrs.rel = 'noopener noreferrer';
		}

		return attrs;
	});

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}

	function handleFocus() {
		isFocused = true;
	}

	function handleBlur() {
		isFocused = false;
	}
</script>

<li class="menu-item {cssClass}">
	<a
		bind:this={linkElement}
		href={hrefUrl}
		class="menu-link"
		class:active={isActive}
		class:disabled={isDisabled}
		aria-disabled={isDisabled}
		aria-describedby={tooltipId}
		{...linkAttributes}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onfocus={handleFocus}
		onblur={handleBlur}
	>
		{#if iconContent}
			<span class="menu-icon" aria-hidden="true">
				{@render iconContent()}
			</span>
		{/if}

		<span class="menu-label">{labelText}</span>

		{#if badgeText}
			<span class="badge badge-{badgeVariantType} menu-badge">
				{badgeText}
			</span>
		{/if}

		{#if isExternal}
			<span class="external-icon" aria-hidden="true">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
					<polyline points="15,3 21,3 21,9"></polyline>
					<line x1="10" y1="14" x2="21" y2="3"></line>
				</svg>
			</span>
		{/if}
	</a>

	<Tooltip
		tooltipText={tooltipText || ''}
		targetElement={linkElement}
		isVisible={isTooltipVisible}
	/>
</li>