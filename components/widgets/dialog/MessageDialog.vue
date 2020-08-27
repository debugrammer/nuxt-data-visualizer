<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="subtitle-1">localhost</v-card-title>
      <v-divider />
      <v-sheet
        color="accent"
        elevation="12"
        max-width="calc(100% - 32px)"
        class="v-sheet--offset mx-auto my-3"
      >
        <v-sparkline
          :labels="sparkLine.labels"
          :value="sparkLine.value"
          color="white"
          line-width="2"
          padding="16"
        />
      </v-sheet>
      <v-card-text>
        <div class="title font-weight-light mb-2">Server Loads</div>
        <div class="subtitle-1 font-weight-light grey--text">
          Last 12 Hours Performance
        </div>
        <v-divider class="my-2" />
        <v-icon small>mdi-information-outline</v-icon>
        <span class="caption grey--text font-weight-light">
          CPU peak load:
          <span class="error--text font-weight-bold">237</span>
        </span>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MessageDialog',
  data() {
    return {
      sparkLine: {
        labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
        value: [200, 675, 410, 390, 310, 460, 250, 240]
      }
    }
  },
  computed: {
    dialog: {
      set(show) {
        this.$store.commit('dialog/setShow', show)
      },
      get() {
        return this.$store.state.dialog.show
      }
    }
  }
}
</script>
