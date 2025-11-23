<script lang="ts">
	import { DocLayout, Card, CodeBlock } from '$lib';

	const basicCardExample = `<Card titleText="Basic Card" subtitleText="Simple card example">
  {#snippet bodyContent()}
    <p class="card-text">
      This is a basic card with title, subtitle, and body content.
    </p>
  {/snippet}
</Card>`;

	const headerFooterExample = `<Card titleText="Card with Header & Footer">
  {#snippet headerContent()}
    <strong>Featured</strong>
  {/snippet}

  {#snippet bodyContent()}
    <p class="card-text">Card with custom header and footer sections.</p>
  {/snippet}

  {#snippet footerContent()}
    <small class="text-muted">Last updated 3 mins ago</small>
  {/snippet}
</Card>`;

	const variantExample = `<Card
  titleText="Primary Card"
  variantType="primary"
>
  {#snippet bodyContent()}
    <p class="card-text text-white">
      Card with primary background variant.
    </p>
  {/snippet}
</Card>`;

	const imageExample = `<Card
  titleText="Card with Image"
  imageUrl="https://via.placeholder.com/300x200"
  imageAltText="Placeholder"
  imagePosition="top"
>
  {#snippet bodyContent()}
    <p class="card-text">Card with image at the top.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  {/snippet}
</Card>`;
</script>

<svelte:head>
	<title>Card Component Demo</title>
</svelte:head>

<DocLayout titleText="Card Component Demo">
	<h1>Card Component</h1>
	<p class="lead">
		A flexible, generic card component for displaying content in a contained, styled format.
	</p>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Basic Card</h2>
		<p>Simple card with title, subtitle, and body content:</p>

		<div class="row">
			<div class="col-md-6">
				<Card titleText="Basic Card" subtitleText="Simple card example">
					{#snippet bodyContent()}
						<p class="card-text">
							This is a basic card with title, subtitle, and body content. Use it for
							displaying any kind of information in a clean, organized way.
						</p>
					{/snippet}
				</Card>
			</div>
		</div>

		<div class="mt-3">
			<CodeBlock codeContent={basicCardExample} languageType="svelte" />
		</div>
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Card with Header & Footer</h2>
		<p>Cards can have custom header and footer sections:</p>

		<div class="row">
			<div class="col-md-6">
				<Card titleText="Featured Content">
					{#snippet headerContent()}
						<strong>Featured</strong>
					{/snippet}

					{#snippet bodyContent()}
						<p class="card-text">
							This card includes a custom header and footer section. Perfect for
							highlighting important content or adding metadata.
						</p>
					{/snippet}

					{#snippet footerContent()}
						<small class="text-muted">Last updated 3 mins ago</small>
					{/snippet}
				</Card>
			</div>
		</div>

		<div class="mt-3">
			<CodeBlock codeContent={headerFooterExample} languageType="svelte" />
		</div>
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Color Variants</h2>
		<p>Cards support Bootstrap color variants:</p>

		<div class="row g-3">
			<div class="col-md-4">
				<Card titleText="Primary Card" variantType="primary">
					{#snippet bodyContent()}
						<p class="card-text text-white">Card with primary background.</p>
					{/snippet}
				</Card>
			</div>

			<div class="col-md-4">
				<Card titleText="Success Card" variantType="success">
					{#snippet bodyContent()}
						<p class="card-text text-white">Card with success background.</p>
					{/snippet}
				</Card>
			</div>

			<div class="col-md-4">
				<Card titleText="Info Card" variantType="info">
					{#snippet bodyContent()}
						<p class="card-text text-white">Card with info background.</p>
					{/snippet}
				</Card>
			</div>

			<div class="col-md-4">
				<Card titleText="Warning Card" variantType="warning">
					{#snippet bodyContent()}
						<p class="card-text">Card with warning background.</p>
					{/snippet}
				</Card>
			</div>

			<div class="col-md-4">
				<Card titleText="Danger Card" variantType="danger">
					{#snippet bodyContent()}
						<p class="card-text text-white">Card with danger background.</p>
					{/snippet}
				</Card>
			</div>

			<div class="col-md-4">
				<Card titleText="Light Card" variantType="light">
					{#snippet bodyContent()}
						<p class="card-text">Card with light background.</p>
					{/snippet}
				</Card>
			</div>
		</div>

		<div class="mt-3">
			<CodeBlock codeContent={variantExample} languageType="svelte" />
		</div>
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Border Variants</h2>
		<p>Cards can have colored borders without background colors:</p>

		<div class="row g-3">
			<div class="col-md-4">
				<Card titleText="Primary Border" borderVariantType="primary">
					{#snippet bodyContent()}
						<p class="card-text">Card with primary border only.</p>
					{/snippet}
				</Card>
			</div>

			<div class="col-md-4">
				<Card titleText="Success Border" borderVariantType="success">
					{#snippet bodyContent()}
						<p class="card-text">Card with success border only.</p>
					{/snippet}
				</Card>
			</div>

			<div class="col-md-4">
				<Card titleText="Danger Border" borderVariantType="danger">
					{#snippet bodyContent()}
						<p class="card-text">Card with danger border only.</p>
					{/snippet}
				</Card>
			</div>
		</div>
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Hover Effect</h2>
		<p>Cards can have a hover effect that lifts them up:</p>

		<div class="row">
			<div class="col-md-6">
				<Card titleText="Hoverable Card" hasHoverEffect={true}>
					{#snippet bodyContent()}
						<p class="card-text">
							Hover over this card to see the lift effect. Great for interactive
							elements like links or buttons.
						</p>
						<a href="#" class="btn btn-primary">Click me</a>
					{/snippet}
				</Card>
			</div>
		</div>
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Card with Image</h2>
		<p>Cards can include images at the top or bottom:</p>

		<div class="row">
			<div class="col-md-6">
				<Card
					titleText="Card with Image"
					imageUrl="https://via.placeholder.com/600x300/00A7E1/ffffff?text=Sample+Image"
					imageAltText="Sample placeholder"
					imagePosition="top"
				>
					{#snippet bodyContent()}
						<p class="card-text">
							This card includes an image at the top. You can also place images at the
							bottom using <code>imagePosition="bottom"</code>.
						</p>
						<a href="#" class="btn btn-primary">Go somewhere</a>
					{/snippet}
				</Card>
			</div>
		</div>

		<div class="mt-3">
			<CodeBlock codeContent={imageExample} languageType="svelte" />
		</div>
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Component Properties</h2>
		<p>The <code>Card</code> component accepts the following properties:</p>

		<ul>
			<li><code>titleText</code> (optional) - Card title</li>
			<li><code>subtitleText</code> (optional) - Card subtitle</li>
			<li>
				<code>variantType</code> (optional) - Background color variant: 'primary', 'secondary',
				'success', 'info', 'warning', 'danger', 'light', 'dark'
			</li>
			<li>
				<code>borderVariantType</code> (optional) - Border color variant (same options as
				variantType)
			</li>
			<li><code>hasHoverEffect</code> (optional) - Enable hover lift effect (default: false)</li>
			<li><code>imageUrl</code> (optional) - URL for card image</li>
			<li><code>imageAltText</code> (optional) - Alt text for image</li>
			<li>
				<code>imagePosition</code> (optional) - Image position: 'top' or 'bottom' (default: 'top')
			</li>
			<li><code>headerContent</code> (optional) - Snippet for custom header</li>
			<li><code>bodyContent</code> (optional) - Snippet for card body content</li>
			<li><code>footerContent</code> (optional) - Snippet for custom footer</li>
		</ul>
	</section>
</DocLayout>
