export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'weather-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-status-bar', content: '#9449fe' },
      { name: 'yes', content: 'mobile-web-app-capable' },
      { name: 'apple-mobile-web-app-title', content: 'Weather App' },
      { name: 'theme-color', content: '#9449fe' },

      { property: 'og:title', content: "Weather application" },
      { property: 'og:description', content: 'Weather application designed by Kevin Muchwat' },
      // { property: 'og:image', content: 'http://euro-travel-example.com/thumbnail.jpg' },
      { property: 'og:url', content: '/' },
      // { name:'twitter:card', content: 'summary_large_image'},
      // { name:'twitter:image:alt', content: 'Alt text for image'},
      { name: 'og:site_name', content: 'Weather App' },

      // <!--  Non-Essential, But Required for Analytics -->
      // { property: 'fb:app_id', content='your_app_id'},
      // { name:'twitter:site', content:'@website-username'},

      { name: 'keywords', content: 'Weather app test' },
      { hid: 'description', name: 'description', content: 'Weather application test designed by Kevin Muchwat Ochieng' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "@/plugins/echarts.js", ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  pwa: {
    icon: {},
    meta: {
      theme_color: '#9449fe'
    },
    manifest: {
      name: 'Weather App',
      short_name: 'Weather App',
      lang: 'en',
      useWebmanifestExtension: false,
      start_url: '/',
      background_color: '#9449fe',
      theme_color: '#9449fe'
    }
  },

  generate: {
    fallback: true
  },

  styleResources: {
    scss: [
      '~/assets/scss/global.scss',
    ]
  }
}
