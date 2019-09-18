import visualizerUtils from '~/util/visualizer-utils'

const API_URL_PATTERN = `${process.env.API_CLIENT_URL}/api/samples/v1/messages/{requestId}`

export const state = () => ({
  list: {
    loaded: false,
    listData: {}
  }
})

export const mutations = {
  setList(state, listData) {
    state.list.listData = listData
  },
  setListLoaded(state, loaded) {
    state.list.loaded = loaded
  }
}

export const getters = {
  getList(state) {
    return state.list
  }
}

export const actions = {
  async fetchList({ commit }, requestId) {
    commit('setListLoaded', false)

    const apiUrl = visualizerUtils.getUrlPath(API_URL_PATTERN, {
      requestId
    })

    await this.$axios
      .get(apiUrl)
      .then((res) => {
        const listData = [
          {
            title: 'API Information',
            items: [
              {
                title: 'request_id',
                content: res.data.request_id,
                description: 'API Trace ID',
                cardTitleClass: 'pt-0'
              },
              {
                title: 'request_time',
                content: res.data.request_time,
                description: 'API request time'
              },
              {
                title: 'request_ip_address',
                content: res.data.request_ip_address,
                description: 'Request client IP address'
              },
              {
                title: 'request_domain',
                content: res.data.request_domain,
                description: 'Request domain'
              },
              {
                title: 'request_method',
                content: res.data.request_method,
                description: 'Request HTTP method'
              },
              {
                title: 'request_path',
                content: res.data.request_path,
                description: 'Request API endpoint'
              },
              {
                title: 'request_query_string',
                content: res.data.request_query_string,
                description: 'Request query string'
              },
              {
                title: 'request_body',
                content: res.data.request_body,
                description: 'Request body message',
                json: true
              },
              {
                title: 'response_code',
                content: res.data.response_code,
                description: 'Response HTTP status code'
              },
              {
                title: 'response_body',
                content: res.data.response_body,
                description: 'Response body message',
                json: true
              }
            ]
          },
          { divider: true },
          {
            title: 'Server Information',
            items: [
              {
                title: 'system',
                content: res.data.system,
                description: 'API system name',
                cardTitleClass: 'pt-0'
              },
              {
                title: 'profile',
                content: res.data.profile,
                description: 'Server profile'
              },
              {
                title: 'server_ip_address',
                content: res.data.server_ip_address,
                description: 'Server IP address',
                icon: 'mdi-chart-areaspline-variant',
                iconColor: 'info'
              },
              {
                title: 'process_time',
                content: res.data.process_time,
                description: 'API process time (ms)'
              }
            ]
          }
        ]

        commit('setList', listData)
      })
      .catch((error) => {
        commit('setListLoaded', true)
        throw error
      })

    commit('setListLoaded', true)
  }
}
