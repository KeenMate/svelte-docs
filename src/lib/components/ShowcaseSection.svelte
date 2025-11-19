<script lang="ts">
	interface Props {
		titleText: string;
		subtitleText?: string;
		/** Unique ID for anchor links (will be applied to h2 element) */
		idText?: string;
		demoContent?: import('svelte').Snippet;
		controlsContent?: import('svelte').Snippet;
		descriptionContent?: import('svelte').Snippet;
		// Column name customization
		demoColumnTitle?: string;
		controlsColumnTitle?: string;
		descriptionColumnTitle?: string;
	}

	let {
		titleText,
		subtitleText,
		idText,
		demoContent,
		controlsContent,
		descriptionContent,
		demoColumnTitle = "Demo",
		controlsColumnTitle = "Controls",
		descriptionColumnTitle = "Description"
	}: Props = $props();
</script>

<div class="showcase-section mb-5">
	<div class="row mb-4">
		<div class="col-12">
			<h2 id={idText}>{titleText}</h2>
			{#if subtitleText}
				<p class="text-muted">{subtitleText}</p>
			{/if}
		</div>
	</div>

	<div class="row">
		<div class="col-lg-4">
			<h5 class="text-primary">{demoColumnTitle}</h5>
			{@render demoContent?.()}
		</div>

		<div class="col-lg-4">
			<h5 class="text-success">{controlsColumnTitle}</h5>
			<div class="controls-container">
				{@render controlsContent?.()}
			</div>
		</div>

		<div class="col-lg-4">
			<h5 class="text-info">{descriptionColumnTitle}</h5>
			<div class="description-container">
				{@render descriptionContent?.()}
			</div>
		</div>
	</div>
</div>