<script lang="ts">
	import { DocLayout, ShowcaseSection } from '$lib/index.js';
</script>

<DocLayout titleText="Anchor Links Demo">
	<div class="container-fluid py-4">
		<ShowcaseSection
			titleText="Basic Usage"
			subtitleText="Basic usage of ShowcaseSection with anchor links"
			idText="basic-usage"
		>
			{#snippet demoContent()}
				<div class="p-3 bg-light border rounded">
						<h6>Demo Content</h6>
						<p>This is a basic component demonstration.</p>
						<button class="btn btn-primary btn-sm">Demo Button</button>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>Controls</h6>
						<div class="mb-2">
							<label class="form-label">Color:</label>
							<select class="form-select form-select-sm">
								<option>Blue</option>
								<option>Green</option>
								<option>Red</option>
							</select>
						</div>
						<div class="form-check">
							<input class="form-check-input" type="checkbox" id="enable-animation">
							<label class="form-check-label" for="enable-animation">
								Enable animations
							</label>
						</div>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-3">
						<h6>Description</h6>
						<p>Basic component usage with <code>idText="basic-usage"</code> allows direct linking to this section using URL fragments.</p>
						<p><strong>Anchor URL:</strong> <code>#basic-usage</code></p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<ShowcaseSection
				titleText="Advanced Features"
				subtitleText="Advanced features and configuration options"
				idText="advanced-features"
			>
				{#snippet demoContent()}
					<div class="p-3 bg-primary text-white rounded">
						<h6>Advanced Demo</h6>
						<p>Here's a more complex example with multiple elements.</p>
						<div class="d-flex gap-2">
							<button class="btn btn-light btn-sm">Action 1</button>
							<button class="btn btn-outline-light btn-sm">Action 2</button>
						</div>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>Advanced Controls</h6>
						<div class="mb-3">
							<label class="form-label">Size:</label>
							<input type="range" class="form-range" min="1" max="5" value="3">
						</div>
						<div class="mb-3">
							<label class="form-label">Mode:</label>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="mode" value="auto" checked>
								<label class="form-check-label">Automatic</label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="radio" name="mode" value="manual">
								<label class="form-check-label">Manual</label>
							</div>
						</div>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-3">
						<h6>Technical Details</h6>
						<p>Advanced features include:</p>
						<ul class="small">
							<li>Dynamic configurations</li>
							<li>Custom event handlers</li>
							<li>API integration</li>
						</ul>
						<p><strong>Anchor URL:</strong> <code>#advanced-features</code></p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<ShowcaseSection
				titleText="Styling Options"
				subtitleText="Styling and appearance options"
				idText="styling-options"
				demoColumnTitle="Styles"
				controlsColumnTitle="Settings"
				descriptionColumnTitle="Result"
			>
				{#snippet demoContent()}
					<div class="p-3 bg-success text-white rounded">
						<h6>Styled Section</h6>
						<p>Example of various styles and colors.</p>
						<span class="badge bg-light text-dark">Custom Badge</span>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>Appearance Settings</h6>
						<div class="mb-2">
							<label class="form-label">Theme:</label>
							<select class="form-select form-select-sm">
								<option>Light</option>
								<option>Dark</option>
								<option>Auto</option>
							</select>
						</div>
						<div class="mb-2">
							<label class="form-label">Border Radius:</label>
							<input type="range" class="form-range" min="0" max="20" value="8">
						</div>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-3">
						<h6>Custom Columns</h6>
						<p>This section uses custom column names:</p>
						<ul class="small">
							<li><code>demoColumnTitle="Styles"</code></li>
							<li><code>controlsColumnTitle="Settings"</code></li>
							<li><code>descriptionColumnTitle="Result"</code></li>
						</ul>
						<p><strong>Anchor URL:</strong> <code>#styling-options</code></p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<ShowcaseSection
				titleText="Best Practices"
				subtitleText="Recommended practices and tips"
				idText="best-practices"
			>
				{#snippet demoContent()}
					<div class="p-3 border rounded">
						<h6>✅ Proper Usage</h6>
						<div class="alert alert-success mb-2" role="alert">
							<small>Use meaningful IDs like "user-settings" or "api-configuration"</small>
						</div>
						<div class="alert alert-warning mb-0" role="alert">
							<small>Avoid spaces and special characters in IDs</small>
						</div>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>ID Conventions</h6>
						<ul class="small">
							<li>Use kebab-case</li>
							<li>Be descriptive</li>
							<li>Avoid numbers at start</li>
							<li>Use only ASCII characters</li>
						</ul>
						<div class="mt-3">
							<code class="small">idText="best-practices"</code>
						</div>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-3">
						<h6>Benefits of Anchor Links</h6>
						<ul class="small">
							<li>🔗 Direct links to sections</li>
							<li>📋 Table of contents creation</li>
							<li>🔍 Better SEO</li>
							<li>📱 Mobile navigation</li>
							<li>🎯 User friendliness</li>
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
									⬆️ Back to Top
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Code example -->
			<div class="row mt-5">
				<div class="col-12">
					<h3>💻 Code Usage</h3>
					<pre class="bg-dark text-light p-3 rounded"><code>{`<ShowcaseSection
  titleText="My Section"
  subtitleText="Section description"
  idText="my-section"
>
  {#snippet demoContent()}
    <!-- Demo content -->
  {/snippet}

  {#snippet controlsContent()}
    <!-- Control elements -->
  {/snippet}

  {#snippet descriptionContent()}
    <!-- Description and documentation -->
  {/snippet}
</ShowcaseSection>

<!-- Then you can use an anchor link -->
<a href="#my-section">Go to My Section</a>`}</code></pre>
				</div>
		</div>
	</div>
</DocLayout>

<style>
	/* Smooth scrolling for anchor links */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Highlight active anchor link */
	:global(h2[id]:target) {
		background-color: rgba(var(--docs-primary-rgb, 0, 167, 225), 0.1);
		padding: 0.5rem;
		border-radius: 0.375rem;
		border-left: 4px solid var(--docs-primary, #00A7E1);
		transition: all 0.3s ease;
	}

	/* Offset for fixed header (if you have one) */
	:global(h2[id]) {
		scroll-margin-top: 2rem;
	}
</style>