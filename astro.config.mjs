import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://Dmitry-420.github.io',
  base: '/i-love-padel',
  integrations: [vue(), icon()],
  vite: { plugins: [tailwindcss()] },
});