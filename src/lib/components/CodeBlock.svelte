<script lang="ts">
	import { onMount } from 'svelte';
	import hljs from 'highlight.js';
	import CodeRenderer from './CodeRenderer.svelte';

	interface Props {
		codeContent: string;
		languageType?: string;
		titleText?: string;
		isCopyable?: boolean;
	}

	let { codeContent, languageType = 'text', titleText, isCopyable = true }: Props = $props();

	let copied = $state(false);
	let highlightedCode = $state('');

	// Highlight code when component mounts or props change
	$effect(() => {
		if (codeContent) {
			try {
				if (languageType && languageType !== 'text' && hljs.getLanguage(languageType)) {
					const result = hljs.highlight(codeContent, { language: languageType });
					highlightedCode = result.value;
				} else {
					// Auto-detect language if not specified or not supported
					const result = hljs.highlightAuto(codeContent);
					highlightedCode = result.value;
				}
			} catch (error) {
				console.warn('Code highlighting failed:', error);
				highlightedCode = codeContent; // Fallback to plain text
			}
		}
	});

	function copyToClipboard() {
		navigator.clipboard.writeText(codeContent);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="code-block">
	{#if titleText}
		<div class="code-header">
			<span class="code-title">{titleText}</span>
			{#if isCopyable}
				<button class="copy-button" onclick={copyToClipboard}>
					{copied ? '✓ Copied' : '📋 Copy'}
				</button>
			{/if}
		</div>
	{/if}
	<CodeRenderer
		htmlContent={highlightedCode || codeContent}
		languageType={languageType}
		hasTitle={!!titleText}
	/>
	{#if !titleText && isCopyable}
		<button class="copy-button floating" onclick={copyToClipboard}>
			{copied ? '✓' : '📋'}
		</button>
	{/if}
</div>