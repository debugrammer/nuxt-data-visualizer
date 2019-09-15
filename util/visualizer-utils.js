import moment from 'moment'

function getInterval(from, to) {
  const fromDate = moment(from)
  const toDate = moment(to)
  const diffHours = toDate.diff(fromDate, 'hours')

  if (diffHours <= 24) {
    return 'minute'
  }

  if (diffHours <= 72) {
    return 'hour'
  }

  return 'day'
}

export default {
  getInterval
}
