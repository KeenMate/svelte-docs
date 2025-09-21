<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeShowcase } from '$lib';

	const basicUsageCode = `<script lang="ts">
  import { ConfigProvider } from 'svelte-docs-lib';
  import type { PartialDocsConfig } from 'svelte-docs-lib';

  const siteConfig: PartialDocsConfig = {
    site: {
      title: "My Documentation Site",
      description: "A comprehensive documentation site",
      keywords: ["svelte", "documentation", "library"],
      author: "Documentation Team"
    }
  };
</\u0073cript>

<!-- Basic usage - only site config -->
<ConfigProvider config={siteConfig}>
  <h1>Welcome to our docs!</h1>
  <p>This page uses only the site-wide configuration.</p>
</ConfigProvider>`;

	const pageSpecificCode = `<script lang="ts">
  import { ConfigProvider } from 'svelte-docs-lib';
  import type { PartialDocsConfig } from 'svelte-docs-lib';

  const siteConfig: PartialDocsConfig = {
    site: {
      title: "My Documentation Site",
      description: "A comprehensive documentation site",
      keywords: ["svelte", "documentation", "library"],
      author: "Documentation Team"
    }
  };
</\u0073cript>

<!-- Page-specific metadata that merges with site config -->
<ConfigProvider
  config={siteConfig}
  pageTitle="Getting Started Guide"
  pageDescription="Learn how to get started with our amazing documentation library"
  pageKeywords={["tutorial", "guide", "setup", "beginner"]}
  pageAuthor="Tutorial Team"
  pageOgImage="/images/getting-started-og.jpg"
>
  <h1>Getting Started Guide</h1>
  <p>This page demonstrates page-specific metadata merging.</p>
</ConfigProvider>`;

	const resultingMetadataCode = `<!-- What gets rendered in the <head> -->
<title>Getting Started Guide - My Documentation Site</title>
<meta name="description" content="Learn how to get started with our amazing documentation library" />
<meta name="keywords" content="svelte, documentation, library, tutorial, guide, setup, beginner" />
<meta name="author" content="Tutorial Team" />
<meta property="og:title" content="Getting Started Guide - My Documentation Site" />
<meta property="og:description" content="Learn how to get started with our amazing documentation library" />
<meta property="og:image" content="/images/getting-started-og.jpg" />
<meta name="twitter:title" content="Getting Started Guide - My Documentation Site" />
<meta name="twitter:description" content="Learn how to get started with our amazing documentation library" />
<meta name="twitter:image" content="/images/getting-started-og.jpg" />`;

	const mergingLogicCode = `// How the merging works:

// 1. Title: pageTitle + " - " + siteTitle
mergedTitle = "Getting Started Guide - My Documentation Site"

// 2. Description: pageDescription takes priority
mergedDescription = "Learn how to get started with..." // page description used

// 3. Keywords: Site keywords + page keywords (duplicates removed)
siteKeywords = ["svelte", "documentation", "library"]
pageKeywords = ["tutorial", "guide", "setup", "beginner"]
mergedKeywords = ["svelte", "documentation", "library", "tutorial", "guide", "setup", "beginner"]

// 4. Author: pageAuthor takes priority
mergedAuthor = "Tutorial Team" // page author used

// 5. OG Image: pageOgImage takes priority
mergedOgImage = "/images/getting-started-og.jpg" // page image used`;

	const advancedUsageCode = `<!-- You can also override just specific fields -->
<ConfigProvider
  config={siteConfig}
  pageTitle="API Reference"
  pageKeywords={["api", "reference", "methods"]}
>
  <!-- Only title and keywords are customized, other metadata inherited from site config -->
</ConfigProvider>

<!-- Or provide a completely custom page -->
<ConfigProvider
  config={siteConfig}
  pageTitle="Blog Post"
  pageDescription="This is a specific blog post about Svelte components"
  pageKeywords={["blog", "svelte", "components", "tutorial"]}
  pageAuthor="John Doe"
  pageOgImage="/images/blog-post-social.jpg"
>
  <!-- All metadata is customized for this specific page -->
</ConfigProvider>`;
</script>

