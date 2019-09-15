<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-actions class="pa-0">
                <v-dialog v-model="dialog" width="1100px">
                  <template v-slot:activator="{ on }">
                    <v-btn text class="primary--text" v-on="on">
                      <v-icon class="pr-1">mdi-application</v-icon>
                      Supported Browsers
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">
                      Supported Browsers
                    </v-card-title>
                    <v-divider />
                    <v-card-text>
                      <v-list>
                        <v-layout row wrap>
                          <v-flex
                            v-for="(item, i) in supportedBrowsers"
                            :key="i"
                            xs12
                            sm6
                            md4
                            class="px-0"
                          >
                            <v-list-item>
                              <v-list-item-avatar
                                :color="item.support ? 'green' : 'red'"
                              >
                                <v-icon dark>{{ item.icon }}</v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.browser }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  {{
                                    item.support ? 'Supported' : 'Not Supported'
                                  }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-flex>
                        </v-layout>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-card-actions>
              <v-card-text class="px-0">
                <v-layout row align-center justify-center>
                  <v-flex xs5>
                    <v-img src="/logo.png" alt="Joonsang.com" />
                  </v-flex>
                </v-layout>
                <div class="layout column align-center">
                  <span class="flex mb-4 text-center primary--text login-title">
                    Data Visualizer
                  </span>
                </div>
                <v-form class="px-3">
                  <v-text-field
                    v-model="account.username"
                    append-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                    autofocus
                  />
                  <v-text-field
                    id="password"
                    v-model="account.password"
                    append-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    @keyup.enter="login"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn :loading="loading" block color="primary" @click="login">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbarTimeout"
      :color="snackbar.color"
      bottom
      right
    >
      {{ snackbar.text }}
      <v-btn dark text icon @click.native="$store.dispatch('snackbar/hide')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Login'
    }
  },
  data() {
    return {
      loading: false,
      account: {
        username: '',
        password: ''
      },
      dialog: false,
      supportedBrowsers: [
        {
          icon: 'mdi-google-chrome',
          browser: 'Chromium (Chrome, Edge Insider)',
          support: true
        },
        {
          icon: 'mdi-firefox',
          browser: 'Firefox',
          support: true
        },
        {
          icon: 'mdi-edge',
          browser: 'Edge',
          support: true
        },
        {
          icon: 'mdi-apple-safari',
          browser: 'Safari 10+',
          support: true
        },
        {
          icon: 'mdi-apple-safari',
          browser: 'Safari 9',
          support: false
        },
        {
          icon: 'mdi-internet-explorer',
          browser: 'IE9 / IE10 / IE11',
          support: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      snackbarTimeout: 'snackbar/getTimeout',
      snackbar: 'snackbar/getSnackbar'
    })
  },
  mounted() {
    if (this.$store.state.loggedOut === true) {
      this.$store.dispatch('snackbar/success', { text: 'Logout Success' })
      this.$store.commit('setLoggedOut', false)
    }
  },
  methods: {
    login() {
      this.loading = true

      setTimeout(() => {
        this.$store.commit('setLoggedIn', true)
        this.$router.push('/')
        this.loading = false
      }, 1000)
    }
  },
  layout: 'empty'
}
</script>

<style lang="scss" scoped>
.login-title {
  font-size: 3rem;
  font-weight: 400;
  line-height: 3.125rem;
  letter-spacing: normal;
  font-family: 'Play', 'Roboto', sans-serif;
}
</style>
