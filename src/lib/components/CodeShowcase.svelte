<script lang="ts">
	import hljs from 'highlight.js';
	import CodeRenderer from './CodeRenderer.svelte';

	interface Props {
		titleText?: string;
		tabItems?: {
			labelText: string;
			codeContent: string;
			languageType?: string;
		}[];
		svelteCodeContent?: string;
		typescriptCodeContent?: string;
		cssCodeContent?: string;
	}

	let {
		titleText = 'Code Example',
		tabItems,
		svelteCodeContent,
		typescriptCodeContent,
		cssCodeContent
	}: Props = $props();

	// Create tabs from individual props if tabs array not provided
	let finalTabItems = $derived.by(() => {
		if (tabItems) return tabItems;

		const generatedTabs = [];
		if (svelteCodeContent) generatedTabs.push({ labelText: 'Svelte', codeContent: svelteCodeContent, languageType: 'svelte' });
		if (typescriptCodeContent) generatedTabs.push({ labelText: 'TypeScript', codeContent: typescriptCodeContent, languageType: 'typescript' });
		if (cssCodeContent) generatedTabs.push({ labelText: 'CSS', codeContent: cssCodeContent, languageType: 'css' });

		return generatedTabs;
	});

	let activeTab = $state(0);
	let copied = $state(false);
	let highlightedCode = $state('');

	// Highlight code when active tab changes
	$effect(() => {
		if (finalTabItems.length > 0 && finalTabItems[activeTab]) {
			const currentTab = finalTabItems[activeTab];
			try {
				if (currentTab.languageType && currentTab.languageType !== 'text' && hljs.getLanguage(currentTab.languageType)) {
					const result = hljs.highlight(currentTab.codeContent, { language: currentTab.languageType });
					highlightedCode = result.value;
				} else {
					// Auto-detect language if not specified or not supported
					const result = hljs.highlightAuto(currentTab.codeContent);
					highlightedCode = result.value;
				}
			} catch (error) {
				console.warn('Code highlighting failed:', error);
				highlightedCode = currentTab.codeContent; // Fallback to plain text
			}
		}
	});

	function copyToClipboard(content: string) {
		navigator.clipboard.writeText(content);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	function getLanguageIcon(languageType?: string) {
		switch (languageType) {
			case 'svelte': return '🟠';
			case 'typescript': return '🔷';
			case 'javascript': return '🟨';
			case 'css': case 'scss': return '🎨';
			case 'html': return '🟧';
			case 'json': return '📄';
			default: return '📝';
		}
	}
</script>

{#if finalTabItems.length > 0}
	<div class="code-showcase">
		{#if titleText}
			<h6 class="mb-3">{titleText}</h6>
		{/if}

		<!-- Tabs Navigation -->
		<ul class="nav nav-tabs code-tabs">
			{#each finalTabItems as tabItem, index}
				<li class="nav-item">
					<button
						class="nav-link {activeTab === index ? 'active' : ''}"
						onclick={() => activeTab = index}
						type="button"
					>
						<span class="me-1">{getLanguageIcon(tabItem.languageType)}</span>
						{tabItem.labelText}
					</button>
				</li>
			{/each}
		</ul>

		<!-- Tab Content -->
		<div class="code-content">
			<button
				class="copy-button {copied ? 'copied' : ''}"
				onclick={() => copyToClipboard(finalTabItems[activeTab].codeContent)}
			>
				{copied ? '✓ Copied' : '📋 Copy'}
			</button>

			<pre>
				<CodeRenderer
					htmlContent={highlightedCode || finalTabItems[activeTab].codeContent}
					languageType={finalTabItems[activeTab].languageType || 'text'}
				/>
			</pre>
		</div>
	</div>
{/if}

<style>
	.code-showcase {
		margin: 1.5rem 0;
	}

	.code-tabs {
		border-bottom: 2px solid #dee2e6;
		margin-bottom: 0;
	}

	.nav-link {
		color: #495057;
		border: none;
		border-bottom: 3px solid transparent;
		border-radius: 0;
		padding: 0.75rem 1rem;
		transition: all 0.2s ease;
		background: none;
		cursor: pointer;
		display: flex;
		align-items: center;

		&:hover {
			color: #00A7E1;
			background-color: rgba(0, 167, 225, 0.05);
		}

		&.active {
			color: #00A7E1;
			background-color: transparent;
			border-bottom-color: #00A7E1;
			font-weight: 500;
		}
	}

	.code-content {
		background-color: #1e293b;
		border-radius: 0 0 0.5rem 0.5rem;
		position: relative;
		min-height: 100px;
	}

	.copy-button {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		background-color: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #94a3b8;
		padding: 0.375rem 0.75rem;
		border-radius: 0.375rem;
		cursor: pointer;
		font-size: 0.8rem;
		transition: all 0.2s;
		z-index: 2;

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
			color: #e2e8f0;
		}

		&.copied {
			background-color: rgba(34, 197, 94, 0.2);
			border-color: rgba(34, 197, 94, 0.4);
			color: #86efac;
		}
	}

	pre {
		margin: 0;
		padding: 1.5rem;
		color: #e2e8f0;
		overflow-x: auto;
		border-radius: 0 0 0.5rem 0.5rem;

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