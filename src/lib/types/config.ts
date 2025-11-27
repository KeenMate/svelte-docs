// Configuration types for the documentation library

export interface SiteConfig {
  /** Site metadata */
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  language?: string;
  /** Site URLs */
  url?: string;
  baseUrl?: string;
  /** SEO and social */
  ogImage?: string;
  twitterHandle?: string;
}

export interface CompanyConfig {
  /** Company information */
  name: string;
  website?: string;
  logo?: string;
  logoAlt?: string;
  /** Contact information */
  email?: string;
  phone?: string;
  address?: string;
  /** Social media */
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    discord?: string;
    slack?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top' | string;
  children?: NavigationItem[];
  badge?: string;
  disabled?: boolean;
  tooltip?: string;
}

export interface NavigationConfig {
  /** Main navigation items */
  main: NavigationItem[];
  /** Footer navigation items */
  footer?: NavigationItem[];
  /** Social navigation items (will use company.social if not provided) */
  social?: NavigationItem[];
}

export interface ThemeConfig {
  /** Color scheme */
  colors?: {
    primary?: string;
    primaryDark?: string;
    secondary?: string;
    dark?: string;
    light?: string;
    success?: string;
    warning?: string;
    danger?: string;
    info?: string;
  };
  /** Typography */
  fonts?: {
    body?: string;
    heading?: string;
    mono?: string;
  };
  /** Component styling */
  components?: {
    navbar?: {
      height?: string;
      background?: string;
    };
    sidebar?: {
      width?: string;
      background?: string;
    };
    footer?: {
      background?: string;
      height?: string;
    };
    tooltip?: {
      /** Enable/disable tooltips globally */
      isEnabled?: boolean;
      /** Default tooltip placement */
      placement?: 'top' | 'right' | 'bottom' | 'left';
      /** Show tooltips on mobile devices */
      showOnMobile?: boolean;
      /** Delay before showing tooltip (ms) */
      showDelay?: number;
      /** Delay before hiding tooltip (ms) */
      hideDelay?: number;
      /** Tooltip background color */
      backgroundColor?: string;
      /** Tooltip text color */
      textColor?: string;
      /** Tooltip font size */
      fontSize?: string;
      /** Maximum width of tooltip */
      maxWidth?: string;
      /** Z-index value */
      zIndex?: number;
      /** Border radius */
      borderRadius?: string;
      /** Padding */
      padding?: string;
      /** Arrow size */
      arrowSize?: string;
    };
  };
}

export interface FeaturesConfig {
  /** Enable/disable features */
  search?: boolean;
  tableOfContents?: boolean;
  breadcrumbs?: boolean;
  editOnGitHub?: boolean;
  lastModified?: boolean;
  nextPrevious?: boolean;
  copyCode?: boolean;
  darkMode?: boolean;
  /** Array of script tags to inject in <head> for analytics (e.g., Plausible, Google Analytics, etc.) */
  analyticsScripts?: string[];
  /** GitHub integration */
  github?: {
    repo: string;
    branch?: string;
    docsPath?: string;
  };
}

export interface DocsConfig {
  site: SiteConfig;
  company: CompanyConfig;
  navigation: NavigationConfig;
  theme?: ThemeConfig;
  features?: FeaturesConfig;
}

// Helper types for partial configurations
export type PartialDocsConfig = {
  site: SiteConfig;
  company: CompanyConfig;
  navigation: NavigationConfig;
  theme?: Partial<ThemeConfig>;
  features?: Partial<FeaturesConfig>;
};

