import type { PartialDocsConfig } from "$lib/types/config.js";
import { mergeConfig, defaultConfig } from "$lib/types/config.js";
import { generateSSRStyles } from "$lib/utils/ssr-styles.js";

// This configuration will be loaded server-side and passed to the client
const showcaseConfig: PartialDocsConfig = {
  site: {
    title: "Documentation Library Showcase",
    description:
      "A comprehensive component library for building beautiful documentation sites with SvelteKit",
    keywords: [
      "svelte",
      "sveltekit",
      "documentation",
      "components",
      "library",
    ],
    author: "Documentation Library Team",
    language: "en",
  },
  company: {
    name: "Documentation Library",
    website: "https://github.com/your-org/svelte-docs-lib",
    social: {
      github: "https://github.com/your-org/svelte-docs-lib",
      twitter: "https://twitter.com/yourorg",
    },
  },
  navigation: {
    main: [
      { label: "Home", href: "/", icon: "🏠" },
      { label: "Menu Demo", href: "/menu-example", icon: "📋" },
      { label: "Showcase Demo", href: "/anchor-demo", icon: "🔗" },
      { label: "Card Demo", href: "/card-demo", icon: "🃏" },
      { label: "Mermaid Demo", href: "/mermaid-demo", icon: "📊" },
      { label: "HLJS Test", href: "/hljs-test", icon: "🔬" },
      {
        label: "Page Metadata",
        href: "/metadata-example",
        icon: "📄",
        badge: "Demo"
      },
    ],
  },
  features: {
    search: true,
    breadcrumbs: true,
    copyCode: true,
    tableOfContents: true,
  },
};

export async function load() {
  // Merge configuration server-side
  const mergedConfig = mergeConfig(defaultConfig, showcaseConfig);

  // Generate SSR styles for immediate rendering
  const ssrStyles = generateSSRStyles(mergedConfig);

  return {
    config: mergedConfig,
    ssrStyles
  };
}