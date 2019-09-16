import Chance from 'chance'
import moment from 'moment'

function getHistogram(interval, from, to) {
  if (moment(from).isValid() === false) {
    from = ''
  }

  if (moment(to).isValid() === false) {
    to = ''
  }

  const chance = new Chance()
  const nowDate = moment()
  const fromDate = from ? moment(from) : moment()
  const toDate = to ? moment(to) : moment()
  const histogram = { histogram: [] }

  while (toDate.diff(fromDate, interval) > 0) {
    if (nowDate.diff(fromDate) < 0) {
      break
    }

    let label = ''

    switch (interval) {
      case 'hour':
        label = fromDate.format('YYYY-MM-DD HH')
        break
      case 'day':
        label = fromDate.format('YYYY-MM-DD')
        break
      case 'minute':
        label = fromDate.format('YYYY-MM-DD HH:mm')
        break
    }

    histogram.histogram.push({
      label,
      data: chance.integer({ min: 0, max: 10000 })
    })

    fromDate.add(1, interval)
  }

  return histogram
}

function getStatistics() {
  const chance = new Chance()

  return {
    count: chance.integer({ min: 0, max: 500 }),
    sum: chance.floating({ min: 0, max: 1000 }),
    sum_of_squares: chance.floating({ min: 0, max: 1000 }),
    mean: chance.floating({ min: 0, max: 1000 }),
    min: chance.floating({ min: 0, max: 500 }),
    max: chance.floating({ min: 0, max: 1000 }),
    variance: chance.floating({ min: 0, max: 1000 }),
    std_deviation: chance.floating({ min: 0, max: 1000 }),
    cardinality: chance.integer({ min: 0, max: 500 })
  }
}

function getComparedStatistics() {
  const firstStat = getStatistics()
  const secondStat = getStatistics()
  let comparedStatistics = [firstStat, secondStat]

  if (firstStat.cardinality > secondStat.cardinality) {
    comparedStatistics = [secondStat, firstStat]
  }

  return {
    compared_statistics: comparedStatistics
  }
}

function getLabeledStatistics() {
  return {
    labeled_statistics: [
      { label: '0', statistics: getStatistics() },
      { label: '0.02', statistics: getStatistics() },
      { label: '0.04', statistics: getStatistics() },
      { label: '0.06', statistics: getStatistics() },
      { label: '0.08', statistics: getStatistics() },
      { label: '0.1', statistics: getStatistics() },
      { label: '0.2', statistics: getStatistics() },
      { label: '0.3', statistics: getStatistics() },
      { label: '0.4', statistics: getStatistics() },
      { label: '0.5', statistics: getStatistics() },
      { label: '0.6', statistics: getStatistics() },
      { label: '0.7', statistics: getStatistics() },
      { label: '0.8', statistics: getStatistics() },
      { label: '0.9', statistics: getStatistics() },
      { label: '1', statistics: getStatistics() },
      { label: '2', statistics: getStatistics() },
      { label: '3', statistics: getStatistics() },
      { label: '4', statistics: getStatistics() },
      { label: '5', statistics: getStatistics() },
      { label: '6', statistics: getStatistics() },
      { label: '7', statistics: getStatistics() },
      { label: '8', statistics: getStatistics() },
      { label: '9', statistics: getStatistics() },
      { label: '10', statistics: getStatistics() },
      { label: '15', statistics: getStatistics() },
      { label: '20', statistics: getStatistics() },
      { label: '25', statistics: getStatistics() },
      { label: '30', statistics: getStatistics() }
    ]
  }
}

export default {
  getHistogram,
  getStatistics,
  getComparedStatistics,
  getLabeledStatistics
}
