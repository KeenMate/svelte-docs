<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { ConfigProvider } from "$lib";
  import type { PartialDocsConfig } from "$lib/types/config.js";

  // Import the custom styles
  import "$lib/styles/main.scss";

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  // Example configuration for the showcase
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
        { label: "Anchor Demo", href: "/anchor-demo", icon: "🔗" },
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
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ConfigProvider configData={showcaseConfig}>
  {@render children?.()}
</ConfigProvider>
