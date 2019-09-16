import _ from 'lodash'

const API_URL = `${process.env.API_CLIENT_URL}/api/samples/v1/labeled-statistics/process-times`

const BAR_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
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
        stacked: false,
        ticks: {
          fontColor: 'white'
        }
      }
    ],
    yAxes: [
      {
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
        minBarLength: 5,
        id: 'y-axis-1'
      }
    ]
  }
}

export const state = () => ({
  barChart: {
    loaded: false,
    chartData: {},
    options: BAR_CHART_OPTIONS
  }
})

export const mutations = {
  setBarChart(state, chartData) {
    state.barChart.chartData = chartData
  },
  setBarChartLoaded(state, loaded) {
    state.barChart.loaded = loaded
  },
  setBarChartOnClick(state, callback) {
    state.barChart.options.onClick = callback
  }
}

export const getters = {
  getBarChart(state) {
    return state.barChart
  }
}

export const actions = {
  async fetchBarChart({ commit, state }, payload) {
    commit('setBarChartLoaded', false)

    await this.$axios
      .get(API_URL, {
        params: {
          from: payload.from,
          to: payload.to,
          client_id: payload.clientId
        }
      })
      .then((res) => {
        const labels = []
        const termsData = []
        const labeledStatistics = res.data.labeled_statistics

        _.forEach(labeledStatistics, (value) => {
          labels.push(value.label)
          termsData.push(value.statistics.count)
        })

        commit('setBarChart', {
          labels,
          datasets: [
            {
              label: 'Requests',
              backgroundColor: process.env.COLOR_SET.RAINBOW,
              data: termsData,
              yAxisID: 'y-axis-1'
            }
          ]
        })

        if (payload.onClick) {
          commit('setBarChartOnClick', payload.onClick)
        }
      })
      .catch((error) => {
        commit('setBarChartLoaded', true)
        throw error
      })

    commit('setBarChartLoaded', true)
  }
}
