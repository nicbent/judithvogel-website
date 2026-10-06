import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.judithvogel.de',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
