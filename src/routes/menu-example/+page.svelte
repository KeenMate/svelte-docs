<script lang="ts">
	import { DocLayout, MenuItem, ConfigProvider } from '$lib/index.js';
	import type { PartialDocsConfig } from '$lib/index.js';

	const config: PartialDocsConfig = {
		site: {
			title: 'MenuItem Demo',
			description: 'Ukázka MenuItem komponenty',
		},
		company: {
			name: 'KeenMate'
		},
		navigation: {
			main: [
				{ label: 'Domů', href: '/', icon: '🏠' },
				{ label: 'Dokumentace', href: '/docs', icon: '📚' }
			]
		}
	};
</script>

<ConfigProvider configData={config}>
	<DocLayout titleText="MenuItem Komponenta - Ukázka">
		<div class="container-fluid py-4">
			<div class="row">
				<div class="col-12 col-lg-6">
					<h2>Základní MenuItem</h2>
					<div class="demo-section">
						<ul class="list-unstyled">
							<MenuItem
								hrefUrl="/home"
								labelText="Domovská stránka"
								tooltipText="Přejít na domovskou stránku"
							>
								{#snippet iconContent()}
									🏠
								{/snippet}
							</MenuItem>

							<MenuItem
								hrefUrl="/docs"
								labelText="Dokumentace"
								tooltipText="Prohlédnout dokumentaci"
								badgeText="Nové"
								badgeVariantType="primary"
							>
								{#snippet iconContent()}
									📚
								{/snippet}
							</MenuItem>

							<MenuItem
								hrefUrl="/api"
								labelText="API Reference"
								tooltipText="API dokumentace"
								isActive={true}
							>
								{#snippet iconContent()}
									🔌
								{/snippet}
							</MenuItem>
						</ul>
					</div>
				</div>

				<div class="col-12 col-lg-6">
					<h2>Speciální stavy</h2>
					<div class="demo-section">
						<ul class="list-unstyled">
							<MenuItem
								hrefUrl="https://github.com"
								labelText="Externí odkaz"
								tooltipText="Otevře se v novém okně"
								isExternal={true}
								targetWindow="_blank"
							>
								{#snippet iconContent()}
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
									</svg>
								{/snippet}
							</MenuItem>

							<MenuItem
								hrefUrl="/disabled"
								labelText="Zakázaná položka"
								tooltipText="Tato položka je dočasně nedostupná"
								isDisabled={true}
								badgeText="Brzy"
								badgeVariantType="warning"
							>
								{#snippet iconContent()}
									🚧
								{/snippet}
							</MenuItem>

							<MenuItem
								hrefUrl="/premium"
								labelText="Premium funkce"
								tooltipText="Pouze pro premium uživatele"
								badgeText="PRO"
								badgeVariantType="success"
							>
								{#snippet iconContent()}
									⭐
								{/snippet}
							</MenuItem>

							<MenuItem
								hrefUrl="https://docs.google.com"
								labelText="Google Docs"
								tooltipText="Otevře se v novém okně"
								targetWindow="_blank"
								badgeText="External"
								badgeVariantType="info"
							>
								{#snippet iconContent()}
									📄
								{/snippet}
							</MenuItem>

							<MenuItem
								hrefUrl="/help"
								labelText="Nápověda"
								tooltipText="Otevře se ve stejném okně"
								targetWindow="_self"
							>
								{#snippet iconContent()}
									❓
								{/snippet}
							</MenuItem>
						</ul>
					</div>
				</div>
			</div>

			<div class="row mt-4">
				<div class="col-12">
					<h2>Kompletní navigační menu</h2>
					<div class="demo-section">
						<nav class="demo-nav">
							<ul class="list-unstyled">
								<MenuItem
									hrefUrl="/getting-started"
									labelText="Začínáme"
									tooltipText="Rychlý start a instalace"
									isActive={true}
								>
									{#snippet iconContent()}
										🚀
									{/snippet}
								</MenuItem>

								<MenuItem
									hrefUrl="/components"
									labelText="Komponenty"
									tooltipText="Přehled všech komponent"
									badgeText="15"
									badgeVariantType="info"
								>
									{#snippet iconContent()}
										🧩
									{/snippet}
								</MenuItem>

								<MenuItem
									hrefUrl="/examples"
									labelText="Příklady"
									tooltipText="Praktické ukázky použití"
								>
									{#snippet iconContent()}
										💡
									{/snippet}
								</MenuItem>

								<MenuItem
									hrefUrl="/api"
									labelText="API"
									tooltipText="API dokumentace a reference"
								>
									{#snippet iconContent()}
										⚙️
									{/snippet}
								</MenuItem>

								<MenuItem
									hrefUrl="/changelog"
									labelText="Změny"
									tooltipText="Historie verzí a změn"
									badgeText="v1.0"
									badgeVariantType="success"
								>
									{#snippet iconContent()}
										📝
									{/snippet}
								</MenuItem>
							</ul>
						</nav>
					</div>
				</div>
			</div>

			<div class="row mt-4">
				<div class="col-12">
					<h2>Kód</h2>
					<pre><code class="language-svelte">{`<MenuItem
  hrefUrl="/docs"
  labelText="Dokumentace"
  tooltipText="Prohlédnout dokumentaci"
  badgeText="Nové"
  badgeVariantType="primary"
  targetWindow="_self"
  isActive={true}
>
  {#snippet iconContent()}
    📚
  {/snippet}
</MenuItem>

<!-- Externí odkaz v novém okně -->
<MenuItem
  hrefUrl="https://github.com"
  labelText="GitHub"
  tooltipText="Otevře se v novém okně"
  targetWindow="_blank"
  isExternal={true}
>
  {#snippet iconContent()}
    <svg>...</svg>
  {/snippet}
</MenuItem>`}</code></pre>
				</div>
			</div>
		</div>
	</DocLayout>
</ConfigProvider>

<style>
	.demo-section {
		background-color: #f8f9fa;
		border: 1px solid #dee2e6;
		border-radius: 0.5rem;
		padding: 1.5rem;
		margin-bottom: 1rem;
	}

	.demo-nav {
		max-width: 300px;
	}

	pre {
		background-color: #2d3748;
		color: #e2e8f0;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
	}

	h2 {
		color: var(--docs-primary, #00A7E1);
		margin-bottom: 1rem;
	}
</style>