// Default configuration
export const defaultConfig: Partial<DocsConfig> = {
  site: {
	title: "Documentation",
    language: "en",
    keywords: ["documentation", "svelte", "sveltekit"],
  },
  theme: {
    colors: {
      primary: "#00A7E1",
      primaryDark: "#007EA7",
      secondary: "#003459",
      dark: "#00171F",
      light: "#FFFFFF",
      success: "#198754",
      warning: "#ffc107",
      danger: "#dc3545",
      info: "#0dcaf0",
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      heading:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"Courier New", Monaco, "Cascadia Code", "Roboto Mono", monospace',
    },
    components: {
      navbar: {
        height: "56px",
      },
      sidebar: {
        width: "280px",
      },
      footer: {
        height: "60px",
      },
      tooltip: {
        isEnabled: true,
        placement: "right",
        showOnMobile: false,
        showDelay: 0,
        hideDelay: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        textColor: "white",
        fontSize: "0.875rem",
        maxWidth: "300px",
        zIndex: 1060,
        borderRadius: "0.375rem",
        padding: "0.5rem 0.75rem",
        arrowSize: "8px",
      },
    },
  },
  features: {
    search: true,
    tableOfContents: true,
    breadcrumbs: true,
    copyCode: true,
    darkMode: false,
    editOnGitHub: false,
    lastModified: false,
    nextPrevious: true,
  },
};

// Configuration validation helpers
export function validateConfig(config: PartialDocsConfig): string[] {
  const errors: string[] = [];

  // Required fields
  if (!config.site.title) {
    errors.push("site.title is required");
  }
  if (!config.company.name) {
    errors.push("company.name is required");
  }
  if (!config.navigation.main || config.navigation.main.length === 0) {
    errors.push("navigation.main must contain at least one item");
  }

  // Validate navigation items
  const validateNavItems = (
    items: NavigationItem[],
    path = "navigation.main"
  ) => {
    items.forEach((item, index) => {
      if (!item.label) {
        errors.push(`${path}[${index}].label is required`);
      }
      if (!item.href) {
        errors.push(`${path}[${index}].href is required`);
      }
      if (item.children) {
        validateNavItems(item.children, `${path}[${index}].children`);
      }
    });
  };

  validateNavItems(config.navigation.main);

  if (config.navigation.footer) {
    validateNavItems(config.navigation.footer, "navigation.footer");
  }

  // Validate URLs
  if (config.site.url && !isValidUrl(config.site.url)) {
    errors.push("site.url must be a valid URL");
  }
  if (config.company.website && !isValidUrl(config.company.website)) {
    errors.push("company.website must be a valid URL");
  }

  // Validate social links
  if (config.company.social) {
    Object.entries(config.company.social).forEach(([platform, url]) => {
      if (url && !isValidUrl(url)) {
        errors.push(`company.social.${platform} must be a valid URL`);
      }
    });
  }

  return errors;
}

// Helper function to validate URLs
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

// Configuration merging utility
export function mergeConfig(
  baseConfig: Partial<DocsConfig>,
  userConfig: PartialDocsConfig
): DocsConfig {
  return {
    site: { ...baseConfig.site, ...userConfig.site },
    company: {
      ...baseConfig.company,
      ...userConfig.company,
      social: { ...baseConfig.company?.social, ...userConfig.company.social },
    },
    navigation: {
      ...baseConfig.navigation,
      ...userConfig.navigation,
      main: userConfig.navigation.main,
      footer: userConfig.navigation.footer || baseConfig.navigation?.footer,
      social: userConfig.navigation.social || baseConfig.navigation?.social,
    },
    theme: {
      ...baseConfig.theme,
      ...userConfig.theme,
      colors: { ...baseConfig.theme?.colors, ...userConfig.theme?.colors },
      fonts: { ...baseConfig.theme?.fonts, ...userConfig.theme?.fonts },
      components: {
        ...baseConfig.theme?.components,
        ...userConfig.theme?.components,
        navbar: {
          ...baseConfig.theme?.components?.navbar,
          ...userConfig.theme?.components?.navbar,
        },
        sidebar: {
          ...baseConfig.theme?.components?.sidebar,
          ...userConfig.theme?.components?.sidebar,
        },
        footer: {
          ...baseConfig.theme?.components?.footer,
          ...userConfig.theme?.components?.footer,
        },
        tooltip: {
          ...baseConfig.theme?.components?.tooltip,
          ...userConfig.theme?.components?.tooltip,
        },
      },
    },
    features: { ...baseConfig.features, ...userConfig.features },
  } as DocsConfig;
}
