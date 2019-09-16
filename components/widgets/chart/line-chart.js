import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{ stacked: false }],
          yAxes: [
            {
              display: true,
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: ''
              },
              id: 'y-axis-1'
            }
          ]
        }
      })
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
