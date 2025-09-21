<script lang="ts">
  import { onMount } from "svelte";
  import type { PartialDocsConfig } from "../types/config.js";
  import { configStore } from "../stores/config.svelte.js";

  interface Props {
    configData: PartialDocsConfig;
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
    children,
    pageTitleText,
    pageDescriptionText,
    pageKeywordsList,
    pageAuthorName,
    pageOgImageUrl,
  }: Props = $props();

  // Merge page-specific metadata with site config
  let mergedTitle = $derived.by(() => {
    if (pageTitleText) {
      return configData.site?.title
        ? `${pageTitleText} - ${configData.site.title}`
        : pageTitleText;
    }
    return configData.site?.title || "";
  });

  let mergedDescription = $derived.by(() => {
    return pageDescriptionText || configData.site?.description || "";
  });

  let mergedKeywords = $derived.by(() => {
    const siteKeywords = configData.site?.keywords || [];
    const combinedKeywords = pageKeywordsList
      ? [...siteKeywords, ...pageKeywordsList]
      : siteKeywords;
    // Remove duplicates
    return [...new Set(combinedKeywords)];
  });

  let mergedAuthor = $derived.by(() => {
    return pageAuthorName || configData.site?.author || "";
  });

  let mergedOgImage = $derived.by(() => {
    return pageOgImageUrl || configData.site?.ogImage || "";
  });

  // Initialize configuration on mount
  onMount(() => {
    // Initialize configuration immediately
    configStore.initialize(configData);
    
    // Apply theme immediately if on client
    if (typeof document !== "undefined") {
      // Set data attributes for CSS targeting
      document.documentElement.setAttribute("data-theme", "docs");

      // Add site title to document if not already set
      if (
        configData.site?.title?.trim() &&
        !document.title.includes(configData.site.title)
      ) {
        document.title = configData.site.title;
      }

      // Set meta description
      if (configData.site?.description?.trim()) {
        let metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.setAttribute("content", configData.site.description);
        } else {
          metaDescription = document.createElement("meta");
          metaDescription.setAttribute("name", "description");
          metaDescription.setAttribute("content", configData.site.description);
          document.head.appendChild(metaDescription);
        }
      }

      // Set meta keywords
      if (configData.site?.keywords?.length && configData.site.keywords.length > 0) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute(
            "content",
            configData.site.keywords.join(", ")
          );
        } else {
          metaKeywords = document.createElement("meta");
          metaKeywords.setAttribute("name", "keywords");
          metaKeywords.setAttribute(
            "content",
            configData.site.keywords.join(", ")
          );
          document.head.appendChild(metaKeywords);
        }
      }

      // Set author meta tag
      if (configData.site?.author?.trim()) {
        let metaAuthor = document.querySelector('meta[name="author"]');
        if (metaAuthor) {
          metaAuthor.setAttribute("content", configData.site.author);
        } else {
          metaAuthor = document.createElement("meta");
          metaAuthor.setAttribute("name", "author");
          metaAuthor.setAttribute("content", configData.site.author);
          document.head.appendChild(metaAuthor);
        }
      }

      // Set Open Graph tags
      if (configData.site?.ogImage?.trim()) {
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
          ogImage.setAttribute("content", configData.site.ogImage);
        } else {
          ogImage = document.createElement("meta");
          ogImage.setAttribute("property", "og:image");
          ogImage.setAttribute("content", configData.site.ogImage);
          document.head.appendChild(ogImage);
        }
      }

      // Set Twitter Card tags
      if (configData.site?.twitterHandle?.trim()) {
        let twitterSite = document.querySelector('meta[name="twitter:site"]');
        if (twitterSite) {
          twitterSite.setAttribute("content", configData.site.twitterHandle);
        } else {
          twitterSite = document.createElement("meta");
          twitterSite.setAttribute("name", "twitter:site");
          twitterSite.setAttribute("content", configData.site.twitterHandle);
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

  {#if configData.site?.language?.trim()}
    <meta name="language" content={configData.site.language} />
  {/if}

  {#if mergedOgImage?.trim()}
    <meta property="og:image" content={mergedOgImage} />
    <meta name="twitter:image" content={mergedOgImage} />
  {/if}

  {#if configData.site?.url?.trim()}
    <meta property="og:url" content={configData.site.url} />
  {/if}

  {#if configData.site?.twitterHandle?.trim()}
    <meta name="twitter:site" content={configData.site.twitterHandle} />
    <meta name="twitter:creator" content={configData.site.twitterHandle} />
  {/if}

  <!-- Open Graph and Twitter Card defaults -->
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Canonical URL -->
  {#if configData.site?.url?.trim()}
    <link rel="canonical" href={configData.site.url} />
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
