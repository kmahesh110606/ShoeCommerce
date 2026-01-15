import { categories } from '../../data.js';

const DEFAULT_THEME = {
  name: 'Default',
  'primary-color': 'rgba(34, 34, 34, 0.85)',
  'secondary-color': 'rgba(34, 34, 34, 0.65)',
  'text-color-primary': '#0a0a0a',
  'text-color-secondary': 'rgba(10, 10, 10, 0.75)',
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
