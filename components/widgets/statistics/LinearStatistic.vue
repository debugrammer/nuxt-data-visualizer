<template>
  <v-card-text class="pt-2">
    <v-card-actions class="pb-0">
      <div class="headline text--primary font-weight-light">
        {{ numeratorValue }}
      </div>
      <div class="headline text--primary font-weight-light px-1">
        /
      </div>
      <div class="headline text--primary">
        {{ denominatorValue }}
      </div>
    </v-card-actions>
    <v-card-actions class="pt-0">
      <span class="caption pl-1">
        {{ numeratorCriteria }}
      </span>
      <span class="caption px-1">
        /
      </span>
      <span class="caption">
        {{ denominatorCriteria }}
      </span>
    </v-card-actions>
    <v-progress-linear :value="percent" height="5" :color="color" />
    <span class="caption text--primary">{{ caption }}</span>
  </v-card-text>
</template>

<script>
export default {
  name: 'LinearStatistic',
  props: {
    numeratorValue: {
      type: Number,
      default: 0
    },
    denominatorValue: {
      type: Number,
      default: 0
    },
    numeratorCriteria: {
      type: String,
      default: ''
    },
    denominatorCriteria: {
      type: String,
      default: ''
    },
    percent: {
      type: String,
      default: '0'
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    caption() {
      return this.percent + '%'
    }
  }
}
</script>
