<template>
  <v-data-table
    :header-props="headerProps"
    :headers="headers"
    :items="items"
    :loading="!loaded"
    :disable-pagination="true"
    :mobile-breakpoint="0"
    hide-default-footer
    class="elevation-0"
  >
    <template v-slot:progress>
      <v-progress-linear height="2" color="accent" indeterminate />
    </template>
    <template v-slot:item.percent="{ item }">
      <progress-percent :value="item.percent" :color="item.color" />
    </template>
  </v-data-table>
</template>

<script>
import ProgressPercent from '~/components/widgets/progress-linear/ProgressPercent'

export default {
  name: 'CommonDataTable',
  components: {
    ProgressPercent
  },
  props: {
    headerProps: {
      type: Object,
      default: () => {}
    },
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    loaded: {
      type: Boolean,
      default: true
    }
  }
}
</script>
