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

			<CodeRenderer
				htmlContent={highlightedCode || finalTabItems[activeTab].codeContent}
				languageType={finalTabItems[activeTab].languageType || 'text'}
			/>
		</div>
	</div>
{/if}

