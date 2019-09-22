<template>
  <div id="page-indicators-client-process-times">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex xs12 mb-3>
          <search-panel
            title="Select Date"
            search-type="date-picker"
            content-class="pa-0"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchPanel from '~/components/widgets/expansion-panel/SearchPanel'

export default {
  head() {
    return {
      title: `Top Clients' Process Times - Indicators`
    }
  },
  components: {
    SearchPanel
  },
  data() {
    return {
      showResults: false,
      size: 10
    }
  },
  computed: {
    ...mapGetters({
      searchAction: 'search/getAction',
      searchData: 'search/getDatePickerData'
    })
  },
  watch: {
    searchAction(action) {
      if (action !== true) {
        return
      }

      this.submit()
      this.$store.commit('search/setAction', false)
    }
  },
  created() {
    this.setSearchPanelExpanded(true)
  },
  methods: {
    setSearchPanelExpanded(expanded) {
      this.$store.dispatch('search/expand', expanded)
    },
    submit() {
      this.setSearchPanelExpanded(false)
      this.showResults = true
    }
  }
}
</script>
