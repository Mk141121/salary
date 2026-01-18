// Theme management utility
// Light theme only

export type Theme = 'light';

export function applyTheme(): void {
  document.documentElement.setAttribute('data-theme', 'light');
  
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', '#f8fafc');
  }
}

export function initTheme(): void {
  applyTheme();
}
