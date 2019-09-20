<template>
  <v-app-bar color="secondary" app fixed>
    <v-toolbar-title class="ml-0 pl-0">
      <v-app-bar-nav-icon @click.stop="handleDrawerToggle">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      href="https://github.com/debugrammer/nuxt-data-visualization-template"
      target="_blank"
      icon
    >
      <v-icon>mdi-github-circle</v-icon>
    </v-btn>
    <v-btn icon @click="handleFullScreen()">
      <v-icon>mdi-fullscreen</v-icon>
    </v-btn>
    <v-menu
      offset-y
      origin="center center"
      :nudge-bottom="14"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon text v-on="on">
          <v-badge color="red" overlap>
            <template v-slot:badge>
              <span v-if="badge > 0">{{ badge }}</span>
            </template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <notification-list />
    </v-menu>
    <v-menu
      offset-y
      origin="center center"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn class="mr-0" icon text v-on="on">
          <v-avatar size="30px" :color="avatarColor">
            {{ userInitial }}
          </v-avatar>
        </v-btn>
      </template>
      <v-list class="pa-0">
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import NotificationList from '~/components/widgets/list/NotificationList'

export default {
  name: 'AppToolbar',
  components: {
    NotificationList
  },
  computed: {
    ...mapGetters({
      badge: 'notification/getUnreadCount'
    }),
    avatarColor() {
      return 'cyan'
    },
    userInitial() {
      return 'DV'
    }
  },
  methods: {
    logout() {
      this.$store.commit('setLoggedOut', true)
      this.$router.push('/login')
    },
    handleDrawerToggle() {
      this.$store.dispatch('drawer/toggle')
    },
    handleFullScreen() {
      const doc = window.document
      const docEl = doc.documentElement

      const requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen

      const cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen

      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen.call(docEl)
        return
      }

      cancelFullScreen.call(doc)
    }
  }
}
</script>
