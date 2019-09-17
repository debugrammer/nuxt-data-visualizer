import _ from 'lodash'

const API_URL_PATTERN = `${process.env.API_CLIENT_URL}/api/samples/v1/terms/clients`

const TABLE_HEADERS = [
  {
    text: 'Client Name',
    sortable: false,
    value: 'clientName'
  },
  {
    text: 'Percent',
    align: 'left',
    sortable: false,
    value: 'percent'
  },
  {
    text: 'Count',
    align: 'right',
    sortable: false,
    value: 'count'
  }
]

export const state = () => ({
  table: {
    loaded: false,
    tableData: [],
    headers: TABLE_HEADERS
  }
})

export const mutations = {
  setTable(state, tableData) {
    state.table.tableData = tableData
  },
  setTableLoaded(state, loaded) {
    state.table.loaded = loaded
  }
}

export const getters = {
  getTable(state) {
    return state.table
  }
}

export const actions = {
  async fetchTable({ commit }, payload) {
    commit('setTableLoaded', false)

    await this.$axios
      .get(API_URL_PATTERN, {
        params: {
          size: payload.size,
          client_id: payload.clientId,
          grant_type: 'client_credentials',
          top_values_only: payload.topValuesOnly
        }
      })
      .then((res) => {
        const tableData = []
        const terms = res.data.terms

        _.forEach(terms, (value, key) => {
          tableData.push({
            clientName: value.labels[1] || value.labels[0],
            percent: (value.percent * 100).toFixed(2),
            color:
              key < 20 ? process.env.COLOR_SET.LIGHT_BLUE_GREEN[key] : 'grey',
            count: Intl.NumberFormat('en-US').format(value.data)
          })
        })

        if (payload.topValuesOnly !== true) {
          tableData[_.size(tableData) - 1].color = 'grey'
        }

        commit('setTable', tableData)
      })
      .catch((error) => {
        commit('setTableLoaded', true)
        throw error
      })

    commit('setTableLoaded', true)
  }
}
