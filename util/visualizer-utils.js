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

export default {
  validateInterval,
  getInterval
}
