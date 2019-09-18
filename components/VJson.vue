<template>
  <div id="v-json">
    <vue-json-pretty v-if="jsonObject !== null" :data="jsonObject" />
    <slot v-else name="error-content" />
  </div>
</template>

<script>
export default {
  name: 'VJson',
  components: {
    VueJsonPretty: () => import('vue-json-pretty')
  },
  props: {
    data: {
      validator: (prop) =>
        typeof prop === 'object' || typeof prop === 'string' || prop === null,
      required: true
    }
  },
  computed: {
    jsonObject() {
      if (this.data === null) {
        return null
      }

      if (this.data.constructor === Object) {
        return this.data
      }

      if (this.data.constructor === String) {
        let parsed = {}

        try {
          parsed = JSON.parse(this.data)
        } catch (error) {
          return null
        }

        return parsed
      }

      return {}
    }
  }
}
</script>
