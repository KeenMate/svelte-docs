import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// Disable A11y warnings for demo routes during build
	define: {
		__VITE_IS_PRODUCTION__: JSON.stringify(process.env.NODE_ENV === 'production')
	}
});