<DocLayout titleText="Page-Specific Metadata" descriptionText="Learn how to use page-specific metadata with ConfigProvider">
	<div class="container-fluid">
		<div class="row">
			<div class="col-12">
				<h1 class="mb-4">Page-Specific Metadata</h1>
				<p class="lead mb-5">
					The ConfigProvider component supports page-specific metadata that gets intelligently merged
					with your site-wide configuration. This allows you to customize SEO tags, social media previews,
					and other metadata on a per-page basis while maintaining consistent site-wide defaults.
				</p>

				<ShowcaseSection
					titleText="Basic Usage"
					subtitleText="Using ConfigProvider with only site-wide configuration"
				>
					{#snippet demoContent()}
						<div class="alert alert-info">
							<h6>Site-wide metadata only</h6>
							<p class="mb-1"><strong>Title:</strong> "My Documentation Site"</p>
							<p class="mb-1"><strong>Description:</strong> "A comprehensive documentation site"</p>
							<p class="mb-0"><strong>Keywords:</strong> svelte, documentation, library</p>
						</div>
					{/snippet}

					{#snippet controlsContent()}
						<div class="d-grid">
							<button class="btn btn-outline-primary" onclick={() => window.open('/view-source', '_blank')}>
								View Page Source
							</button>
						</div>
					{/snippet}

					{#snippet descriptionContent()}
						<p>When you only provide the site configuration, all pages will use the same metadata from your site config.</p>
						<p class="small text-muted">This is perfect for simple sites or when you want consistent metadata across all pages.</p>
					{/snippet}
				</ShowcaseSection>

				<CodeShowcase
					titleText="Basic Configuration Code"
					svelteCodeContent={basicUsageCode}
				/>

				<ShowcaseSection
					titleText="Page-Specific Metadata"
					subtitleText="Customizing metadata for individual pages"
				>
					{#snippet demoContent()}
						<div class="alert alert-success">
							<h6>Merged metadata result</h6>
							<p class="mb-1"><strong>Title:</strong> "Getting Started Guide - My Documentation Site"</p>
							<p class="mb-1"><strong>Description:</strong> "Learn how to get started with our amazing documentation library"</p>
							<p class="mb-1"><strong>Keywords:</strong> svelte, documentation, library, tutorial, guide, setup, beginner</p>
							<p class="mb-0"><strong>Author:</strong> "Tutorial Team"</p>
						</div>
					{/snippet}

					{#snippet controlsContent()}
						<div class="row g-2">
							<div class="col-6">
								<button class="btn btn-outline-success w-100" onclick={() => console.log('Check browser dev tools for actual meta tags')}>
									Inspect Meta Tags
								</button>
							</div>
							<div class="col-6">
								<button class="btn btn-outline-info w-100" onclick={() => window.open('https://developers.facebook.com/tools/debug/', '_blank')}>
									Test Social Preview
								</button>
							</div>
						</div>
					{/snippet}

					{#snippet descriptionContent()}
						<h6>How the merging works:</h6>
						<ul class="small">
							<li><strong>Title:</strong> Page title + " - " + Site title</li>
							<li><strong>Description:</strong> Page description (if provided) or site description</li>
							<li><strong>Keywords:</strong> Site keywords + page keywords (duplicates removed)</li>
							<li><strong>Author:</strong> Page author (if provided) or site author</li>
							<li><strong>OG Image:</strong> Page image (if provided) or site image</li>
						</ul>
					{/snippet}
				</ShowcaseSection>

				<CodeShowcase
					titleText="Page-Specific Configuration"
					svelteCodeContent={pageSpecificCode}
				/>

				<CodeShowcase
					titleText="Resulting HTML Meta Tags"
					cssCodeContent={resultingMetadataCode}
				/>

				<ShowcaseSection
					titleText="Merging Logic"
					subtitleText="Understanding how site and page metadata combine"
				>
					{#snippet demoContent()}
						<div class="row">
							<div class="col-md-6">
								<div class="card">
									<div class="card-header bg-primary text-white">
										<small>Site Config</small>
									</div>
									<div class="card-body small">
										<p class="mb-1">title: "My Documentation Site"</p>
										<p class="mb-1">keywords: ["svelte", "documentation", "library"]</p>
										<p class="mb-0">author: "Documentation Team"</p>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="card">
									<div class="card-header bg-success text-white">
										<small>Page Override</small>
									</div>
									<div class="card-body small">
										<p class="mb-1">pageTitle: "Getting Started Guide"</p>
										<p class="mb-1">pageKeywords: ["tutorial", "guide", "setup"]</p>
										<p class="mb-0">pageAuthor: "Tutorial Team"</p>
									</div>
								</div>
							</div>
						</div>
					{/snippet}

					{#snippet controlsContent()}
						<div class="text-center">
							<span class="badge bg-info">Result: Combined metadata with intelligent merging</span>
						</div>
					{/snippet}

					{#snippet descriptionContent()}
						<p>The ConfigProvider intelligently merges your site-wide and page-specific metadata:</p>
						<ul class="small">
							<li>Arrays (keywords) are combined and deduplicated</li>
							<li>Strings (title, description) are composed or overridden</li>
							<li>Page values take priority over site values</li>
							<li>Missing page values fall back to site defaults</li>
						</ul>
					{/snippet}
				</ShowcaseSection>

				<CodeShowcase
					titleText="Merging Logic Explanation"
					typescriptCodeContent={mergingLogicCode}
				/>

				<ShowcaseSection
					titleText="Advanced Usage Patterns"
					subtitleText="Different ways to customize page metadata"
				>
					{#snippet demoContent()}
						<div class="accordion" id="advancedExamples">
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#partialOverride">
										Partial Override
									</button>
								</h2>
								<div id="partialOverride" class="accordion-collapse collapse" data-bs-parent="#advancedExamples">
									<div class="accordion-body small">
										Override only specific fields (e.g., just title and keywords) while inheriting other metadata from site config.
									</div>
								</div>
							</div>
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#completeOverride">
										Complete Override
									</button>
								</h2>
								<div id="completeOverride" class="accordion-collapse collapse" data-bs-parent="#advancedExamples">
									<div class="accordion-body small">
										Provide custom values for all metadata fields to completely customize a specific page.
									</div>
								</div>
							</div>
						</div>
					{/snippet}

					{#snippet controlsContent()}
						<div class="alert alert-warning small">
							<strong>Pro Tip:</strong> You only need to specify the fields you want to customize.
							All other metadata will automatically inherit from your site configuration.
						</div>
					{/snippet}

					{#snippet descriptionContent()}
						<p>You have complete flexibility in how you use page-specific metadata:</p>
						<ul class="small">
							<li>Override just one field (e.g., only the title)</li>
							<li>Customize multiple fields for special pages</li>
							<li>Use different authors for different content types</li>
							<li>Add page-specific keywords for better SEO</li>
							<li>Set custom social media images per page</li>
						</ul>
					{/snippet}
				</ShowcaseSection>

				<CodeShowcase
					titleText="Advanced Usage Examples"
					svelteCodeContent={advancedUsageCode}
				/>

				<div class="alert alert-success mt-5">
					<h6 class="mb-3">🎉 Ready to use page-specific metadata!</h6>
					<p class="mb-2">You can now:</p>
					<ul class="mb-3">
						<li>Customize SEO tags for each page</li>
						<li>Create unique social media previews</li>
						<li>Combine site-wide and page-specific keywords</li>
						<li>Override any metadata field as needed</li>
					</ul>
					<p class="mb-0 small text-muted">
						Remember: Page-specific values take priority, but you always have site-wide defaults as fallbacks.
					</p>
				</div>
			</div>
		</div>
	</div>
</DocLayout>