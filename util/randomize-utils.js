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
    count: chance.integer({ min: 0, max: 50 }),
    sum: chance.floating({ min: 0, max: 100 }),
    sum_of_squares: chance.floating({ min: 0, max: 100 }),
    mean: chance.floating({ min: 0, max: 100 }),
    min: chance.floating({ min: 0, max: 100 }),
    max: chance.floating({ min: 0, max: 100 }),
    variance: chance.floating({ min: 0, max: 100 }),
    std_deviation: chance.floating({ min: 0, max: 100 }),
    cardinality: chance.integer({ min: 0, max: 50 })
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

export default {
  getHistogram,
  getStatistics,
  getComparedStatistics
}
