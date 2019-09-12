<template>
  <div id="v-widget">
    <v-card>
      <v-app-bar v-if="enableHeader" color="transparent" text dense flat>
        <v-toolbar-title>
          <h4>{{ title }}</h4>
        </v-toolbar-title>
        <v-spacer />
        <slot name="widget-header-action" />
      </v-app-bar>
      <v-divider v-if="enableHeader" />
      <v-combobox
        v-if="enableChip"
        v-model="chips"
        placeholder="전체"
        prepend-inner-icon=""
        append-icon=""
        chips
        tags
        text
        solo
        flat
        multiple
        readonly
        hide-details
      >
        <template v-slot:selection="data">
          <v-chip outlined color="primary">
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
      <v-divider v-if="enableChip" />
      <v-progress-linear
        v-if="!loaded"
        height="2"
        color="accent"
        indeterminate
        class="my-0"
      />
      <v-card-text :class="contentClass">
        <slot name="widget-content" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'VWidget',
  props: {
    title: {
      type: String,
      default: ''
    },
    enableHeader: {
      type: Boolean,
      default: true
    },
    enableChip: {
      type: Boolean,
      default: false
    },
    chips: {
      type: Array,
      default: () => []
    },
    contentClass: {
      type: String,
      default: ''
    },
    loaded: {
      type: Boolean,
      default: true
    }
  }
}
</script>
