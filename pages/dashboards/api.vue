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
            title="Client Usages"
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
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import qs from 'qs'
import VWidget from '~/components/VWidget'
import SearchPanel from '~/components/widgets/expansion-panel/SearchPanel'
import LinearStatistic from '~/components/widgets/statistics/LinearStatistic'

export default {
  head() {
    return {
      title: 'API - Dashboards'
    }
  },
  components: {
    VWidget,
    SearchPanel,
    LinearStatistic
  },
  computed: {
    ...mapGetters({
      copyLink: 'copy-link/getAction',
      reload: 'auto-reload/shouldBeReloaded',
      searchAction: 'search/getAction',
      searchData: 'search/getClientIdSearchData',
      linearStat1: 'visualize/compare-client-usages/getLinearStat',
      linearStat2: 'visualize/compare-client-creations/getLinearStat'
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
    },
    async loadLinearStat1() {
      try {
        await this.$store.dispatch(
          'visualize/compare-client-usages/fetchLinearStat',
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
          'visualize/compare-client-creations/fetchLinearStat',
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
    submit() {
      this.setSearchPanelExpanded(false)
      this.loadAllComponents()
    }
  }
}
</script>
