module.exports = {
  mode: 'universal',

  /*
   * Headers of the page
   */
  head: {
    titleTemplate: '%s | Data Visualizer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Play:400,700'
      }
    ]
  },

  /*
   * Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   * Global CSS
   */
  css: [],

  /*
   * Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/perfect-scrollbar' },
    { src: '~/plugins/clipboard' },
    { src: '~/plugins/axios' }
  ],

  /*
   * Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  /*
   * Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/moment'
  ],

  /*
   * Axios module configuration
   * See https://axios.nuxtjs.org/options
   */
  axios: {},

  /*
   * vuetify module configuration
   * https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#ff7597',
          accent: '#ff0266',
          secondary: '#2a2a2a',
          info: '#26a69a',
          warning: '#ffc107',
          error: '#dd2c00',
          success: '#00e676'
        }
      }
    }
  },

  /*
   * Build configuration
   */
  build: {
    /*
     * You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
