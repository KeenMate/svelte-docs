/**
 * Viewport store for tracking responsive breakpoints
 * Uses Svelte 5 runes for reactivity
 */

// Bootstrap's lg breakpoint (992px)
const MOBILE_BREAKPOINT = 992;

class ViewportStore {
	isMobileView = $state(false);
	windowWidth = $state(0);

	constructor() {
		if (typeof window !== 'undefined') {
			// Initialize immediately
			this.windowWidth = window.innerWidth;
			this.isMobileView = window.innerWidth < MOBILE_BREAKPOINT;

			// Listen for resize events
			window.addEventListener('resize', this.handleResize);
		}
	}

	private handleResize = () => {
		if (typeof window !== 'undefined') {
			this.windowWidth = window.innerWidth;
			this.isMobileView = window.innerWidth < MOBILE_BREAKPOINT;
		}
	};

	// Cleanup method (call this if needed)
	destroy() {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.handleResize);
		}
	}
}

// Create singleton instance
export const viewportStore = new ViewportStore();
