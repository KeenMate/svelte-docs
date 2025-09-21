<script lang="ts">
	import { DocLayout, ShowcaseSection, ConfigProvider } from '$lib/index.js';
	import type { PartialDocsConfig } from '$lib/index.js';

	const config: PartialDocsConfig = {
		site: {
			title: 'Anchor Links Demo',
			description: 'Ukázka anchor odkazů s ShowcaseSection',
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
	<DocLayout titleText="Anchor Links Demo">
		<div class="container-fluid py-4">

			<!-- Table of Contents s anchor odkazy -->
			<div class="row mb-5">
				<div class="col-12">
					<div class="card">
						<div class="card-header">
							<h3>📋 Obsah stránky</h3>
						</div>
						<div class="card-body">
							<nav>
								<ul class="list-unstyled">
									<li class="mb-2">
										<a href="#basic-usage" class="text-decoration-none">
											🔗 Basic Usage
										</a>
									</li>
									<li class="mb-2">
										<a href="#advanced-features" class="text-decoration-none">
											🔗 Advanced Features
										</a>
									</li>
									<li class="mb-2">
										<a href="#styling-options" class="text-decoration-none">
											🔗 Styling Options
										</a>
									</li>
									<li class="mb-2">
										<a href="#best-practices" class="text-decoration-none">
											🔗 Best Practices
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>

			<!-- ShowcaseSection s ID pro anchor odkazy -->
			<ShowcaseSection
				titleText="Basic Usage"
				subtitleText="Základní použití ShowcaseSection s anchor odkazy"
				idText="basic-usage"
			>
				{#snippet demoContent()}
					<div class="p-3 bg-light border rounded">
						<h6>Demo obsah</h6>
						<p>Toto je základní ukázka komponenty.</p>
						<button class="btn btn-primary btn-sm">Demo tlačítko</button>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>Ovládací prvky</h6>
						<div class="mb-2">
							<label class="form-label">Barva:</label>
							<select class="form-select form-select-sm">
								<option>Modrá</option>
								<option>Zelená</option>
								<option>Červená</option>
							</select>
						</div>
						<div class="form-check">
							<input class="form-check-input" type="checkbox" id="enable-animation">
							<label class="form-check-label" for="enable-animation">
								Povolit animace
							</label>
						</div>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-3">
						<h6>Popis</h6>
						<p>Základní použití komponenty s <code>idText="basic-usage"</code> umožňuje přímý odkaz na tuto sekci pomocí URL fragmentu.</p>
						<p><strong>Anchor URL:</strong> <code>#basic-usage</code></p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<ShowcaseSection
				titleText="Advanced Features"
				subtitleText="Pokročilé funkce a možnosti konfigurace"
				idText="advanced-features"
			>
				{#snippet demoContent()}
					<div class="p-3 bg-primary text-white rounded">
						<h6>Pokročilá demo</h6>
						<p>Zde je složitější ukázka s více prvky.</p>
						<div class="d-flex gap-2">
							<button class="btn btn-light btn-sm">Akce 1</button>
							<button class="btn btn-outline-light btn-sm">Akce 2</button>
						</div>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>Pokročilé ovládání</h6>
						<div class="mb-3">
							<label class="form-label">Velikost:</label>
							<input type="range" class="form-range" min="1" max="5" value="3">
						</div>
						<div class="mb-3">
							<label class="form-label">Režim:</label>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="mode" value="auto" checked>
								<label class="form-check-label">Automatický</label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="mode" value="manual">
								<label class="form-check-label">Manuální</label>
							</div>
						</div>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-3">
						<h6>Technické detaily</h6>
						<p>Pokročilé funkce zahrnují:</p>
						<ul class="small">
							<li>Dynamické konfigurace</li>
							<li>Vlastní event handlery</li>
							<li>Integraci s API</li>
						</ul>
						<p><strong>Anchor URL:</strong> <code>#advanced-features</code></p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<ShowcaseSection
				titleText="Styling Options"
				subtitleText="Možnosti stylování a vzhledu"
				idText="styling-options"
				demoColumnTitle="Styly"
				controlsColumnTitle="Nastavení"
				descriptionColumnTitle="Výsledek"
			>
				{#snippet demoContent()}
					<div class="p-3 bg-success text-white rounded">
						<h6>Stylovaná sekce</h6>
						<p>Ukázka různých stylů a barev.</p>
						<span class="badge bg-light text-dark">Custom Badge</span>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>Nastavení vzhledu</h6>
						<div class="mb-2">
							<label class="form-label">Téma:</label>
							<select class="form-select form-select-sm">
								<option>Světlé</option>
								<option>Tmavé</option>
								<option>Automatické</option>
							</select>
						</div>
						<div class="mb-2">
							<label class="form-label">Zaoblení:</label>
							<input type="range" class="form-range" min="0" max="20" value="8">
						</div>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-3">
						<h6>Vlastní sloupce</h6>
						<p>Tato sekce používá vlastní názvy sloupců:</p>
						<ul class="small">
							<li><code>demoColumnTitle="Styly"</code></li>
							<li><code>controlsColumnTitle="Nastavení"</code></li>
							<li><code>descriptionColumnTitle="Výsledek"</code></li>
						</ul>
						<p><strong>Anchor URL:</strong> <code>#styling-options</code></p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<ShowcaseSection
				titleText="Best Practices"
				subtitleText="Doporučené postupy a tipy"
				idText="best-practices"
			>
				{#snippet demoContent()}
					<div class="p-3 border rounded">
						<h6>✅ Správné použití</h6>
						<div class="alert alert-success mb-2" role="alert">
							<small>Používejte smysluplné ID jako "user-settings" nebo "api-configuration"</small>
						</div>
						<div class="alert alert-warning mb-0" role="alert">
							<small>Vyhněte se mezerám a speciálním znakům v ID</small>
						</div>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>ID konvence</h6>
						<ul class="small">
							<li>Používejte kebab-case</li>
							<li>Buďte popisní</li>
							<li>Vyhněte se číslům na začátku</li>
							<li>Používejte jen ASCII znaky</li>
						</ul>
						<div class="mt-3">
							<code class="small">idText="best-practices"</code>
						</div>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-3">
						<h6>Výhody anchor odkazů</h6>
						<ul class="small">
							<li>🔗 Přímé odkazy na sekce</li>
							<li>📋 Vytváření obsahu</li>
							<li>🔍 Lepší SEO</li>
							<li>📱 Mobilní navigace</li>
							<li>🎯 Uživatelská přívětivost</li>
						</ul>
						<p class="small mt-2">
							<strong>Anchor URL:</strong> <code>#best-practices</code>
						</p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<!-- Navigační tlačítka -->
			<div class="row mt-5">
				<div class="col-12">
					<div class="card">
						<div class="card-header">
							<h4>🧭 Quick Navigation</h4>
						</div>
						<div class="card-body">
							<div class="d-flex flex-wrap gap-2">
								<a href="#basic-usage" class="btn btn-outline-primary btn-sm">
									↗️ Basic Usage
								</a>
								<a href="#advanced-features" class="btn btn-outline-success btn-sm">
									⚡ Advanced Features
								</a>
								<a href="#styling-options" class="btn btn-outline-warning btn-sm">
									🎨 Styling Options
								</a>
								<a href="#best-practices" class="btn btn-outline-info btn-sm">
									✨ Best Practices
								</a>
								<a href="#top" class="btn btn-outline-secondary btn-sm">
									⬆️ Zpět nahoru
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Kód ukázka -->
			<div class="row mt-5">
				<div class="col-12">
					<h3>💻 Použití v kódu</h3>
					<pre class="bg-dark text-light p-3 rounded"><code>{`<ShowcaseSection
  titleText="Moje sekce"
  subtitleText="Popis sekce"
  idText="moje-sekce"
>
  {#snippet demoContent()}
    <!-- Demo obsah -->
  {/snippet}

  {#snippet controlsContent()}
    <!-- Ovládací prvky -->
  {/snippet}

  {#snippet descriptionContent()}
    <!-- Popis a dokumentace -->
  {/snippet}
</ShowcaseSection>

<!-- Pak můžete použít anchor odkaz -->
<a href="#moje-sekce">Přejít na Moje sekce</a>`}</code></pre>
				</div>
			</div>
		</div>
	</DocLayout>
</ConfigProvider>

<style>
	/* Smooth scrolling pro anchor odkazy */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Zvýraznění aktivního anchor odkazu */
	:global(h2[id]:target) {
		background-color: rgba(var(--docs-primary-rgb, 0, 167, 225), 0.1);
		padding: 0.5rem;
		border-radius: 0.375rem;
		border-left: 4px solid var(--docs-primary, #00A7E1);
		transition: all 0.3s ease;
	}

	/* Offset pro fixed header (pokud máte) */
	:global(h2[id]) {
		scroll-margin-top: 2rem;
	}
</style>