import { createTheme } from '@mui/material/styles';

// Light = colorful/playful default. Dark = same personality, easier on the eyes.
const palettes = {
  light: {
    mode: 'light',
    primary: { main: '#6b2fd6', contrastText: '#ffffff' },
    secondary: { main: '#c2255c', contrastText: '#ffffff' },
    background: { default: '#fff8ef', paper: '#ffffff' },
    text: { primary: '#1e1a2b', secondary: '#4f4862' },
    divider: '#e3d9f0',
    outline: '#1e1a2b',
    // Soft grey-lavender for small badges/tags inside windows.
    badge: { border: '#d3cce0', background: '#f7f5fa' },
    window: { bar: '#ff9fd2', text: '#1e1a2b' },
    // Project tiles: background and symbol colors.
    tiles: [
      { background: '#ff9fd2', symbol: '#1e1a2b' },
      { background: '#3fdcdc', symbol: '#1e1a2b' },
      { background: '#ffc94d', symbol: '#1e1a2b' },
    ],
  },
  dark: {
    mode: 'dark',
    primary: { main: '#b794ff', contrastText: '#14121c' },
    secondary: { main: '#ff8fb3', contrastText: '#14121c' },
    background: { default: '#14121c', paper: '#1f1c2b' },
    text: { primary: '#f3eefc', secondary: '#c2b9d6' },
    divider: '#3a3452',
    outline: '#4b4366',
    badge: { border: '#3f3858', background: '#262236' },
    window: { bar: '#5c2a4a', text: '#ffd1ea' },
    tiles: [
      { background: '#5c2a4a', symbol: '#ffd1ea' },
      { background: '#1c5656', symbol: '#b8fbf6' },
      { background: '#5e4718', symbol: '#ffe2a3' },
    ],
  },
};

export function getTheme(mode) {
  const palette = palettes[mode] ?? palettes.light;
  const chunky = (offset) => `${offset}px ${offset}px 0 ${palette.outline}`;

  return createTheme({
    palette,
    shape: { borderRadius: 12 },
    typography: {
      // Lexend: dyslexia-friendly typeface (see ADR).
      fontFamily: '"Lexend", system-ui, sans-serif',
      body1: { lineHeight: 1.6, letterSpacing: '0.01em' },
      body2: { lineHeight: 1.6, letterSpacing: '0.01em' },
      h1: { fontWeight: 700, lineHeight: 1.2 },
      h2: { fontWeight: 700, lineHeight: 1.25 },
      h3: { fontWeight: 700, lineHeight: 1.3 },
      // No all-caps buttons: long uppercase text is harder to read.
      button: { textTransform: 'none', fontWeight: 700 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '@media (prefers-reduced-motion: no-preference)': {
            html: { scrollBehavior: 'smooth' },
          },
          body: { textAlign: 'left' },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'inherit' },
        styleOverrides: {
          root: {
            backgroundColor: palette.background.default,
            borderBottom: `2px solid ${palette.divider}`,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          contained: { border: `2px solid ${palette.outline}`, boxShadow: chunky(3) },
          outlined: {
            border: `2px solid ${palette.outline}`,
            color: palette.text.primary,
            backgroundColor: palette.background.paper,
            boxShadow: chunky(3),
            '&:hover': { border: `2px solid ${palette.outline}` },
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            // Soft and flat: cards sit inside section windows, which carry the dark outline and shadow.
            border: `2px solid ${palette.badge.border}`,
            backgroundColor: palette.badge.background,
            borderRadius: 14,
            boxShadow: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 500, fontSize: '0.9rem' } },
      },
    },
  });
}
