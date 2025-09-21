<script lang="ts">
	import { DocLayout, CodeShowcase, ShowcaseSection, FeatureCard, CardGrid } from '$lib';

	const installCode = `npm install svelte-docs-lib`;

	const svelteExample = `<\u0073cript>
  import { DocLayout, ShowcaseSection, CodeShowcase } from 'svelte-docs-lib';
</\u0073cript>

<DocLayout title="My Documentation">
  <ShowcaseSection title="Component Demo">
    {#snippet demo()}
      <h4>Live Component Demo</h4>
    {/snippet}

    {#snippet controls()}
      <div class="form-group">
        <label class="form-label">Configuration</label>
        <input class="form-control" placeholder="Settings" />
      </div>
    {/snippet}

    {#snippet description()}
      <p>Component description and usage guidelines.</p>
    {/snippet}
  </ShowcaseSection>
</DocLayout>`;

	const typescriptExample = `export interface ShowcaseSectionProps {
  title: string;
  subtitle?: string;
  demo?: Snippet;
  controls?: Snippet;
  description?: Snippet;
}

export interface CodeShowcaseProps {
  title?: string;
  svelteCode?: string;
  typescriptCode?: string;
  cssCode?: string;
}`;

	const cssExample = `.showcase-section {
  margin-bottom: 3rem;
}

.demo-container {
  min-height: 300px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 1rem;
}

.controls-container .form-group {
  margin-bottom: 1rem;
}`;

	const configExample = `import { ConfigProvider } from 'svelte-docs-lib';
import type { PartialDocsConfig } from 'svelte-docs-lib';

const config: PartialDocsConfig = {
  site: {
    title: 'My Documentation',
    description: 'Comprehensive documentation for my project'
  },
  company: {
    name: 'My Company',
    website: 'https://example.com',
    social: {
      github: 'https://github.com/mycompany',
      twitter: 'https://twitter.com/mycompany'
    }
  },
  navigation: {
    main: [
      { label: 'Home', href: '/', icon: '🏠' },
      { label: 'Docs', href: '/docs', icon: '📚' }
    ]
  }
};

// Wrap your app with ConfigProvider
<ConfigProvider config={config}>
  <DocLayout>
    <!-- Your content -->
  </DocLayout>
</ConfigProvider>`;
</script>

<DocLayout titleText="Home">
	<div class="row">
		<div class="col-12">
			<div class="jumbotron bg-light p-5 rounded">
				<h1 class="display-4">Svelte Documentation Library</h1>
				<p class="lead">
					A high-performance, feature-rich component library for building beautiful documentation
					and showcase websites with SvelteKit, Bootstrap, and modern web standards.
				</p>
				<hr class="my-4">
				<p>
					This showcase demonstrates all the key features and capabilities of the library.
					Use the navigation menu to explore different components and examples.
				</p>
			</div>
		</div>
	</div>

<CardGrid>
	<div class="col-md-4">
		<FeatureCard
			iconEmoji="🚀"
			titleText="Getting Started"
			descriptionText="Learn the fundamental setup and configuration options for building documentation sites."
			linkHref="/getting-started"
			linkLabel="Get Started"
			variantType="primary"
		/>
	</div>

	<div class="col-md-4">
		<FeatureCard
			iconEmoji="🧩"
			titleText="Components"
			descriptionText="Explore the complete set of components including layouts, navigation, and code displays."
			linkHref="/components"
			linkLabel="Explore"
			variantType="outline-primary"
		/>
	</div>

	<div class="col-md-4">
		<FeatureCard
			iconEmoji="💻"
			titleText="Code Examples"
			descriptionText="Interactive code examples with syntax highlighting and copy functionality."
			linkHref="/code-examples"
			linkLabel="Try It"
			variantType="outline-primary"
		/>
	</div>

	<div class="col-md-4">
		<FeatureCard
			iconEmoji="📐"
			titleText="Layout System"
			descriptionText="Responsive layout components with Bootstrap integration and custom styling."
			linkHref="/layout"
			linkLabel="Learn More"
			variantType="outline-primary"
		/>
	</div>

	<div class="col-md-4">
		<FeatureCard
			iconEmoji="🎨"
			titleText="Custom Styling"
			descriptionText="Visual customization, theming options, and SCSS variable configurations."
			linkHref="/styling"
			linkLabel="Customize"
			variantType="outline-primary"
		/>
	</div>

	<div class="col-md-4">
		<FeatureCard
			iconEmoji="📚"
			titleText="API Reference"
			descriptionText="Complete API documentation with TypeScript interfaces and examples."
			linkHref="/api-reference"
			linkLabel="Reference"
			variantType="outline-primary"
			badgeText="Updated"
			badgeVariantType="info"
		/>
	</div>
