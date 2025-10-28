<script lang="ts">
	import { DocLayout, MenuItem } from '$lib/index.js';
</script>

<DocLayout titleText="MenuItem Component - Demo">
	<div class="container-fluid py-4">
		<div class="row">
				<div class="col-12 col-lg-6">
					<h2>Basic MenuItem</h2>
					<div class="demo-section">
						<ul class="list-unstyled">
							<MenuItem
								hrefUrl="/home"
								labelText="Home Page"
								tooltipText="Go to home page"
							>
								{#snippet iconContent()}
									🏠
								{/snippet}
							</MenuItem>

							<MenuItem
								hrefUrl="/docs"
								labelText="Documentation"
								tooltipText="View documentation"
								badgeText="New"
								badgeVariantType="primary"
							>
								{#snippet iconContent()}
									📚
								{/snippet}
							</MenuItem>

							<MenuItem
								hrefUrl="/api"
								labelText="API Reference"
								tooltipText="API documentation"
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
					<h2>Special States</h2>
					<div class="demo-section">
						<ul class="list-unstyled">
							<MenuItem
								hrefUrl="https://github.com"
								labelText="External Link"
								tooltipText="Opens in new window"
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
								labelText="Disabled Item"
								tooltipText="This item is temporarily unavailable"
								isDisabled={true}
								badgeText="Soon"
								badgeVariantType="warning"
							>
								{#snippet iconContent()}
									🚧
								{/snippet}
							</MenuItem>

							<MenuItem
								hrefUrl="/premium"
								labelText="Premium Feature"
								tooltipText="For premium users only"
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
								tooltipText="Opens in new window"
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
								labelText="Help"
								tooltipText="Opens in same window"
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
					<h2>Complete Navigation Menu</h2>
					<div class="demo-section">
						<nav class="demo-nav">
							<ul class="list-unstyled">
								<MenuItem
									hrefUrl="/getting-started"
									labelText="Getting Started"
									tooltipText="Quick start and installation"
									isActive={true}
								>
									{#snippet iconContent()}
										🚀
									{/snippet}
								</MenuItem>

								<MenuItem
									hrefUrl="/components"
									labelText="Components"
									tooltipText="Overview of all components"
									badgeText="15"
									badgeVariantType="info"
								>
									{#snippet iconContent()}
										🧩
									{/snippet}
								</MenuItem>

								<MenuItem
									hrefUrl="/examples"
									labelText="Examples"
									tooltipText="Practical usage examples"
								>
									{#snippet iconContent()}
										💡
									{/snippet}
								</MenuItem>

								<MenuItem
									hrefUrl="/api"
									labelText="API"
									tooltipText="API documentation and reference"
								>
									{#snippet iconContent()}
										⚙️
									{/snippet}
								</MenuItem>

								<MenuItem
									hrefUrl="/changelog"
									labelText="Changelog"
									tooltipText="Version history and changes"
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
					<h2>Code</h2>
					<pre><code class="language-svelte">{`<MenuItem
  hrefUrl="/docs"
  labelText="Documentation"
  tooltipText="View documentation"
  badgeText="New"
  badgeVariantType="primary"
  targetWindow="_self"
  isActive={true}
>
  {#snippet iconContent()}
    📚
  {/snippet}
</MenuItem>

<!-- External link in new window -->
<MenuItem
  hrefUrl="https://github.com"
  labelText="GitHub"
  tooltipText="Opens in new window"
  targetWindow="_blank"
  isExternal={true}
>
  {#snippet iconContent()}
    <svg>...</svg>
  {/snippet}
</MenuItem>`}</code></pre>
			</div>
	</div>
</DocLayout>

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