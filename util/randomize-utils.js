import Chance from 'chance'

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
  getStatistics,
  getComparedStatistics
}
