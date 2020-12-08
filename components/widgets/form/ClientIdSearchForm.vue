<template>
  <v-form>
    <div class="d-flex">
      <v-layout row wrap>
        <v-flex class="xs12">
          <v-text-field
            ref="client-id-input"
            v-model="clientId"
            prepend-inner-icon="mdi-magnify"
            label="Search By Client ID"
            type="text"
            solo
            single-line
            @keyup.enter="submit"
          />
        </v-flex>
      </v-layout>
    </div>
    <div class="d-flex">
      <v-tabs v-model="tab" grow>
        <v-tab>
          <v-icon class="pr-1">mdi-gesture</v-icon>
          Relative
        </v-tab>
        <v-tab>
          <v-icon class="pr-1">mdi-crosshairs-gps</v-icon>
          Absolute
        </v-tab>
      </v-tabs>
    </div>
    <div class="py-6">
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-select
            v-model="relativeTimeSelect"
            :items="relativeTimeList"
            item-text="text"
            item-value="data"
            menu-props="auto"
            label="Select Relative Time"
            prepend-inner-icon="mdi-clock-outline"
            return-object
            hide-details
            solo
            single-line
          />
        </v-tab-item>
        <v-tab-item>
          <v-layout row wrap>
            <v-flex lg6 sm6 xs6>
              <v-menu
                v-model="from.menu.date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    v-model="from.date"
                    label="From Date"
                    prepend-icon="mdi-calendar-outline"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="from.date"
                  @input="from.menu.date = false"
                />
              </v-menu>
            </v-flex>
            <v-flex lg6 sm6 xs6>
              <v-menu
                ref="from-time-menu"
                v-model="from.menu.time"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="from.time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    v-model="from.time"
                    label="From Time"
                    prepend-icon="mdi-clock-outline"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="from.menu.time"
                  v-model="from.time"
                  @click:minute="$refs['from-time-menu'].save(from.time)"
                />
              </v-menu>
            </v-flex>
            <v-flex lg6 sm6 xs6>
              <v-menu
                v-model="to.menu.date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    v-model="to.date"
                    label="To Date"
                    prepend-icon="mdi-calendar-outline"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="to.date"
                  @input="to.menu.date = false"
                />
              </v-menu>
            </v-flex>
            <v-flex lg6 sm6 xs6>
              <v-menu
                ref="to-time-menu"
                v-model="to.menu.time"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="to.time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    v-model="to.time"
                    label="To Time"
                    prepend-icon="mdi-clock-outline"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="to.menu.time"
                  v-model="to.time"
                  @click:minute="$refs['to-time-menu'].save(to.time)"
                />
              </v-menu>
            </v-flex>
          </v-layout>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <div class="py-2">
      <v-btn class="mr-2" outlined color="primary" @click="submit">
        Submit
      </v-btn>
      <v-btn class="ml-2" outlined @click="reset">Clear</v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClientIdSearchForm',
  data() {
    return {
      clientId: '',
      from: {
        date: null,
        time: null,
        menu: {
          date: false,
          time: false
        }
      },
      to: {
        date: null,
        time: null,
        menu: {
          date: false,
          time: false
        }
      },
      relativeTimeSelect: {
        text: 'Search in the last 1 hour',
        data: {
          value: 1,
          unit: 'hours'
        }
      },
      relativeTimeList: [
        {
          text: 'Search in the last 1 hour',
          data: {
            value: 1,
            unit: 'hours'
          }
        },
        {
          text: 'Search in the last 2 hours',
          data: {
            value: 2,
            unit: 'hours'
          }
        },
        {
          text: 'Search in the last 4 hours',
          data: {
            value: 4,
            unit: 'hours'
          }
        },
        {
          text: 'Search in the last 8 hours',
          data: {
            value: 8,
            unit: 'hours'
          }
        },
        {
          text: 'Search in the last 1 day',
          data: {
            value: 1,
            unit: 'days'
          }
        },
        {
          text: 'Search in the last 2 days',
          data: {
            value: 2,
            unit: 'days'
          }
        },
        {
          text: 'Search in the last 5 days',
          data: {
            value: 5,
            unit: 'days'
          }
        },
        {
          text: 'Search in the last 7 days',
          data: {
            value: 7,
            unit: 'days'
          }
        },
        {
          text: 'Search in the last 14 days',
          data: {
            value: 14,
            unit: 'days'
          }
        }
      ],
      tab: null
    }
  },
  computed: {
    ...mapGetters({
      expanded: 'search/isExpanded',
      clientIdSearchData: 'search/getClientIdSearchData'
    })
  },
  watch: {
    expanded(expanded) {
      if (expanded !== true) {
        return
      }

      this.setFocus()
    }
  },
  created() {
    this.clientId = this.clientIdSearchData.clientId
    this.resetRelativeDateSelect()
    this.resetAbsoluteDateSelect()
  },
  mounted() {
    if (this.expanded === true) {
      this.setFocus()
    }
  },
  methods: {
    setFocus() {
      setTimeout(() => this.$refs['client-id-input'].focus(), 200)
    },
    reset() {
      this.clientId = ''
      this.resetAbsoluteDateSelect()
      this.resetRelativeDateSelect()
    },
    resetAbsoluteDateSelect() {
      this.from.date = this.$moment().format('YYYY-MM-DD')
      this.from.time = '00:00'
      this.to.date = this.$moment().add(1, 'days').format('YYYY-MM-DD')
      this.to.time = '00:00'
    },
    resetRelativeDateSelect() {
      this.relativeTimeSelect = {
        text: 'Search in the last 1 day',
        data: {
          value: 1,
          unit: 'days'
        }
      }
    },
    submit() {
      let fromDate = this.from.date + ' ' + this.from.time + ':00'
      let toDate = this.to.date + ' ' + this.to.time + ':00'

      if (this.tab === 0) {
        fromDate = this.$moment()
          .subtract(
            this.relativeTimeSelect.data.value,
            this.relativeTimeSelect.data.unit
          )
          .format('YYYY-MM-DD HH:mm:ss')
        toDate = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      }

      this.$store.commit('search/setClientIdSearchData', {
        clientId: this.clientId,
        from: fromDate,
        to: toDate
      })
      this.$store.commit('search/setAction', true)
    }
  }
}
</script>
