<template>
  <v-date-picker
    v-model="date"
    :min="minDate"
    :max="maxDate"
    full-width
    landscape
    @input="submit()"
  />
</template>

<script>
export default {
  name: 'DatePickerForm',
  data() {
    return {
      date: this.$moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD'),
      minDate: this.$moment()
        .subtract(14, 'days')
        .format('YYYY-MM-DD'),
      maxDate: this.$moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
    }
  },
  methods: {
    submit() {
      this.$store.commit('search/setDatePickerData', { date: this.date })
      this.$store.commit('search/setAction', true)
    }
  }
}
</script>
