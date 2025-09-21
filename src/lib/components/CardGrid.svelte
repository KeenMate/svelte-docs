<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- Simple wrapper that expects FeatureCards to be wrapped in Bootstrap columns -->
<div class="row g-4 card-grid">
	{@render children?.()}
</div>

<style>
	.card-grid {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	/* Ensure all cards in grid have same height */
	:global(.card-grid .card) {
		height: 100%;
	}
</style>