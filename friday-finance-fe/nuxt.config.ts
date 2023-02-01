// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // The private keys which are only available server-side
    apiUrl: 'http://localhost:4000/graphql',
    // Keys within public are also exposed client-side
    public: {
      apiUrl: 'http://localhost:4000/graphql'
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  build: {
    transpile: ['@apollo/client', 'ts-invariant/process']
  },
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json'
      },
      {
        code: 'pt-BR',
        file: 'pt-BR.json'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en'
  }
})
