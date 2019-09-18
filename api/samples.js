import express from 'express'
import moment from 'moment'
import randomizeUtils from '../util/randomize-utils'
import visualizerUtils from '../util/visualizer-utils'

const app = express()

app.get('/messages/:requestId', (req, res) => {
  const messages = randomizeUtils.getMessages(req.params.requestId)

  res.status(200).json(messages[0])
})

app.get('/histograms/process-times', (req, res) => {
  let from = req.query.from
  let to = req.query.to
  const interval = req.query.interval

  if (moment(from).isValid() === false) {
    from = ''
  }

  if (moment(to).isValid() === false) {
    to = ''
  }

  const fromDate = from ? moment(from) : moment()
  const toDate = to ? moment(to) : moment()

  if (toDate.diff(fromDate, 'days') > 31) {
    return res.status(400).json({
      error_code: 'BAD_REQUEST',
      error_message: 'Date range is too wide.'
    })
  }

  if (visualizerUtils.validateInterval(interval) === false) {
    return res.status(400).json({
      error_code: 'BAD_REQUEST',
      error_message: 'Wrong interval type.'
    })
  }

  const labels = ['0-50', '50-100', '100-200', '200-500', '500-1000', '1000-']
  const histograms = randomizeUtils.getHistograms(labels, interval, from, to)

  res.status(200).json(histograms)
})

app.get('/statistics/comparisons/period', (req, res) => {
  const comparedStatistics = randomizeUtils.getComparedStatistics()

  res.status(200).json(comparedStatistics)
})

app.get('/labeled-statistics/process-times', (req, res) => {
  const labels = [
    '0',
    '0.02',
    '0.04',
    '0.06',
    '0.08',
    '0.1',
    '0.2',
    '0.3',
    '0.4',
    '0.5',
    '0.6',
    '0.7',
    '0.8',
    '0.9',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '15',
    '20',
    '25',
    '30'
  ]
  const labeledStatistics = randomizeUtils.getLabeledStatistics(labels)

  res.status(200).json(labeledStatistics)
})

app.get('/terms/request-paths', (req, res) => {
  const size = req.query.size

  if (size > 20) {
    return res.status(400).json({
      error_code: 'BAD_REQUEST',
      error_message: 'Size cannot be greater than 20.'
    })
  }

  const terms = randomizeUtils.getTerms(['request_path'], size)

  res.status(200).json(terms)
})

app.get('/terms/clients', (req, res) => {
  const size = req.query.size

  if (size > 10) {
    return res.status(400).json({
      error_code: 'BAD_REQUEST',
      error_message: 'Size cannot be greater than 10.'
    })
  }

  const terms = randomizeUtils.getTerms(['client_name'], size)

  res.status(200).json(terms)
})

export default {
  path: '/api/samples/v1',
  handler: app
}
