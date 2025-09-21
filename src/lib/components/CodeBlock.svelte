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
	<pre class="code-content" class:has-title={!!titleText}>
		<CodeRenderer
			htmlContent={highlightedCode || codeContent}
			languageType={languageType}
		/>
	</pre>
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

	.code-content {
		margin: 0;
		padding: 1rem;
		background-color: #1e293b;
		color: #e2e8f0;
		overflow-x: auto;
		font-family: 'Courier New', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
		font-size: 0.9em;
		line-height: 1.5;
	}

	.code-content.has-title {
		padding-top: 0.75rem;
	}


	/* Highlight.js theme customization for dark theme */
	:global(.code-content .hljs-keyword),
	:global(.code-content .hljs-selector-tag),
	:global(.code-content .hljs-literal),
	:global(.code-content .hljs-section),
	:global(.code-content .hljs-link) {
		color: #c792ea;
	}

	:global(.code-content .hljs-string),
	:global(.code-content .hljs-attr) {
		color: #c3e88d;
	}

	:global(.code-content .hljs-comment),
	:global(.code-content .hljs-quote) {
		color: #546e7a;
		font-style: italic;
	}

	:global(.code-content .hljs-number),
	:global(.code-content .hljs-regexp),
	:global(.code-content .hljs-literal) {
		color: #f78c6c;
	}

	:global(.code-content .hljs-function),
	:global(.code-content .hljs-title) {
		color: #82aaff;
	}

	:global(.code-content .hljs-variable),
	:global(.code-content .hljs-template-variable) {
		color: #f07178;
	}

	:global(.code-content .hljs-tag),
	:global(.code-content .hljs-name) {
		color: #f07178;
	}

	:global(.code-content .hljs-type),
	:global(.code-content .hljs-class),
	:global(.code-content .hljs-built_in) {
		color: #ffcb6b;
	}

	:global(.code-content .hljs-attribute) {
		color: #c792ea;
	}

	:global(.code-content .hljs-symbol),
	:global(.code-content .hljs-bullet),
	:global(.code-content .hljs-link) {
		color: #82aaff;
	}
</style>