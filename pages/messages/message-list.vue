<template>
  <div id="page-messages-message-list">
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
import SearchPanel from '~/components/widgets/expansion-panel/SearchPanel'

export default {
  head() {
    return {
      title: 'Message List - Messages'
    }
  },
  components: {
    SearchPanel
  },
  data() {
    return {
      showResults: false
    }
  },
  computed: {
    ...mapGetters({
      searchAction: 'search/getAction',
      searchData: 'search/getClientIdSearchData'
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
    submit() {
      this.setSearchPanelExpanded(false)
      this.showResults = true
    }
  }
}
</script>
