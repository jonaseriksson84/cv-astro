import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Sharp options for image optimization
        jpeg: { quality: 85 },
        jpg: { quality: 85 },
        png: { quality: 85 },
        webp: { quality: 85 },
        avif: { quality: 85 },
        defaults: {
          format: 'webp',
          fallbackFormat: 'png',
        },
      },
    },
  },
})
