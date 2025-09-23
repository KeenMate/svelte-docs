<script lang="ts">
  import { onMount } from "svelte";
  import type { PartialDocsConfig, DocsConfig } from "../types/config.js";
  import { configStore } from "../stores/config.svelte.js";

  interface Props {
    configData?: PartialDocsConfig;
    // SSR-ready merged config (preferred for SSR)
    ssrConfig?: DocsConfig;
    children: import("svelte").Snippet;
    // Page-specific metadata that gets merged with site config
    pageTitleText?: string;
    pageDescriptionText?: string;
    pageKeywordsList?: string[];
    pageAuthorName?: string;
    pageOgImageUrl?: string;
  }

  let {
    configData,
    ssrConfig,
    children,
    pageTitleText,
    pageDescriptionText,
    pageKeywordsList,
    pageAuthorName,
    pageOgImageUrl,
  }: Props = $props();

  // Use SSR config if available, otherwise fall back to configData
  let activeConfig = $derived.by(() => {
    return ssrConfig || configData;
  });

  // Merge page-specific metadata with site config
  let mergedTitle = $derived.by(() => {
    if (pageTitleText) {
      return activeConfig?.site?.title
        ? `${pageTitleText} - ${activeConfig.site.title}`
        : pageTitleText;
    }
    return activeConfig?.site?.title || "";
  });

  let mergedDescription = $derived.by(() => {
    return pageDescriptionText || activeConfig?.site?.description || "";
  });

  let mergedKeywords = $derived.by(() => {
    const siteKeywords = activeConfig?.site?.keywords || [];
    const combinedKeywords = pageKeywordsList
      ? [...siteKeywords, ...pageKeywordsList]
      : siteKeywords;
    // Remove duplicates
    return [...new Set(combinedKeywords)];
  });

  let mergedAuthor = $derived.by(() => {
    return pageAuthorName || activeConfig?.site?.author || "";
  });

  let mergedOgImage = $derived.by(() => {
    return pageOgImageUrl || activeConfig?.site?.ogImage || "";
  });

  // Initialize configuration on mount
  onMount(() => {
    // Initialize configuration immediately
    if (ssrConfig) {
      // If we have SSR config, use it directly (already merged)
      configStore.initializeFromMerged(ssrConfig);
    } else if (configData) {
      // Fall back to client-side initialization
      configStore.initialize(configData);
    } else {
      console.warn('ConfigProvider: No configuration provided (ssrConfig or configData)');
    }
    
    // Apply theme immediately if on client
    if (typeof document !== "undefined") {
      // Set data attributes for CSS targeting
      document.documentElement.setAttribute("data-theme", "docs");

      // Add site title to document if not already set
      if (
        activeConfig?.site?.title?.trim() &&
        !document.title.includes(activeConfig.site.title)
      ) {
        document.title = activeConfig.site.title;
      }

      // Set meta description
      if (activeConfig?.site?.description?.trim()) {
        let metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.setAttribute("content", activeConfig.site.description);
        } else {
          metaDescription = document.createElement("meta");
          metaDescription.setAttribute("name", "description");
          metaDescription.setAttribute("content", activeConfig.site.description);
          document.head.appendChild(metaDescription);
        }
      }

      // Set meta keywords
      if (activeConfig?.site?.keywords?.length && activeConfig.site.keywords.length > 0) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute(
            "content",
            activeConfig.site.keywords.join(", ")
          );
        } else {
          metaKeywords = document.createElement("meta");
          metaKeywords.setAttribute("name", "keywords");
          metaKeywords.setAttribute(
            "content",
            activeConfig.site.keywords.join(", ")
          );
          document.head.appendChild(metaKeywords);
        }
      }

      // Set author meta tag
      if (activeConfig?.site?.author?.trim()) {
        let metaAuthor = document.querySelector('meta[name="author"]');
        if (metaAuthor) {
          metaAuthor.setAttribute("content", activeConfig.site.author);
        } else {
          metaAuthor = document.createElement("meta");
          metaAuthor.setAttribute("name", "author");
          metaAuthor.setAttribute("content", activeConfig.site.author);
          document.head.appendChild(metaAuthor);
        }
      }

      // Set Open Graph tags
      if (activeConfig?.site?.ogImage?.trim()) {
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
          ogImage.setAttribute("content", activeConfig.site.ogImage);
        } else {
          ogImage = document.createElement("meta");
          ogImage.setAttribute("property", "og:image");
          ogImage.setAttribute("content", activeConfig.site.ogImage);
          document.head.appendChild(ogImage);
        }
      }

      // Set Twitter Card tags
      if (activeConfig?.site?.twitterHandle?.trim()) {
        let twitterSite = document.querySelector('meta[name="twitter:site"]');
        if (twitterSite) {
          twitterSite.setAttribute("content", activeConfig.site.twitterHandle);
        } else {
          twitterSite = document.createElement("meta");
          twitterSite.setAttribute("name", "twitter:site");
          twitterSite.setAttribute("content", activeConfig.site.twitterHandle);
          document.head.appendChild(twitterSite);
        }
      }
    }
  });

  // Show validation errors in development
  $effect(() => {
    if (configStore.errors.length > 0) {
      console.warn("Configuration validation errors:", configStore.errors);
    }
  });
