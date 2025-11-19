<script lang="ts">
	import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { onMount } from 'svelte';
	import { configStore } from '../stores/config.svelte.js';
	import type { Placement } from '@floating-ui/dom';

	interface Props {
		tooltipText: string;
		targetElement: HTMLElement | null;
		isVisible: boolean;
	}

	let { tooltipText, targetElement, isVisible }: Props = $props();

	// Get tooltip config from store
	let tooltipConfig = $derived(configStore.theme?.components?.tooltip);

	let tooltipElement: HTMLElement;
	let arrowElement: HTMLElement;
	let isMobile = $state(false);
	let showDelayTimeout: ReturnType<typeof setTimeout> | null = null;
	let actuallyVisible = $state(false);

	// Check if tooltips are enabled and if we should show on this device
	let shouldShowTooltip = $derived.by(() => {
		if (tooltipConfig?.isEnabled === false) return false;
		if (isMobile && !tooltipConfig?.showOnMobile) return false;
		return true;
	});

	// Get placement from config or use default
	let placement = $derived.by(() => {
		return (tooltipConfig?.placement || 'right') as Placement;
	});

	// Check if we're on mobile device
	onMount(() => {
		const checkMobile = () => {
			isMobile = window.matchMedia('(max-width: 991.98px)').matches;
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	// Handle show/hide delays
	$effect(() => {
		if (showDelayTimeout) {
			clearTimeout(showDelayTimeout);
			showDelayTimeout = null;
		}

		if (isVisible && shouldShowTooltip) {
			const delay = tooltipConfig?.showDelay || 0;
			if (delay > 0) {
				showDelayTimeout = setTimeout(() => {
					actuallyVisible = true;
				}, delay);
			} else {
				actuallyVisible = true;
			}
		} else {
			const hideDelay = tooltipConfig?.hideDelay || 0;
			if (hideDelay > 0 && actuallyVisible) {
				showDelayTimeout = setTimeout(() => {
					actuallyVisible = false;
				}, hideDelay);
			} else {
				actuallyVisible = false;
			}
		}

		return () => {
			if (showDelayTimeout) {
				clearTimeout(showDelayTimeout);
			}
		};
	});

	// Update tooltip position when visibility or target changes
	$effect(() => {
		if (actuallyVisible && targetElement && tooltipElement && shouldShowTooltip) {
			updatePosition();
		}
	});

	async function updatePosition() {
		if (!targetElement || !tooltipElement) return;

		const fallbackPlacements: Placement[] = placement === 'right'
			? ['top', 'bottom', 'left']
			: placement === 'left'
			? ['top', 'bottom', 'right']
			: placement === 'top'
			? ['right', 'bottom', 'left']
			: ['right', 'top', 'left']; // bottom

		const { x, y, placement: finalPlacement, middlewareData } = await computePosition(targetElement, tooltipElement, {
			placement,
			middleware: [
				offset(8),
				flip({
					fallbackPlacements
				}),
				shift({ padding: 8 }),
				arrow({ element: arrowElement })
			]
		});

		Object.assign(tooltipElement.style, {
			left: `${x}px`,
			top: `${y}px`
		});

		// Position arrow
		if (middlewareData.arrow) {
			const { x: arrowX, y: arrowY } = middlewareData.arrow;
			const staticSide = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right'
			}[finalPlacement.split('-')[0]];

			Object.assign(arrowElement.style, {
				left: arrowX != null ? `${arrowX}px` : '',
				top: arrowY != null ? `${arrowY}px` : '',
				right: '',
				bottom: '',
				[staticSide!]: '-4px'
			});
		}
	}
</script>

{#if actuallyVisible && shouldShowTooltip && tooltipText}
	<div
		bind:this={tooltipElement}
		class="tooltip-floating"
		role="tooltip"
	>
		{tooltipText}
		<div bind:this={arrowElement} class="tooltip-arrow"></div>
	</div>
{/if}

<style lang="scss">
	.tooltip-floating {
		position: absolute;
		top: 0;
		left: 0;
		background-color: var(--tooltip-bg, rgba(0, 0, 0, 0.9));
		color: var(--tooltip-color, white);
		padding: var(--tooltip-padding, 0.5rem 0.75rem);
		border-radius: var(--tooltip-border-radius, 0.375rem);
		font-size: var(--tooltip-font-size, 0.875rem);
		white-space: nowrap;
		z-index: var(--tooltip-z-index, 1060);
		pointer-events: none;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		max-width: var(--tooltip-max-width, 300px);
		word-wrap: break-word;
	}

	.tooltip-arrow {
		position: absolute;
		width: var(--tooltip-arrow-size, 8px);
		height: var(--tooltip-arrow-size, 8px);
		background-color: var(--tooltip-bg, rgba(0, 0, 0, 0.9));
		transform: rotate(45deg);
	}
</style>
