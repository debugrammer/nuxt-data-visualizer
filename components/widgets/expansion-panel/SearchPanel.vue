<template>
  <v-scroll-y-transition>
    <v-expansion-panels v-if="show" v-model="expanded" popout>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template #default="{ open }">
            <v-row align="center" no-gutters>
              <v-col :cols="titleCols" class="title font-weight-light">
                {{ title }}
              </v-col>
              <v-col
                v-if="searchConditions(open)"
                cols="9"
                class="text--secondary"
              >
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
                  <v-row v-else-if="searchType === 'date-picker'" no-gutters>
                    <v-col cols="12">
                      <span class="overline">Date</span><br />
                      {{ datePickerData.date }}
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
          <template #actions>
            <v-icon color="accent">mdi-tune</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <client-id-search-form v-if="searchType === 'client-id'" />
          <date-picker-form v-else-if="searchType === 'date-picker'" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-scroll-y-transition>
</template>

<script>
import { mapGetters } from 'vuex'
import ClientIdSearchForm from '~/components/widgets/form/ClientIdSearchForm'
import DatePickerForm from '~/components/widgets/form/DatePickerForm'

const SEARCH_TYPES = ['client-id', 'date-picker']

export default {
  name: 'SearchPanel',
  components: {
    ClientIdSearchForm,
    DatePickerForm
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
      clientIdSearchData: 'search/getClientIdSearchData',
      datePickerData: 'search/getDatePickerData'
    }),
    expanded: {
      set(expanded) {
        this.$store.commit('search/setExpanded', expanded)
      },
      get() {
        return this.$store.state.search.expanded
      }
    },
    titleCols() {
      return this.$vuetify.breakpoint.xsOnly ? 12 : 3
    }
  },
  mounted() {
    this.show = true
  },
  methods: {
    searchConditions(open) {
      return !open && this.$vuetify.breakpoint.smAndUp
    }
  }
}
</script>
