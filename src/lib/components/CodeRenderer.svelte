<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		/** HTML content to render */
		htmlContent: string;
		/** Language type for the code element */
		languageType?: string;
		/** CSS class for the code element */
		cssClass?: string;
	}

	let { htmlContent, languageType = 'text', cssClass = '' }: Props = $props();

	let containerElement: HTMLElement;

	// Render HTML content safely without whitespace issues
	function renderContent() {
		if (containerElement && htmlContent) {
			// Create the complete <code> element with content
			const codeElement = document.createElement('code');
			codeElement.className = `language-${languageType} ${cssClass}`.trim();
			codeElement.innerHTML = htmlContent?.trim();

			// Clear container and append the code element
			containerElement.innerHTML = '';
			containerElement.appendChild(codeElement);
		}
	}

	// Re-render when content changes
	$effect(() => {
		renderContent();
	});

	onMount(() => {
		renderContent();
	});
</script>

<!-- Container for the dynamically created <code> element -->
<span bind:this={containerElement}></span>

<style>
	/* Styles for the dynamically created code element */
	:global(span > code) {
		background: none;
		padding: 0;
		color: inherit;
		font-size: inherit;
		font-family: 'Courier New', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
	}
</style>