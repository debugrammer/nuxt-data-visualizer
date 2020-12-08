<template>
  <div id="page-home">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <transition name="fade">
          <v-flex v-if="show" sm12>
            <v-widget title="Welcome!">
              <div slot="widget-content" class="index-gradient">
                <v-container fill-height>
                  <v-layout row align-center justify-center>
                    <v-flex :class="imageFlexSize">
                      <v-img
                        src="/SO-Monitoring-Monitored.png"
                        alt="You are being monitored"
                        :transition="false"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-widget>
          </v-flex>
        </transition>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '~/components/VWidget'

export default {
  components: {
    VWidget
  },
  data() {
    return {
      show: false
    }
  },
  head() {
    return {
      title: 'Home'
    }
  },
  computed: {
    imageFlexSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'xs12'
        case 'sm':
          return 'xs10'
        case 'md':
          return 'xs8'
        case 'lg':
          return 'xs6'
      }

      return 'xs5'
    }
  },
  mounted() {
    this.show = true
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.index-gradient {
  background: linear-gradient(to top, #e0e0e0, transparent);
}
</style>
