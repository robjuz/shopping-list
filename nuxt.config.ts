// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // ssr: false,
  experimental: {
    typedPages: true,
    payloadExtraction: true
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
        storeName: 'lists'
      },
      {
        name: 'settings',
        storeName: 'settings'
      }
    ]
  },
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
        name: 'English'
      },
      {
        code: 'de',
        file: 'de-DE.json',
        name: 'Deutsch'
      }
    ],
    langDir: 'locales',
    defaultLocale: 'en'
  },
  pwa: {
    registerType: 'autoUpdate',
    // devOptions: {
    //   enabled: true
    // }
  }
})