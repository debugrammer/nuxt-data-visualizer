<template>
  <div id="page-dashboards-api">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex xs12 mb-3>
          <search-panel search-type="client-id" />
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-widget
            :loaded="linearStat1.loaded"
            title="Client Usage"
            content-class="pa-0"
          >
            <div slot="widget-content">
              <linear-statistic
                :numerator-value="linearStat1.statData.numeratorValue"
                :denominator-value="linearStat1.statData.denominatorValue"
                :numerator-criteria="linearStat1.statData.numeratorCriteria"
                :denominator-criteria="linearStat1.statData.denominatorCriteria"
                :color="linearStat1.statData.color"
                :percent="linearStat1.statData.percent"
              />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-widget
            :loaded="linearStat2.loaded"
            title="Client Creations"
            content-class="pa-0"
          >
            <div slot="widget-content">
              <linear-statistic
                :numerator-value="linearStat2.statData.numeratorValue"
                :denominator-value="linearStat2.statData.denominatorValue"
                :numerator-criteria="linearStat2.statData.numeratorCriteria"
                :denominator-criteria="linearStat2.statData.denominatorCriteria"
                :color="linearStat2.statData.color"
                :percent="linearStat2.statData.percent"
              />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-widget
            :loaded="linearStat3.loaded"
            title="API Usage"
            content-class="pa-0"
          >
            <div slot="widget-content">
              <linear-statistic
                :numerator-value="linearStat3.statData.numeratorValue"
                :denominator-value="linearStat3.statData.denominatorValue"
                :numerator-criteria="linearStat3.statData.numeratorCriteria"
                :denominator-criteria="linearStat3.statData.denominatorCriteria"
                :color="linearStat3.statData.color"
                :percent="linearStat3.statData.percent"
              />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-widget
            :loaded="linearStat4.loaded"
            title="Scope Usage"
            content-class="pa-0"
          >
            <div slot="widget-content">
              <linear-statistic
                :numerator-value="linearStat4.statData.numeratorValue"
                :denominator-value="linearStat4.statData.denominatorValue"
                :numerator-criteria="linearStat4.statData.numeratorCriteria"
                :denominator-criteria="linearStat4.statData.denominatorCriteria"
                :color="linearStat4.statData.color"
                :percent="linearStat4.statData.percent"
              />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg8 sm12 xs12>
          <v-widget :loaded="lineChart1.loaded" title="Process Times">
            <div slot="widget-content" class="text-center">
              <line-chart :chart-data="lineChart1.chartData" />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg4 sm12 xs12>
          <v-widget :loaded="pieChart1.loaded" title="API Endpoints">
            <div slot="widget-content" class="text-center">
              <pie-chart :chart-data="pieChart1.chartData" />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg12 sm12 xs12>
          <v-widget
            :loaded="barChart1.loaded"
            title="Process Time Distribution"
          >
            <div slot="widget-content" class="text-center">
              <bar-chart
                :chart-data="barChart1.chartData"
                :options="barChart1.options"
              />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <v-widget title="Authorization Code Requests" content-class="pa-0">
            <div slot="widget-content">
              <common-data-table
                :headers="table1.headers"
                :items="table1.tableData"
                :loaded="table1.loaded"
              />
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <v-widget title="Client Credentials Requests" content-class="pa-0">
            <div slot="widget-content">
              <common-data-table
                :headers="table2.headers"
                :items="table2.tableData"
                :loaded="table2.loaded"
              />
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import qs from 'qs'
import VWidget from '~/components/VWidget'
import SearchPanel from '~/components/widgets/expansion-panel/SearchPanel'
import LinearStatistic from '~/components/widgets/statistics/LinearStatistic'
import LineChart from '~/components/widgets/chart/line-chart'
import PieChart from '~/components/widgets/chart/pie-chart'
import BarChart from '~/components/widgets/chart/bar-chart'
import CommonDataTable from '~/components/widgets/table/CommonDataTable'

