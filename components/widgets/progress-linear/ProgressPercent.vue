<template>
  <v-progress-linear :value="value" :color="color" height="25" rounded>
    <strong>{{ value + '%' }}</strong>
  </v-progress-linear>
</template>

<script>
export default {
  name: 'ProgressPercent',
  props: {
    value: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'grey'
    }
  }
}
</script>
