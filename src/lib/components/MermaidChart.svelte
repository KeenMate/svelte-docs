<script lang="ts">
	import { onMount } from 'svelte';
	import mermaid from 'mermaid';

	interface Props {
		chartDefinition: string;
		titleText?: string;
		themeType?: 'default' | 'dark' | 'forest' | 'neutral';
	}

	let { chartDefinition, titleText, themeType = 'default' }: Props = $props();

	let chartContainer: HTMLDivElement;
	let rendered = $state(false);
	let error = $state<string | null>(null);

	// Re-initialize Mermaid when theme changes
	$effect(() => {
		mermaid.initialize({
			startOnLoad: false,
			theme: themeType,
			securityLevel: 'loose',
			fontFamily: 'inherit'
		});
	});

	// Re-render when chart definition or container changes
	$effect(() => {
		if (chartDefinition && chartContainer) {
			renderChart();
		}
	});

	async function renderChart() {
		if (!chartContainer) return;

		try {
			error = null;
			rendered = false;

			// Clear previous render
			chartContainer.innerHTML = '';

			// Generate unique ID for this chart
			const chartId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

			// Render the chart
			const { svg } = await mermaid.render(chartId, chartDefinition);
			chartContainer.innerHTML = svg;

			rendered = true;
		} catch (err) {
			console.error('Mermaid rendering failed:', err);
			error = err instanceof Error ? err.message : 'Failed to render chart';
		}
	}
</script>

<div class="mermaid-chart">
	{#if titleText}
		<div class="chart-header">
			<span class="chart-title">{titleText}</span>
		</div>
	{/if}
	<div class="chart-content">
		{#if error}
			<div class="chart-error">
				<strong>Chart Rendering Error:</strong>
				<pre>{error}</pre>
			</div>
		{:else}
			<div bind:this={chartContainer} class="chart-container"></div>
		{/if}
	</div>
</div>
