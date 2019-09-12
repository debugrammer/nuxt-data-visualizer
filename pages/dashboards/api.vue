<template>
  <div id="page-dashboards-api">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex xs12 mb-3>
          <search-panel search-type="client-id" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import qs from 'qs'
import SearchPanel from '~/components/widgets/expansion-panel/SearchPanel'

export default {
  head() {
    return {
      title: 'API - Dashboards'
    }
  },
  components: {
    SearchPanel
  },
  computed: {
    ...mapGetters({
      pageShare: 'page-share/getAction',
      reload: 'auto-reload/shouldBeReloaded',
      searchAction: 'search/getAction',
      searchData: 'search/getClientIdSearchData'
    })
  },
  watch: {
    pageShare(pageShare) {
      if (pageShare !== true) {
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

      this.$store.commit('page-share/setAction', false)
    },
    reload(reload) {
      if (reload !== true) {
        return
      }

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
    const webClientUrl = 'http://localhost:3000'

    return {
      pageUrl: `${webClientUrl}${route.path}`,
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
  methods: {
    setSearchPanelExpanded(expanded) {
      this.$store.dispatch('search/expand', expanded)
    },
    initSearchData() {
      this.$store.dispatch('search/initClientIdSearchData', this.params)
    },
    submit() {
      this.setSearchPanelExpanded(false)
    }
  }
}
</script>
