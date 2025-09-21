<script lang="ts">
	import type { Snippet } from 'svelte';

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
</script>

<li class="menu-item {cssClass}">
	<a
		href={hrefUrl}
		class="menu-link"
		class:active={isActive}
		class:disabled={isDisabled}
		aria-disabled={isDisabled}
		aria-describedby={tooltipId}
		{...linkAttributes}
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

	{#if tooltipText && tooltipId}
		<div class="tooltip" id={tooltipId} role="tooltip">
			{tooltipText}
		</div>
	{/if}
</li>

<style>
	.menu-item {
		position: relative;
		margin-bottom: 0.25rem;
	}

	.menu-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		color: var(--docs-body-color, #374151);
		text-decoration: none;
		border-radius: 0.5rem;
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.25rem;
		transition: all 0.2s ease-in-out;
		background-color: transparent;
		border: 1px solid transparent;
		position: relative;
		cursor: pointer;
	}

	.menu-link:hover:not(.disabled) {
		background-color: var(--docs-light, #f8f9fa);
		color: var(--docs-primary, #00A7E1);
		border-color: var(--docs-border, #dee2e6);
	}

	.menu-link.active {
		background-color: var(--docs-primary, #00A7E1);
		color: white;
		font-weight: 600;
	}

	.menu-link.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	.menu-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}

	.menu-icon :global(svg) {
		width: 100%;
		height: 100%;
	}

	.menu-label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.menu-badge {
		font-size: 0.75rem;
		padding: 0.125rem 0.5rem;
		border-radius: 0.25rem;
		font-weight: 500;
		line-height: 1;
		flex-shrink: 0;
	}

	.external-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.6;
		flex-shrink: 0;
	}

	/* Bootstrap badge variants */
	.badge-primary {
		background-color: var(--docs-primary, #00A7E1);
		color: white;
	}

	.badge-secondary {
		background-color: var(--docs-secondary, #003459);
		color: white;
	}

	.badge-success {
		background-color: #198754;
		color: white;
	}

	.badge-danger {
		background-color: #dc3545;
		color: white;
	}

	.badge-warning {
		background-color: #ffc107;
		color: #000;
	}

	.badge-info {
		background-color: #0dcaf0;
		color: #000;
	}

	.badge-light {
		background-color: #f8f9fa;
		color: #000;
		border: 1px solid var(--docs-border, #dee2e6);
	}

	.badge-dark {
		background-color: var(--docs-dark, #00171F);
		color: white;
	}

	/* Tooltip styling */
	.tooltip {
		position: absolute;
		z-index: 1000;
		background-color: var(--docs-dark, #00171F);
		color: white;
		padding: 0.5rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		line-height: 1.2;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		pointer-events: none;
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.2s, visibility 0.2s;
		white-space: nowrap;
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 0.5rem;
	}

	.tooltip::before {
		content: '';
		position: absolute;
		top: 50%;
		left: -0.25rem;
		transform: translateY(-50%);
		border: 0.25rem solid transparent;
		border-right-color: var(--docs-dark, #00171F);
	}

	.menu-item:hover .tooltip {
		opacity: 1;
		visibility: visible;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.menu-link {
			padding: 0.5rem 0.75rem;
			gap: 0.5rem;
		}

		.menu-icon {
			width: 1rem;
			height: 1rem;
		}

		.tooltip {
			display: none; /* Hide tooltips on mobile */
		}
	}
</style>