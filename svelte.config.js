import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: false, // Allow 404s for demo routes
    }),
    prerender: {
      handleHttpError: 'warn', // Don't fail on 404s
    },
  },

  // Disable A11y warnings for demo routes during build
  compilerOptions: {
    warningFilter: (warning) => {
      // Disable A11y warnings for demo pages
      if (warning.code === 'a11y_label_has_associated_control') {
        return false;
      }
      return true;
    }
  },
};

export default config;