export default {
  head() {
    return {
      title: 'API - Dashboards'
    }
  },
  components: {
    VWidget,
    SearchPanel,
    LinearStatistic,
    LineChart,
    PieChart,
    BarChart,
    CommonDataTable
  },
  computed: {
    ...mapGetters({
      copyLink: 'copy-link/getAction',
      reload: 'auto-reload/shouldBeReloaded',
      searchAction: 'search/getAction',
      searchData: 'search/getClientIdSearchData',
      linearStat1: 'visualize/compare-client-usage/getLinearStat',
      linearStat2: 'visualize/compare-client-creation/getLinearStat',
      linearStat3: 'visualize/compare-api-usage/getLinearStat',
      linearStat4: 'visualize/compare-scope-usage/getLinearStat',
      lineChart1: 'visualize/process-times/getLineChart',
      pieChart1: 'visualize/api-endpoint-usage/getPieChart',
      barChart1: 'visualize/process-time-dist/getBarChart',
      table1: 'visualize/ac-usage/getTable',
      table2: 'visualize/cc-usage/getTable'
    })
  },
  watch: {
    copyLink(copyLink) {
      if (copyLink !== true) {
        return
      }

      const params = qs.stringify({
        client_id: this.searchData.clientId,
        from: this.searchData.from,
        to: this.searchData.to
      })
      const fullUrl = `${this.pageUrl}?${params}`

      this.$copyText(fullUrl).then(
        (e) => {
          this.$store.dispatch('snackbar/success', {
            text: 'Link copied to clipboard'
          })
        },
        (error) => {
          this.$store.dispatch('snackbar/error', {
            text: `Unable to copy: ${error.message}`
          })
        }
      )

      this.$store.commit('copy-link/setAction', false)
    },
    reload(reload) {
      if (reload !== true) {
        return
      }

      this.loadAllComponents()
      this.$store.commit('auto-reload/setReload', false)
    },
    searchAction(action) {
      if (action !== true) {
        return
      }

      this.submit()
      this.$store.commit('search/setAction', false)
    }
  },
  asyncData({ route }) {
    return {
      pageUrl: `${process.env.WEB_CLIENT_URL}${route.path}`,
      params: {
        clientId: route.query.client_id || '',
        from: route.query.from || '',
        to: route.query.to || ''
      }
    }
  },
  created() {
    this.setSearchPanelExpanded(false)
    this.initSearchData()
  },
  mounted() {
    this.loadAllComponents()
  },
  methods: {
    setSearchPanelExpanded(expanded) {
      this.$store.dispatch('search/expand', expanded)
    },
    initSearchData() {
      this.$store.dispatch('search/initClientIdSearchData', this.params)
    },
    loadAllComponents() {
      this.loadLinearStat1()
      this.loadLinearStat2()
      this.loadLinearStat3()
      this.loadLinearStat4()
      this.loadLineChart1()
      this.loadPieChart1()
      this.loadBarChart1()
      this.loadTable1()
      this.loadTable2()
    },
    async loadLinearStat1() {
      try {
        await this.$store.dispatch(
          'visualize/compare-client-usage/fetchLinearStat',
          {
            clientId: this.searchData.clientId
          }
        )
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load linear stat1 data: ${error.message}`
        })
      }
    },
    async loadLinearStat2() {
      try {
        await this.$store.dispatch(
          'visualize/compare-client-creation/fetchLinearStat',
          {
            clientId: this.searchData.clientId
          }
        )
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load linear stat2 data: ${error.message}`
        })
      }
    },
    async loadLinearStat3() {
      try {
        await this.$store.dispatch(
          'visualize/compare-api-usage/fetchLinearStat',
          {
            clientId: this.searchData.clientId
          }
        )
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load linear stat3 data: ${error.message}`
        })
      }
    },
    async loadLinearStat4() {
      try {
        await this.$store.dispatch(
          'visualize/compare-scope-usage/fetchLinearStat',
          {
            clientId: this.searchData.clientId
          }
        )
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load linear stat4 data: ${error.message}`
        })
      }
    },
    async loadLineChart1() {
      try {
        await this.$store.dispatch('visualize/process-times/fetchLineChart', {
          from: this.searchData.from,
          to: this.searchData.to,
          clientId: this.searchData.clientId
        })
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load line chart1 data: ${error.message}`
        })
      }
    },
    async loadPieChart1() {
      try {
        await this.$store.dispatch(
          'visualize/api-endpoint-usage/fetchPieChart',
          {
            size: 10,
            clientId: this.searchData.clientId
          }
        )
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load pie chart1 data: ${error.message}`
        })
      }

      console.log(this.pieChart1)
    },
    async loadBarChart1() {
      try {
        await this.$store.dispatch(
          'visualize/process-time-dist/fetchBarChart',
          {
            from: this.searchData.from,
            to: this.searchData.to,
            clientId: this.searchData.clientId,
            onClick: (e, item) => {
              this.barChartClickHandler(e, item)
            }
          }
        )
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load bar chart1 data: ${error.message}`
        })
      }
    },
    async loadTable1() {
      try {
        await this.$store.dispatch('visualize/ac-usage/fetchTable', {
          size: 10,
          clientId: this.searchData.clientId
        })
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load table1 data: ${error.message}`
        })
      }
    },
    async loadTable2() {
      try {
        await this.$store.dispatch('visualize/cc-usage/fetchTable', {
          size: 10,
          clientId: this.searchData.clientId
        })
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load table2 data: ${error.message}`
        })
      }
    },
    barChartClickHandler(e, item) {
      if (_.isEmpty(item)) {
        return
      }

      const label = this.barChart1.chartData.labels[item[0]._index]
      const data = this.barChart1.chartData.datasets[0].data[item[0]._index]

      console.log(label, data)
    },
    submit() {
      this.setSearchPanelExpanded(false)
      this.loadAllComponents()
    }
  }
}
</script>
