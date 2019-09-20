const appEnv = require(`./app.env.${process.env.NODE_ENV}`)

module.exports = {
  mode: 'universal',

  /*
   * Server property
   */
  server: {
    port: appEnv.server.port,
    host: appEnv.server.host
  },

  /*
   * Application global constants
   */
  env: {
    WEB_CLIENT_URL: appEnv.webClientUrl,
    API_CLIENT_URL: appEnv.apiClientUrl,
    API_SERVER_URL: appEnv.apiServerUrl,
    COLOR_SET: {
      MATERIAL: [
        'rgba(244, 67, 54, 1.0)',
        'rgba(233, 30, 99, 1.0)',
        'rgba(156, 39, 176, 1.0)',
        'rgba(103, 58, 183, 1.0)',
        'rgba(63, 81, 181, 1.0)',
        'rgba(33, 150, 243, 1.0)',
        'rgba(3, 169, 244, 1.0)',
        'rgba(0, 188, 212, 1.0)',
        'rgba(0, 150, 136, 1.0)',
        'rgba(76, 175, 80, 1.0)',
        'rgba(139, 195, 74, 1.0)',
        'rgba(205, 220, 57, 1.0)',
        'rgba(255, 235, 59, 1.0)',
        'rgba(255, 193, 7, 1.0)',
        'rgba(255, 152, 0, 1.0)',
        'rgba(255, 87, 34, 1.0)',
        'rgba(121, 85, 72, 1.0)',
        'rgba(158, 158, 158, 1.0)',
        'rgba(96, 125, 139, 1.0)'
      ],
      MATERIAL_ALPHA: [
        'rgba(244, 67, 54, 0.3)',
        'rgba(233, 30, 99, 0.3)',
        'rgba(156, 39, 176, 0.3)',
        'rgba(103, 58, 183, 0.3)',
        'rgba(63, 81, 181, 0.3)',
        'rgba(33, 150, 243, 0.3)',
        'rgba(3, 169, 244, 0.3)',
        'rgba(0, 188, 212, 0.3)',
        'rgba(0, 150, 136, 0.3)',
        'rgba(76, 175, 80, 0.3)',
        'rgba(139, 195, 74, 0.3)',
        'rgba(205, 220, 57, 0.3)',
        'rgba(255, 235, 59, 0.3)',
        'rgba(255, 193, 7, 0.3)',
        'rgba(255, 152, 0, 0.3)',
        'rgba(255, 87, 34, 0.3)',
        'rgba(121, 85, 72, 0.3)',
        'rgba(158, 158, 158, 0.3)',
        'rgba(96, 125, 139, 0.3)'
      ],
      BLUE_YELLOW_RED_ALPHA: [
        'rgba(3, 169, 244, 0.9)',
        'rgba(255, 193, 7, 0.9)',
        'rgba(244, 67, 54, 0.9)'
      ],
      RAINBOW: [
        '#368ce1',
        '#2c9cdf',
        '#23abd8',
        '#1dbace',
        '#1ac7c2',
        '#1ad4b3',
        '#1ddfa3',
        '#25e892',
        '#30ef82',
        '#40f373',
        '#52f667',
        '#67f75e',
        '#7ff658',
        '#97f357',
        '#aff05b',
        '#bae449',
        '#c6d63c',
        '#d4c733',
        '#e2b72f',
        '#efa72f',
        '#fb9633',
        '#ff873b',
        '#ff7847',
        '#ff6a54',
        '#ff5e63',
        '#ff5473',
        '#fe4b83',
        '#f24591'
      ],
      LIGHT_BLUE_GREEN: [
        '#48aacc',
        '#4dafcd',
        '#53b3cd',
        '#59b7cd',
        '#5fbbcc',
        '#65bfcb',
        '#6bc3c9',
        '#71c6c7',
        '#77c9c5',
        '#7eccc3',
        '#84cfc1',
        '#8ad1bf',
        '#90d4bd',
        '#97d6bc',
        '#9dd9bb',
        '#a2dbba',
        '#a8ddba',
        '#aedfbb',
        '#b3e1bc',
        '#b8e3bd'
      ]
    }
  },

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
    '@nuxtjs/moment',
    '@nuxtjs/google-analytics'
  ],

  /*
   * Axios module configuration
   * See https://axios.nuxtjs.org/options
   */
  axios: {},

  /*
   * Google Analytics module configuration
   * https://github.com/nuxt-community/analytics-module
   */
  googleAnalytics: {
    id: appEnv.googleAnalytics.id
  },

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

  serverMiddleware: ['~/api/samples'],

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