</CardGrid>

<div class="mt-5">
	<ShowcaseSection
		titleText="Quick Preview"
		subtitleText="See how the CodeShowcase component works with multiple language tabs"
	>
		{#snippet demoContent()}
			<CodeShowcase
				titleText="Multi-language Example"
				svelteCodeContent={svelteExample}
				typescriptCodeContent={typescriptExample}
				cssCodeContent={cssExample}
			/>
		{/snippet}

		{#snippet controlsContent()}
			<div class="form-group">
				<label class="form-label" for="installation-input">Installation</label>
				<input
					id="installation-input"
					class="form-control"
					value={installCode}
					readonly
				/>
			</div>
			<div class="form-group">
				<label class="form-label" for="import-style-select">Import Style</label>
				<select id="import-style-select" class="form-select">
					<option>Named imports</option>
					<option>Default imports</option>
					<option>Namespace imports</option>
				</select>
			</div>
		{/snippet}

		{#snippet descriptionContent()}
			<h6>Component Library Features</h6>
			<p>This library provides:</p>
			<ul>
				<li><strong>ShowcaseSection</strong> - Three-column layout for demos</li>
				<li><strong>CodeShowcase</strong> - Multi-tab code examples</li>
				<li><strong>DocLayout</strong> - Page layout with navigation</li>
				<li><strong>Bootstrap Integration</strong> - Full Bootstrap 5 support</li>
			</ul>

			<h6>Usage Guidelines</h6>
			<p>
				Each component is designed to be used independently or together as part of
				a complete documentation site. The components follow Bootstrap conventions
				for consistent styling and responsive behavior.
			</p>

			<code>npm install svelte-docs-lib</code>
		{/snippet}
	</ShowcaseSection>

	<ShowcaseSection
		titleText="Configuration System"
		subtitleText="New powerful configuration system for easy customization"
	>
		{#snippet demoContent()}
			<CodeShowcase
				titleText="Configuration Example"
				tabItems={[
					{ labelText: 'Setup', codeContent: configExample, languageType: 'typescript' },
					{ labelText: 'Components', codeContent: svelteExample, languageType: 'svelte' },
					{ labelText: 'Styling', codeContent: cssExample, languageType: 'css' }
				]}
			/>
		{/snippet}

		{#snippet controlsContent()}
			<div class="form-group">
				<label class="form-label" for="config-type">Configuration Type</label>
				<select id="config-type" class="form-select">
					<option>Basic Configuration</option>
					<option>Advanced Configuration</option>
					<option>SvelteKit Configuration</option>
					<option>Minimal Configuration</option>
				</select>
			</div>
			<div class="form-group">
				<label class="form-label" for="theme-preset">Theme Preset</label>
				<select id="theme-preset" class="form-select">
					<option>Default Theme</option>
					<option>Custom Theme</option>
					<option>SvelteKit Theme</option>
					<option>Dark Theme</option>
				</select>
			</div>
		{/snippet}

		{#snippet descriptionContent()}
			<h6>🎯 Easy Configuration</h6>
			<p>
				The new configuration system allows you to customize your documentation site
				with a simple configuration object. No need to modify component props individually.
			</p>

			<h6>🎨 Automatic Theming</h6>
			<p>
				Define your colors, fonts, and component styles in the configuration,
				and they'll be applied automatically via CSS custom properties.
			</p>

			<h6>🔧 Type Safety</h6>
			<p>
				Full TypeScript support with validation and helpful error messages
				for configuration issues during development.
			</p>

			<h6>📋 Features Included</h6>
			<ul>
				<li><strong>Site Configuration</strong> - Title, description, SEO settings</li>
				<li><strong>Company Information</strong> - Branding, social links, contact info</li>
				<li><strong>Navigation Structure</strong> - Multi-level navigation with icons</li>
				<li><strong>Theme Customization</strong> - Colors, fonts, component styling</li>
				<li><strong>Feature Toggles</strong> - Enable/disable functionality</li>
			</ul>
		{/snippet}
	</ShowcaseSection>
</div>
</DocLayout>
