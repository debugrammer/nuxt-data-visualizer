import _ from 'lodash'
import visualizerUtils from '~/util/visualizer-utils'

const TOP_CLIENTS_API_URL = `${process.env.API_CLIENT_URL}/api/samples/v1/terms/clients/dates/{date}`
const PROCESS_TIME_API_URL = `${process.env.API_CLIENT_URL}/api/samples/v1/histograms/process-times/dates/{date}`

const BAR_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
    labels: {
      fontColor: 'white'
    }
  },
  tooltips: {
    mode: 'index',
    intersect: true
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: 'white'
        }
      }
    ],
    yAxes: [
      {
        stacked: true,
        display: true,
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: ''
        },
        ticks: {
          beginAtZero: true,
          fontColor: 'white'
        },
        id: 'y-axis-1'
      }
    ]
  }
}

export const state = () => ({
  topClients: [],
  charts: []
})

export const mutations = {
  setTopClients(state, topClients) {
    state.topClients = topClients
  },
  initCharts(state, size) {
    if (_.size(state.charts) === size) {
      return
    }

    const charts = []

    for (let i = 0; i < size; i++) {
      charts.push({
        id: Math.random(),
        processTimes: {
          loaded: false,
          chartData: {},
          options: BAR_CHART_OPTIONS
        }
      })
    }

    state.charts = charts
  },
  setProcessTimeChartAt(state, payload) {
    state.charts[payload.index].processTimes.chartData = payload.chartData
  },
  setProcessTimeChartLoadedAt(state, payload) {
    state.charts[payload.index].processTimes.loaded = payload.loaded
  }
}

export const getters = {
  getTopClients(state) {
    return state.topClients
  },
  getCharts(state) {
    return state.charts
  }
}

export const actions = {
  async fetchCharts({ commit, state, dispatch }, payload) {
    await dispatch('fetchTopClients', {
      date: payload.date,
      size: payload.size
    })

    const size = _.size(state.topClients)
    commit('initCharts', size)

    for (let i = 0; i < size; i++) {
      await dispatch('fetchProcessTimeChart', {
        date: payload.date,
        clientName: state.topClients[i],
        index: i
      })
    }
  },
  async fetchTopClients({ commit, state }, payload) {
    const apiUrl = visualizerUtils.getUrlPath(TOP_CLIENTS_API_URL, {
      date: payload.date
    })

    await this.$axios
      .get(apiUrl, {
        params: {
          size: payload.size
        }
      })
      .then((res) => {
        const listData = []
        const terms = res.data.terms

        _.forEach(terms, (value) => {
          listData.push(value.labels[0])
        })

        commit('setTopClients', listData)
      })
  },
  async fetchProcessTimeChart({ commit, state }, payload) {
    commit('setProcessTimeChartLoadedAt', {
      index: payload.index,
      loaded: false
    })

    const apiUrl = visualizerUtils.getUrlPath(PROCESS_TIME_API_URL, {
      date: payload.date
    })

    await this.$axios
      .get(apiUrl)
      .then((res) => {
        const labels = []
        const dataSets = []
        const labelSet = res.data.labels
        const histograms = res.data.histograms

        let maxSize = 0
        let maxSizeIndex = 0
        _.forEach(histograms, (value, key) => {
          const size = _.size(value.histogram)

          if (maxSize < size) {
            maxSize = size
            maxSizeIndex = key
          }
        })

        _.forEach(histograms, (value, key) => {
          const histogramData = []
          const histogram = value.histogram

          _.forEach(histogram, (value) => {
            if (key === maxSizeIndex) {
              labels.push(value.label)
            }
            histogramData.push(value.data)
          })

          dataSets.push({
            label: labelSet[key],
            backgroundColor: visualizerUtils.getColor(
              'BLUE_YELLOW_RED_ALPHA',
              key
            ),
            borderWidth: 1,
            radius: 0,
            data: histogramData,
            minBarLength: 5,
            yAxisID: 'y-axis-1'
          })
        })

        commit('setProcessTimeChartAt', {
          index: payload.index,
          chartData: {
            labels,
            datasets: dataSets
          }
        })
      })
      .catch((error) => {
        commit('setProcessTimeChartLoadedAt', {
          index: payload.index,
          loaded: true
        })
        throw error
      })

    commit('setProcessTimeChartLoadedAt', {
      index: payload.index,
      loaded: true
    })
  }
}
