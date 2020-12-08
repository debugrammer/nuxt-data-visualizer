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
        <template v-for="(charts, key) in chartList">
          <v-flex v-if="showResults" :key="charts.id" lg6 sm12 xs12>
            <v-widget
              :enable-header="false"
              :enable-chip="true"
              :chips="[topClients[key]]"
              :loaded="charts.processTimes.loaded"
            >
              <div slot="widget-content" class="text-center">
                <bar-chart
                  :chart-data="charts.processTimes.chartData"
                  :options="charts.processTimes.options"
                />
              </div>
            </v-widget>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VWidget from '~/components/VWidget'
import SearchPanel from '~/components/widgets/expansion-panel/SearchPanel'
import BarChart from '~/components/widgets/chart/bar-chart'

export default {
  components: {
    VWidget,
    SearchPanel,
    BarChart
  },
  data() {
    return {
      showResults: false,
      size: 6
    }
  },
  head() {
    return {
      title: `Top Clients' Process Times - Indicators`
    }
  },
  computed: {
    ...mapGetters({
      searchAction: 'search/getAction',
      searchData: 'search/getDatePickerData',
      topClients: 'visualize/top-clients-process-time/getTopClients',
      chartList: 'visualize/top-clients-process-time/getCharts'
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
    async loadComponents() {
      try {
        await this.$store.dispatch(
          'visualize/top-clients-process-time/fetchCharts',
          {
            size: this.size,
            date: this.searchData.date
          }
        )
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load chart data: ${error.message}`
        })
      }
    },
    submit() {
      this.setSearchPanelExpanded(false)
      this.showResults = true
      this.loadComponents()
    }
  }
}
</script>
