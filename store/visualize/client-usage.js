import _ from 'lodash'
import visualizerUtils from '~/util/visualizer-utils'

const API_URL_PATTERN = `${process.env.API_CLIENT_URL}/api/samples/v1/terms/clients`

const TABLE_HEADERS = [
  {
    text: 'Client Name',
    sortable: false,
    value: 'clientName'
  },
  {
    text: 'Client ID',
    sortable: false,
    value: 'clientId'
  },
  {
    text: 'Percent',
    align: 'left',
    sortable: false,
    value: 'percent',
    width: 150
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
          from: payload.from,
          to: payload.to,
          client_id: payload.clientId,
          request_path: payload.requestPath,
          scopes: payload.scopes,
          top_values_only: payload.topValuesOnly
        }
      })
      .then((res) => {
        const tableData = []
        const terms = res.data.terms
        const termsSize = _.size(terms)

        _.forEach(terms, (value, key) => {
          tableData.push({
            clientName: value.labels[1] || value.labels[0],
            clientId: value.labels[0] === 'Other' ? '' : value.labels[0],
            percent: visualizerUtils.percent(value.ratio),
            color: visualizerUtils.getColor(
              'LIGHT_BLUE_GREEN',
              key,
              !payload.topValuesOnly,
              termsSize
            ),
            count: visualizerUtils.numberFormat(value.data)
          })
        })

        commit('setTable', tableData)
      })
      .catch((error) => {
        commit('setTableLoaded', true)
        throw error
      })

    commit('setTableLoaded', true)
  }
}
