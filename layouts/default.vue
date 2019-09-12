<template>
  <v-app id="inspire">
    <app-drawer />
    <app-toolbar />
    <v-content>
      <!-- Page Header -->
      <page-header />
      <!-- Page Content -->
      <div class="page-wrapper">
        <nuxt />
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="pa-4 justify-center">
        <span>
          &copy;{{ $moment().format('YYYY') }} —
          <strong>Joonsang.com</strong>
        </span>
      </v-footer>
    </v-content>
    <!-- Go to top -->
    <app-fab />
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbarTimeout"
      :color="snackbar.color"
      bottom
      right
    >
      {{ snackbar.text }}
      <v-btn dark text icon @click.native="$store.dispatch('snackbar/hide')">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import AppDrawer from '~/components/AppDrawer'
import AppToolbar from '~/components/AppToolbar'
import PageHeader from '~/components/PageHeader'
import AppFab from '~/components/AppFab'

export default {
  components: {
    AppDrawer,
    AppToolbar,
    PageHeader,
    AppFab
  },
  computed: {
    ...mapGetters({
      snackbarTimeout: 'snackbar/getTimeout',
      snackbar: 'snackbar/getSnackbar'
    })
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('keydown', this.onGlobalKeydown)
    }

    if (this.$store.state.loggedIn === true) {
      this.$store.dispatch('snackbar/success', { text: 'Login Success' })
      this.$store.commit('setLoggedIn', false)
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('keydown', this.onGlobalKeydown)
    }
  },
  methods: {
    onGlobalKeydown(event) {
      if (event.target.tagName === 'INPUT') {
        return
      }

      switch (event.key) {
        case '[':
          this.$store.dispatch('drawer/toggle')
          break
        case '/':
          this.$store.dispatch('report/search/toggle')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}
.page-wrapper {
  min-height: calc(100vh - 64px - 51px - 81px);
}
</style>
