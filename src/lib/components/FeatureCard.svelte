<script lang="ts">
	interface Props {
		iconEmoji?: string;
		titleText: string;
		descriptionText: string;
		linkHref?: string;
		linkLabel?: string;
		variantType?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-info' | 'outline-warning' | 'outline-danger';
		badgeText?: string;
		badgeVariantType?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
		isDisabled?: boolean;
	}

	let {
		iconEmoji,
		titleText,
		descriptionText,
		linkHref,
		linkLabel = 'Learn More',
		variantType = 'outline-primary',
		badgeText,
		badgeVariantType = 'secondary',
		isDisabled = false
	}: Props = $props();
</script>

<div class="card h-100 feature-card {isDisabled ? 'disabled' : ''}">
	<div class="card-body d-flex flex-column">
		<div class="d-flex align-items-start mb-3">
			{#if iconEmoji}
				<span class="feature-icon me-3">{iconEmoji}</span>
			{/if}
			<div class="flex-fill">
				<h5 class="card-title mb-0">
					{titleText}
					{#if badgeText}
						<span class="badge bg-{badgeVariantType} ms-2 small">{badgeText}</span>
					{/if}
				</h5>
			</div>
		</div>

		<p class="card-text flex-fill">
			{descriptionText}
		</p>

		{#if linkHref && !isDisabled}
			<div class="mt-auto">
				<a href={linkHref} class="btn btn-{variantType} w-100">
					{linkLabel}
				</a>
			</div>
		{:else if linkHref && isDisabled}
			<div class="mt-auto">
				<button class="btn btn-{variantType} w-100" disabled>
					{linkLabel} <small>(Coming Soon)</small>
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.feature-card {
		transition: all 0.3s ease;
		border: 1px solid rgba(0, 0, 0, 0.125);
		height: 100%;
	}

	.feature-card:not(.disabled):hover {
		transform: translateY(-5px);
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		border-color: var(--bs-primary);
	}

	.feature-card.disabled {
		opacity: 0.7;
		background-color: #f8f9fa;
	}

	.feature-icon {
		font-size: 1.5rem;
		line-height: 1;
		display: inline-block;
		flex-shrink: 0;
	}

	.card-body {
		min-height: 200px;
	}

	.card-title {
		color: var(--bs-dark);
		font-weight: 600;
	}

	.card-text {
		color: #6c757d;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	/* Ensure consistent button positioning */
	.mt-auto {
		margin-top: auto !important;
	}

	/* Hover effect for icon */
	.feature-card:not(.disabled):hover .feature-icon {
		transform: scale(1.1);
		transition: transform 0.2s ease;
	}
</style>