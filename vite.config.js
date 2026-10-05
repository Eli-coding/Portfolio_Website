import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base so the build works on Vercel, Netlify or GitHub Pages.
  base: './',
  // Vitest: browser-like DOM, Testing Library matchers and English translations loaded up front.
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
});
