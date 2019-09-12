<template>
  <v-scroll-y-transition>
    <v-expansion-panels v-if="show" v-model="expanded" popout>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template v-slot="{ open }">
            <v-row align="center" no-gutters>
              <v-col cols="3" class="title font-weight-light">
                {{ title }}
              </v-col>
              <v-col v-if="!open" cols="9" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <v-row v-if="searchType === 'client-id'" no-gutters>
                    <v-col cols="4">
                      <span class="overline">Client ID</span><br />
                      {{ clientIdSearchData.clientId }}
                    </v-col>
                    <v-col cols="4">
                      <span class="overline">From</span><br />
                      {{ clientIdSearchData.from }}
                    </v-col>
                    <v-col cols="4">
                      <span class="overline">To</span><br />
                      {{ clientIdSearchData.to }}
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
          <template v-slot:actions>
            <v-icon color="accent">
              mdi-tune
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <client-id-search-form v-if="searchType === 'client-id'" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-scroll-y-transition>
</template>

<script>
import { mapGetters } from 'vuex'
import ClientIdSearchForm from '~/components/widgets/form/ClientIdSearchForm'

const SEARCH_TYPES = ['client-id']

export default {
  name: 'SearchPanel',
  components: {
    ClientIdSearchForm
  },
  props: {
    title: {
      type: String,
      default: 'Search Panel'
    },
    searchType: {
      type: String,
      required: true,
      validator(value) {
        return SEARCH_TYPES.includes(value) === true
      }
    },
    contentClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      clientIdSearchData: 'search/getClientIdSearchData'
    }),
    expanded: {
      set(expanded) {
        this.$store.commit('search/setExpanded', expanded)
      },
      get() {
        return this.$store.state.search.expanded
      }
    }
  },
  mounted() {
    this.show = true
  }
}
</script>
