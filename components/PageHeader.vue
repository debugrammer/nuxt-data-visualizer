<template>
  <v-layout row align-center px-6 pt-6 mx-0>
    <div>
      <h2 class="headline font-weight-light">
        {{ title }}
      </h2>
    </div>
    <client-only>
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-icon v-if="item.icon" :color="item.iconColor" small>
            {{ item.icon }}
          </v-icon>
          <a v-else :href="item.href" :class="[item.disabled && 'disabled']">
            {{ item.text }}
          </a>
        </template>
      </v-breadcrumbs>
    </client-only>
    <v-spacer />
    <template v-if="copyLinkEnabled">
      <div class="px-1">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" outlined v-on="on" @click="copyLink()">
              <v-icon>mdi-link-variant</v-icon>
            </v-btn>
          </template>
          <span>Copy URL</span>
        </v-tooltip>
      </div>
    </template>
    <template v-if="autoReloadEnabled">
      <div class="px-1">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" outlined v-on="on" @click="setAutoReload">
              <v-icon color="primary" :class="reloadIconClass">
                mdi-refresh
              </v-icon>
            </v-btn>
          </template>
          <template v-if="autoReload">
            <v-progress-linear
              color="white"
              :value="secondsPercent"
              height="3"
              class="mt-1 mb-0"
            />
            {{ secondsLeft }} seconds
          </template>
          <span v-else>Auto-refresh</span>
        </v-tooltip>
      </div>
    </template>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageHeader',
  data() {
    return {
      title: 'Home',
      autoReload: false,
      reloadIconClass: 'text--secondary',
      autoReloadEnabled: false,
      copyLinkEnabled: false,
      intervalTimer: null,
      secondsLeft: 0
    }
  },
  computed: {
    ...mapGetters({
      delaySeconds: 'auto-reload/getDelaySeconds',
      menu: 'menu/getMenu'
    }),
    secondsPercent() {
      return 100 - (this.secondsLeft / this.delaySeconds) * 100
    },
    breadcrumbs() {
      const breadcrumbs = []

      breadcrumbs.push({ icon: 'mdi-home' })

      let header = ''
      const size = this.menu.length
      for (let i = 0; i < size; i++) {
        const item = this.menu[i]

        if (item.header) {
          header = item.header
          continue
        }

        if (item.name === this.$route.name) {
          this.setTitle(item.title)
          this.setAutoReloadEnabled(item.autoReloadEnabled)
          this.setCopyLinkEnabled(item.copyLinkEnabled)
          breadcrumbs.push({ text: header, disabled: true })
          breadcrumbs.push({ text: item.title, disabled: true })
          break
        }

        if (item.items) {
          const child = item.items.find((i) => {
            return i.component === this.$route.name
          })

          if (!child) {
            continue
          }

          this.setTitle(child.title)
          this.setAutoReloadEnabled(child.autoReloadEnabled)
          this.setCopyLinkEnabled(child.copyLinkEnabled)
          breadcrumbs.push({ text: header, disabled: true })
          breadcrumbs.push({ text: item.title })
          breadcrumbs.push({ text: child.title, disabled: true })
          break
        }
      }

      if (this.$vuetify.breakpoint.smAndDown) {
        return [
          breadcrumbs[0],
          { icon: 'mdi-dots-horizontal-circle', iconColor: 'primary' }
        ]
      }

      return breadcrumbs
    }
  },
  methods: {
    setTitle(title) {
      this.title = title
    },
    setAutoReloadEnabled(autoReloadEnabled) {
      this.autoReloadEnabled = autoReloadEnabled
    },
    setCopyLinkEnabled(copyLinkEnabled) {
      this.copyLinkEnabled = copyLinkEnabled
    },
    setAutoReload() {
      this.autoReload = !this.autoReload

      if (this.autoReload === true) {
        this.reloadIconClass = 'rotate-loader'
        this.setTimer()
        return
      }

      this.reloadIconClass = 'text--secondary'
      this.$store.commit('auto-reload/setReload', false)
    },
    setTimer() {
      this.secondsLeft = this.delaySeconds
      clearInterval(this.intervalTimer)
      this.timer()
    },
    timer() {
      const now = Date.now()
      const end = now + this.delaySeconds * 1000
      this.countdown(end)
    },
    countdown(end) {
      this.intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000)

        if (secondsLeft <= 0) {
          if (this.autoReload === true) {
            this.$store.commit('auto-reload/setReload', true)
            this.setTimer()
            return
          }

          clearInterval(this.intervalTimer)
        }

        this.secondsLeft = secondsLeft
      }, 1000)
    },
    copyLink() {
      this.$store.commit('copy-link/setAction', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  color: grey;
  pointer-events: none;
}
.rotate-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
