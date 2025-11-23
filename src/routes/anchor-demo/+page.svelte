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
				col1Title="Styles"
				col2Title="Settings"
				col3Title="Result"
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
							<li><code>col1Title="Styles"</code></li>
							<li><code>col2Title="Settings"</code></li>
							<li><code>col3Title="Result"</code></li>
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

			<!-- Layout Examples Section -->
			<div class="row mt-5 mb-4">
				<div class="col-12">
					<h2>📐 Layout Options</h2>
					<p class="lead">ShowcaseSection supports flexible column layouts - from 2 to 3 columns with customizable widths.</p>
				</div>
			</div>

			<!-- 2-Column: Balanced (50/50) -->
			<ShowcaseSection
				titleText="2-Column Layout: Balanced"
				subtitleText="Equal width columns (50% / 50%)"
				idText="layout-2col-balanced"
				columnCountType={2}
				leftColumnSize={6}
				col1Title="Preview"
				col2Title="Configuration"
			>
				{#snippet demoContent()}
					<div class="p-3 bg-light border rounded">
						<h6>50% Width Column</h6>
						<p>This column takes up half the available width (6/12 Bootstrap grid units).</p>
						<code>leftColumnSize={6}</code>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>Layout Props</h6>
						<pre class="small bg-dark text-light p-2 rounded"><code>{`columnCountType={2}
leftColumnSize={6}
col1Title="Preview"
col2Title="Configuration"`}</code></pre>
						<p class="small mt-2 mb-0">The right column size is auto-calculated to 6.</p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<!-- 2-Column: Wide Left (67/33) -->
			<ShowcaseSection
				titleText="2-Column Layout: Wide Left"
				subtitleText="Wide left column (67% / 33%)"
				idText="layout-2col-wide-left"
				columnCountType={2}
				leftColumnSize={8}
				col1Title="Main Content"
				col2Title="Sidebar"
			>
				{#snippet demoContent()}
					<div class="p-3 bg-primary text-white rounded">
						<h6>Wide Content Area (67%)</h6>
						<p>Perfect for showcasing main content with a narrow sidebar.</p>
						<p>This column takes 8/12 grid units (66.67% width).</p>
						<code class="text-light">leftColumnSize={8}</code>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>Narrow Sidebar (33%)</h6>
						<p class="small">Auto-calculated to 4/12 grid units.</p>
						<pre class="small bg-dark text-light p-2 rounded"><code>{`columnCountType={2}
leftColumnSize={8}
// rightColumnSize auto = 4`}</code></pre>
					</div>
				{/snippet}
			</ShowcaseSection>

			<!-- 2-Column: Narrow Left (33/67) -->
			<ShowcaseSection
				titleText="2-Column Layout: Narrow Left"
				subtitleText="Narrow left column (33% / 67%)"
				idText="layout-2col-narrow-left"
				columnCountType={2}
				leftColumnSize={4}
				rightColumnSize={8}
				col1Title="Quick Info"
				col2Title="Details"
			>
				{#snippet demoContent()}
					<div class="p-3 border rounded">
						<h6>Narrow (33%)</h6>
						<p class="small">Great for icons, labels, or quick actions.</p>
						<code class="small">4/12 units</code>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3 bg-success text-white rounded">
						<h6>Wide Details Area (67%)</h6>
						<p>This wider column is perfect for detailed information, documentation, or complex controls.</p>
						<p>Explicitly set to 8/12 grid units with <code class="text-light">rightColumnSize={8}</code>.</p>
						<ul class="small">
							<li>More space for content</li>
							<li>Better readability</li>
							<li>Room for complex layouts</li>
						</ul>
					</div>
				{/snippet}
			</ShowcaseSection>

			<!-- 2-Column: Very Wide (25/75) -->
			<ShowcaseSection
				titleText="2-Column Layout: Very Wide"
				subtitleText="Very narrow left, very wide right (25% / 75%)"
				idText="layout-2col-very-wide"
				columnCountType={2}
				leftColumnSize={3}
				col1Title="Icon"
				col2Title="Content"
			>
				{#snippet demoContent()}
					<div class="p-3 border rounded text-center">
						<div style="font-size: 2rem;">📊</div>
						<code class="small">3/12</code>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3">
						<h6>Maximum Content Width (75%)</h6>
						<p>Ideal for icon + content layouts, or when you need maximum horizontal space for the main content.</p>
						<pre class="small bg-dark text-light p-2 rounded"><code>{`columnCountType={2}
leftColumnSize={3}
// rightColumnSize auto = 9`}</code></pre>
						<p class="small mt-2">The right column automatically gets 9/12 grid units (75% width).</p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<!-- 3-Column: Custom Sizes -->
			<ShowcaseSection
				titleText="3-Column Layout: Custom Sizes"
				subtitleText="Custom width distribution (25% / 50% / 25%)"
				idText="layout-3col-custom"
				columnCountType={3}
				leftColumnSize={3}
				middleColumnSize={6}
				rightColumnSize={3}
				col1Title="Left Panel"
				col2Title="Main Content"
				col3Title="Right Panel"
			>
				{#snippet demoContent()}
					<div class="p-2 border rounded">
						<h6 class="small">Left (25%)</h6>
						<p class="small mb-0">3/12 units</p>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-2 bg-warning rounded">
						<h6 class="small">Center (50%)</h6>
						<p class="small mb-0">6/12 units - Main focus area</p>
						<code class="small">middleColumnSize={6}</code>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-2 border rounded">
						<h6 class="small">Right (25%)</h6>
						<p class="small mb-0">3/12 units</p>
					</div>
				{/snippet}
			</ShowcaseSection>

			<!-- 3-Column: Default (Equal) -->
			<ShowcaseSection
				titleText="3-Column Layout: Default"
				subtitleText="Equal width columns (33% / 33% / 33%)"
				idText="layout-3col-default"
			>
				{#snippet demoContent()}
					<div class="p-3 bg-light border rounded">
						<h6>Column 1 (33%)</h6>
						<p class="small">Default 4/12 grid units</p>
					</div>
				{/snippet}

				{#snippet controlsContent()}
					<div class="p-3 border rounded">
						<h6>Column 2 (33%)</h6>
						<p class="small">Default 4/12 grid units</p>
					</div>
				{/snippet}

				{#snippet descriptionContent()}
					<div class="p-3 bg-light border rounded">
						<h6>Column 3 (33%)</h6>
						<p class="small">Default 4/12 grid units</p>
						<p class="small mb-0">No size props needed - uses defaults!</p>
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
							<h5 class="mb-3">Basic Examples</h5>
							<div class="d-flex flex-wrap gap-2 mb-4">
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
							</div>

							<h5 class="mb-3">Layout Examples</h5>
							<div class="d-flex flex-wrap gap-2 mb-3">
								<a href="#layout-2col-balanced" class="btn btn-outline-primary btn-sm">
									📊 2-Col: 50/50
								</a>
								<a href="#layout-2col-wide-left" class="btn btn-outline-primary btn-sm">
									📊 2-Col: 67/33
								</a>
								<a href="#layout-2col-narrow-left" class="btn btn-outline-primary btn-sm">
									📊 2-Col: 33/67
								</a>
								<a href="#layout-2col-very-wide" class="btn btn-outline-primary btn-sm">
									📊 2-Col: 25/75
								</a>
								<a href="#layout-3col-custom" class="btn btn-outline-success btn-sm">
									📐 3-Col: Custom
								</a>
								<a href="#layout-3col-default" class="btn btn-outline-success btn-sm">
									📐 3-Col: Default
								</a>
							</div>

							<a href="#top" class="btn btn-outline-secondary btn-sm">
								⬆️ Back to Top
							</a>
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