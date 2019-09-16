<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      fab
      small
      dark
      fixed
      bottom
      right
      color="accent"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: 'AppFab',
  data() {
    return {
      fab: false
    }
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('scroll', this.onScroll)
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('scroll', this.onScroll)
    }
  },
  methods: {
    onScroll() {
      const top = window.pageYOffset || document.documentElement.offsetTop || 0

      this.fab = top > 300
    },
    toTop() {
      this.$router.push({ hash: '' })
      this.$vuetify.goTo(0)
    }
  }
}
</script>
