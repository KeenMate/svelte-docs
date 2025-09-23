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

<style>
	.code-block {
		position: relative;
		margin: 1rem 0;
		border-radius: 0.5rem;
		overflow: hidden;
		background-color: #1e293b;
	}

	.code-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background-color: #334155;
		border-bottom: 1px solid #475569;
	}

	.code-title {
		color: #e2e8f0;
		font-size: 0.9em;
		font-weight: 500;
	}

	.copy-button {
		background: none;
		border: 1px solid #475569;
		color: #94a3b8;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		cursor: pointer;
		font-size: 0.8em;
		transition: all 0.2s;
	}

	.copy-button:hover {
		background-color: #475569;
		color: #e2e8f0;
	}

	.copy-button.floating {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.375rem;
		border-radius: 0.375rem;
		background-color: #334155;
	}



</style>