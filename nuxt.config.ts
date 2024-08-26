// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // ssr: false,
  experimental: {
    typedPages: true,
    payloadExtraction: true,
  },
  nitro: {
    preset: 'github-pages'
  },
  modules: [
    '@vite-pwa/nuxt',
    'vuetify-nuxt-module',
    '@nuxtjs/i18n',
    'nuxt3-localforage',
  ],
  vite: {
    optimizeDeps: {
      include: ['localforage'],
    },
  },
  localForage: {
    instances: [
      {
        name: 'lists',
      },
      {
        name: 'settings',
      }
    ]
  },
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
        name: 'English',
      },
      {
        code: 'de',
        iso: 'de-DE',
        file: 'de-DE.json',
        name: 'Deutsch'
      }
    ],
    langDir: 'locales',
    defaultLocale: 'en'
  },
  pwa: {
    registerType: 'autoUpdate',
    registerWebManifestInRouteRules: true,
    // devOptions: {
    //   enabled: true
    // }
    includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
    manifest: {
      name: 'Shopping List',
      short_name: 'ShoppingList',
      description: 'Simple app for creating shopping lists',
      theme_color: '#ffffff',
      icons: [
        {
          "src": "pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    }
  }
})