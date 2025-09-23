import type { DocsConfig } from '../types/config.js';

/**
 * Generates inline CSS styles for SSR to prevent FOUC
 * This applies theme variables directly to the HTML head
 */
export function generateSSRStyles(config: DocsConfig): string {
  const styles: string[] = [
    ':root {',
  ];

  // Add color variables
  if (config.theme?.colors) {
    Object.entries(config.theme.colors).forEach(([key, value]) => {
      if (value) {
        styles.push(`  --docs-${key}: ${value};`);

        // Add RGB values for rgba usage
        if (key === 'primary' || key === 'secondary' || key === 'success' || key === 'danger') {
          const rgb = hexToRgb(value);
          if (rgb) {
            styles.push(`  --docs-${key}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};`);
          }
        }
      }
    });
  }

  // Add font variables
  if (config.theme?.fonts) {
    if (config.theme.fonts.body) {
      styles.push(`  --docs-font-body: ${config.theme.fonts.body};`);
    }
    if (config.theme.fonts.heading) {
      styles.push(`  --docs-font-heading: ${config.theme.fonts.heading};`);
    }
    if (config.theme.fonts.mono) {
      styles.push(`  --docs-font-mono: ${config.theme.fonts.mono};`);
    }
  }

  // Add component variables
  if (config.theme?.components) {
    if (config.theme.components.navbar?.height) {
      styles.push(`  --navbar-height: ${config.theme.components.navbar.height};`);
    }
    if (config.theme.components.sidebar?.width) {
      styles.push(`  --sidebar-width: ${config.theme.components.sidebar.width};`);
    }
    if (config.theme.components.footer?.height) {
      styles.push(`  --footer-height: ${config.theme.components.footer.height};`);
    }
  }

  styles.push('}');

  // Add body styling to prevent layout shift
  styles.push('');
  styles.push('body {');
  styles.push('  margin: 0;');
  styles.push('  padding: 0;');
  styles.push('  padding-top: var(--navbar-height, 56px);');
  if (config.theme?.fonts?.body) {
    styles.push(`  font-family: ${config.theme.fonts.body};`);
  }
  styles.push('  color: var(--docs-body-color, #212529);');
  styles.push('  background-color: #fafafa;');
  styles.push('}');

  // Add theme data attribute
  styles.push('');
  styles.push('html[data-theme="docs"] {');
  styles.push('  position: relative;');
  styles.push('}');

  return styles.join('\n');
}

/**
 * Utility function to convert hex to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}