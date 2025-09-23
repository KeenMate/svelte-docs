<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { ConfigProvider } from "$lib";

  // Import the custom styles
  import "$lib/styles/main.scss";

  interface Props {
    children: import('svelte').Snippet;
    data: {
      config: import("$lib/types/config.js").DocsConfig;
      ssrStyles: string;
    };
  }

  let { children, data }: Props = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <!-- SSR Theme Styles to prevent FOUC -->
  <style>{@html data.ssrStyles}</style>
  <!-- Set theme data attribute immediately -->
  <script>
    document.documentElement.setAttribute('data-theme', 'docs');
  </script>
</svelte:head>

<ConfigProvider ssrConfig={data.config}>
  {@render children?.()}
</ConfigProvider>
