import _ from 'lodash'
import moment from 'moment'

function validateInterval(interval) {
  const VALID_INTERVALS = ['hour', 'day']

  return VALID_INTERVALS.includes(interval) === true
}

function getInterval(from, to) {
  const fromDate = moment(from)
  const toDate = moment(to)
  const diffHours = toDate.diff(fromDate, 'hours')

  if (diffHours <= 72) {
    return 'hour'
  }

  return 'day'
}

function getColorSet(colorSetName, dropLast = false, dataSize = 0) {
  const size = dropLast === true ? dataSize : -1
  let colorSet = process.env.COLOR_SET[colorSetName]

  if (size > 0) {
    colorSet = _.dropRight(colorSet, colorSet.length - (size - 1))
  }

  return colorSet
}

function getColor(colorSetName, index, depressed = false, dataSize = 0) {
  const lastIndex = depressed === true ? dataSize - 1 : -1
  const color = process.env.COLOR_SET[colorSetName][index]

  if (depressed !== true) {
    return color || 'grey'
  }

  if (index === lastIndex) {
    return 'grey'
  }

  return color
}

function numberFormat(number, locales = 'en-US', options = {}) {
  return new Intl.NumberFormat(locales, options).format(number)
}

function percent(ratio, fractionDigits = 2) {
  return (ratio * 100).toFixed(fractionDigits)
}

export default {
  validateInterval,
  getInterval,
  getColorSet,
  getColor,
  numberFormat,
  percent
}
