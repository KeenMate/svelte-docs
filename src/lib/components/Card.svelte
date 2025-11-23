<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		titleText?: string;
		subtitleText?: string;
		variantType?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
		borderVariantType?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
		hasHoverEffect?: boolean;
		headerContent?: Snippet;
		bodyContent?: Snippet;
		footerContent?: Snippet;
		imageUrl?: string;
		imageAltText?: string;
		imagePosition?: 'top' | 'bottom';
	}

	let {
		titleText,
		subtitleText,
		variantType,
		borderVariantType,
		hasHoverEffect = false,
		headerContent,
		bodyContent,
		footerContent,
		imageUrl,
		imageAltText = '',
		imagePosition = 'top'
	}: Props = $props();
</script>

<div
	class="card {hasHoverEffect ? 'card-hover' : ''} {variantType ? `bg-${variantType}` : ''} {borderVariantType ? `border-${borderVariantType}` : ''}"
>
	{#if imageUrl && imagePosition === 'top'}
		<img src={imageUrl} class="card-img-top" alt={imageAltText} />
	{/if}

	{#if headerContent}
		<div class="card-header">
			{@render headerContent()}
		</div>
	{/if}

	<div class="card-body">
		{#if titleText}
			<h5 class="card-title">{titleText}</h5>
		{/if}

		{#if subtitleText}
			<h6 class="card-subtitle mb-2 text-muted">{subtitleText}</h6>
		{/if}

		{#if bodyContent}
			{@render bodyContent()}
		{/if}
	</div>

	{#if footerContent}
		<div class="card-footer">
			{@render footerContent()}
		</div>
	{/if}

	{#if imageUrl && imagePosition === 'bottom'}
		<img src={imageUrl} class="card-img-bottom" alt={imageAltText} />
	{/if}
</div>
