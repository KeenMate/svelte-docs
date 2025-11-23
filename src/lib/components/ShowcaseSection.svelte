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
		col1Title?: string;
		col2Title?: string;
		col3Title?: string;
		// Layout configuration
		columnCountType?: 2 | 3;
		leftColumnSize?: number;
		rightColumnSize?: number;
		middleColumnSize?: number;
	}

	let {
		titleText,
		subtitleText,
		idText,
		demoContent,
		controlsContent,
		descriptionContent,
		col1Title = "Demo",
		col2Title = "Controls",
		col3Title = "Description",
		columnCountType = 3,
		leftColumnSize,
		rightColumnSize,
		middleColumnSize
	}: Props = $props();

	// Calculate column sizes based on layout
	const columnSizes = $derived.by(() => {
		if (columnCountType === 3) {
			// 3-column layout
			const left = leftColumnSize ?? 4;
			const middle = middleColumnSize ?? 4;
			const right = rightColumnSize ?? (12 - left - middle);

			// Validate that columns sum to 12
			if (left + middle + right !== 12) {
				console.warn(`ShowcaseSection: Column sizes must sum to 12. Got ${left} + ${middle} + ${right} = ${left + middle + right}. Using default 4-4-4.`);
				return { left: 4, middle: 4, right: 4 };
			}

			return { left, middle, right };
		} else {
			// 2-column layout
			const left = leftColumnSize ?? 6;
			const right = rightColumnSize ?? (12 - left);

			// Validate that columns sum to 12
			if (left + right !== 12) {
				console.warn(`ShowcaseSection: Column sizes must sum to 12. Got ${left} + ${right} = ${left + right}. Using default 6-6.`);
				return { left: 6, right: 6 };
			}

			return { left, right };
		}
	});
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
		{#if columnCountType === 3}
			<!-- 3-column layout -->
			<div class="col-lg-{columnSizes.left}">
				<h5 class="text-primary">{col1Title}</h5>
				{@render demoContent?.()}
			</div>

			<div class="col-lg-{columnSizes.middle}">
				<h5 class="text-success">{col2Title}</h5>
				<div class="controls-container">
					{@render controlsContent?.()}
				</div>
			</div>

			<div class="col-lg-{columnSizes.right}">
				<h5 class="text-info">{col3Title}</h5>
				<div class="description-container">
					{@render descriptionContent?.()}
				</div>
			</div>
		{:else}
			<!-- 2-column layout -->
			<div class="col-lg-{columnSizes.left}">
				<h5 class="text-primary">{col1Title}</h5>
				{@render demoContent?.()}
			</div>

			<div class="col-lg-{columnSizes.right}">
				<h5 class="text-success">{col2Title}</h5>
				<div class="controls-container">
					{@render controlsContent?.()}
				</div>
			</div>
		{/if}
	</div>
</div>