</script>

<svelte:head>
  {#if mergedTitle?.trim()}
    <title>{mergedTitle}</title>
    <meta property="og:title" content={mergedTitle} />
    <meta name="twitter:title" content={mergedTitle} />
  {/if}

  {#if mergedDescription?.trim()}
    <meta name="description" content={mergedDescription} />
    <meta property="og:description" content={mergedDescription} />
    <meta name="twitter:description" content={mergedDescription} />
  {/if}

  {#if mergedKeywords?.length > 0}
    <meta name="keywords" content={mergedKeywords.join(", ")} />
  {/if}

  {#if mergedAuthor?.trim()}
    <meta name="author" content={mergedAuthor} />
  {/if}

  {#if activeConfig?.site?.language?.trim()}
    <meta name="language" content={activeConfig.site.language} />
  {/if}

  {#if mergedOgImage?.trim()}
    <meta property="og:image" content={mergedOgImage} />
    <meta name="twitter:image" content={mergedOgImage} />
  {/if}

  {#if activeConfig?.site?.url?.trim()}
    <meta property="og:url" content={activeConfig.site.url} />
  {/if}

  {#if activeConfig?.site?.twitterHandle?.trim()}
    <meta name="twitter:site" content={activeConfig.site.twitterHandle} />
    <meta name="twitter:creator" content={activeConfig.site.twitterHandle} />
  {/if}

  <!-- Open Graph and Twitter Card defaults -->
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Canonical URL -->
  {#if activeConfig?.site?.url?.trim()}
    <link rel="canonical" href={activeConfig.site.url} />
  {/if}
</svelte:head>

<!-- Show configuration errors in development -->
{#if configStore.errors.length > 0 && typeof window !== "undefined" && window.location.hostname === "localhost"}
  <div
    class="alert alert-warning config-errors"
    style="margin: 1rem; padding: 1rem; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 0.5rem;"
  >
    <h6 style="color: #856404; margin-bottom: 0.5rem;">
      ⚠️ Configuration Validation Errors
    </h6>
    <ul style="color: #856404; margin: 0; padding-left: 1.5rem;">
      {#each configStore.errors as error}
        <li>{error}</li>
      {/each}
    </ul>
    <small style="color: #6c757d;"
      >This warning only appears in development.</small
    >
  </div>
{/if}

{@render children?.()}

<style>
  :global([data-theme="docs"]) {
    /* Theme is applied via CSS custom properties by the config store */
    position: relative;
  }

  .config-errors {
    position: relative;
    z-index: 9999;
  }
</style>
