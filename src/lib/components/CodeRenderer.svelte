<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		/** HTML content to render */
		htmlContent: string;
		/** Language type for the code element */
		languageType?: string;
		/** CSS class for the code element */
		cssClass?: string;
		/** CSS class for the pre element */
		preClass?: string;
		/** Whether this pre has a title (affects padding) */
		hasTitle?: boolean;
	}

	let { htmlContent, languageType = 'text', cssClass = '', preClass = '', hasTitle = false }: Props = $props();

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

<!-- Pre container with dynamically created code element -->
<pre class="code-content {preClass}" class:has-title={hasTitle} bind:this={containerElement}></pre>

