import { categories } from '../../data.js';

const DEFAULT_THEME = {
  name: 'Default',
  'primary-color': 'rgba(36, 36, 36, 0.85)',
  'secondary-color': 'rgba(0, 0, 0, 0.65)',
  'text-color-primary': '#ffffff',
  'text-color-secondary': 'rgba(255, 255, 255, 0.85)',
  'font-family': 'system-ui, Arial, sans-serif',
};

export function getCategoryTheme(categoryName) {
  if (!categoryName) return DEFAULT_THEME;

  const theme = categories.find(
    (c) => String(c.name).toLowerCase() === String(categoryName).toLowerCase(),
  );

  return theme ?? DEFAULT_THEME;
}

export function themeToCssVars(theme) {
  const t = theme ?? DEFAULT_THEME;

  return {
    '--cat-primary': t['primary-color'],
    '--cat-secondary': t['secondary-color'],
    '--cat-text-primary': t['text-color-primary'],
    '--cat-text-secondary': t['text-color-secondary'],
    '--cat-font-family': t['font-family'],
  };
}
