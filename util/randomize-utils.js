import Chance from 'chance'
import moment from 'moment'
import _ from 'lodash'

function getHistogram(interval, from, to) {
  const chance = new Chance()
  const nowDate = moment()
  const fromDate = moment(from)
  const toDate = moment(to)
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

function getTerms(size, topValuesOnly, fields) {
  const chance = new Chance()
  const terms = []
  let total = 0

  for (let i = 0; i < size; i++) {
    const labels = []

    _.forEach(fields, (field) => {
      switch (field) {
        case 'request_path':
          const requestPathSize = chance.integer({ min: 1, max: 3 })
          let requestPath = ''

          for (let j = 0; j < requestPathSize; j++) {
            requestPath += `/${chance.word()}`
          }

          labels.push(requestPath)
          break
        case 'id':
          const id = chance.string({ length: 15, alpha: true, numeric: true })
          labels.push(id)
          break
      }
    })

    if (_.isEmpty(labels) === true) {
      return false
    }

    const data = chance.integer({ min: 0, max: 10000 })
    total += data

    terms.push({
      labels,
      data,
      percent: 0
    })
  }

  if (topValuesOnly === false) {
    const data = chance.integer({ min: 0, max: 10000 })
    total += data

    terms.push({
      labels: ['Other'],
      data,
      percent: 0
    })
  }

  _.forEach(terms, (result) => {
    result.percent = result.data / total
  })

  return terms
}

function getHistograms(labels, interval, from, to) {
  const histograms = {
    labels,
    histograms: []
  }

  _.forEach(labels, () => {
    histograms.histograms.push(getHistogram(interval, from, to))
  })

  return histograms
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

function getLabeledStatistics(labels) {
  const labeledStats = { labeled_statistics: [] }

  _.forEach(labels, (label) => {
    labeledStats.labeled_statistics.push({
      label,
      statistics: getStatistics()
    })
  })

  return labeledStats
}

export default {
  getHistogram,
  getStatistics,
  getTerms,
  getHistograms,
  getComparedStatistics,
  getLabeledStatistics
}
