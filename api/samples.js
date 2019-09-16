import express from 'express'
import randomizeUtils from '../util/randomize-utils'

const app = express()

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

export default {
  path: '/api/samples/v1',
  handler: app
}
