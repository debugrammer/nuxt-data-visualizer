<template>
  <div id="page-analytics-scope">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex xs12 mb-3>
          <search-panel search-type="client-id" />
        </v-flex>
        <v-flex v-if="showResults" lg6 sm12 xs12>
          <v-widget
            :enable-chip="true"
            :chips="chips([searchData.clientId])"
            title="Scope Usage"
            content-class="pa-0"
          >
            <div slot="widget-content">
              <v-data-table
                :headers="table1.headers"
                :items="table1.tableData"
                :loading="!table1.loaded"
                :disable-pagination="true"
                :mobile-breakpoint="0"
                hide-default-footer
                class="elevation-0"
              >
                <template v-slot:progress>
                  <v-progress-linear height="2" color="accent" indeterminate />
                </template>
                <template v-slot:item="{ item }">
                  <tr @click="submitScope(item.scope)">
                    <td>{{ item.scope }}</td>
                    <td class="text-left">
                      <progress-percent
                        :value="item.percent"
                        :color="item.color"
                      />
                    </td>
                    <td class="text-right">
                      {{ item.count }}
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </div>
          </v-widget>
        </v-flex>
        <v-flex v-if="showResults" lg6 sm12 xs12>
          <v-widget
            :enable-chip="true"
            :chips="chips([searchData.clientId, scope])"
            title="API Usage"
            content-class="pa-0"
          >
            <div slot="widget-content">
              <v-data-table
                :headers="table2.headers"
                :items="table2.tableData"
                :loading="!table2.loaded"
                :disable-pagination="true"
                :mobile-breakpoint="0"
                hide-default-footer
                class="elevation-0"
              >
                <template v-slot:progress>
                  <v-progress-linear height="2" color="accent" indeterminate />
                </template>
                <template v-slot:item="{ item }">
                  <tr @click="submitApiEndpoint(item.apiEndpoint)">
                    <td>{{ item.apiEndpoint }}</td>
                    <td>{{ item.scope }}</td>
                    <td class="text-left">
                      <progress-percent
                        :value="item.percent"
                        :color="item.color"
                      />
                    </td>
                    <td class="text-right">
                      {{ item.count }}
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </div>
          </v-widget>
        </v-flex>
        <v-flex v-if="showResults" lg12 sm12 xs12>
          <v-widget
            :enable-chip="true"
            :chips="chips([searchData.clientId, scope, apiEndpoint])"
            :loaded="lineChart1.loaded"
            title="API Process Times"
          >
            <div slot="widget-content" class="text-center">
              <line-chart :chart-data="lineChart1.chartData" />
            </div>
          </v-widget>
        </v-flex>
        <v-flex v-if="showResults" lg12 sm12 xs12>
          <v-widget
            :enable-chip="true"
            :chips="chips([searchData.clientId, scope, apiEndpoint])"
            title="Client Usage"
            content-class="pa-0"
          >
            <div slot="widget-content">
              <common-data-table
                :headers="table3.headers"
                :items="table3.tableData"
                :loaded="table3.loaded"
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
import visualizerUtils from '~/util/visualizer-utils'
import VWidget from '~/components/VWidget'
import SearchPanel from '~/components/widgets/expansion-panel/SearchPanel'
import ProgressPercent from '~/components/widgets/progress-linear/ProgressPercent'
import LineChart from '~/components/widgets/chart/line-chart'
import CommonDataTable from '~/components/widgets/table/CommonDataTable'

export default {
  components: {
    VWidget,
    SearchPanel,
    ProgressPercent,
    LineChart,
    CommonDataTable
  },
  data() {
    return {
      showResults: false,
      scope: '',
      apiEndpoint: ''
    }
  },
  computed: {
    ...mapGetters({
      searchAction: 'search/getAction',
      searchData: 'search/getClientIdSearchData',
      table1: 'visualize/scope-usage/getTable',
      table2: 'visualize/api-scope-usage/getTable',
      table3: 'visualize/client-usage/getTable',
      lineChart1: 'visualize/process-times/getLineChart'
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
    this.initSearchData()
  },
  methods: {
    setSearchPanelExpanded(expanded) {
      this.$store.dispatch('search/expand', expanded)
    },
    initSearchData() {
      this.$store.dispatch('search/initClientIdSearchData', {})
    },
    chips(array) {
      return visualizerUtils.getFilterTags(array)
    },
    async loadTable1() {
      try {
        await this.$store.dispatch('visualize/scope-usage/fetchTable', {
          size: 10,
          from: this.searchData.from,
          to: this.searchData.to,
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
        await this.$store.dispatch('visualize/api-scope-usage/fetchTable', {
          size: 10,
          from: this.searchData.from,
          to: this.searchData.to,
          clientId: this.searchData.clientId,
          scopes: [this.scope]
        })
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load table2 data: ${error.message}`
        })
      }
    },
    async loadTable3() {
      try {
        await this.$store.dispatch('visualize/client-usage/fetchTable', {
          size: 10,
          from: this.searchData.from,
          to: this.searchData.to,
          clientId: this.searchData.clientId,
          requestPath: this.apiEndpoint,
          scopes: [this.scope]
        })
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load table3 data: ${error.message}`
        })
      }
    },
    async loadLineChart1() {
      try {
        await this.$store.dispatch('visualize/process-times/fetchLineChart', {
          from: this.searchData.from,
          to: this.searchData.to,
          clientId: this.searchData.clientId,
          requestPath: this.apiEndpoint,
          scopes: [this.scope]
        })
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load line chart1 data: ${error.message}`
        })
      }
    },
    submit() {
      this.setSearchPanelExpanded(false)
      this.showResults = true
      this.scope = ''
      this.apiEndpoint = ''
      this.loadTable1()
      this.loadTable2()
      this.loadTable3()
      this.loadLineChart1()
    },
    submitScope(scope) {
      this.scope = scope
      this.apiEndpoint = ''
      this.loadTable2()
      this.loadTable3()
      this.loadLineChart1()
    },
    submitApiEndpoint(apiEndpoint) {
      this.apiEndpoint = apiEndpoint
      this.loadTable3()
      this.loadLineChart1()
    }
  },
  head() {
    return {
      title: 'Scopes - Analytics'
    }
  }
}
</script>
