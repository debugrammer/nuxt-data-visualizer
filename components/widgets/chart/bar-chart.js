import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
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
          xAxes: [{ stacked: false }],
          yAxes: [
            {
              stacked: false,
              display: true,
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: ''
              },
              ticks: {
                beginAtZero: true
              },
              minBarLength: 5,
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
