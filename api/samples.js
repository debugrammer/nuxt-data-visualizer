import express from 'express'
import randomizeUtils from '../util/randomize-utils'

const app = express()

app.get('/statistics/comparisons/period', (req, res) => {
  const comparedStatistics = randomizeUtils.getComparedStatistics()

  res.status(200).json(comparedStatistics)
})

app.get('/labeled-statistics/process-times', (req, res) => {
  const labeledStatistics = randomizeUtils.getLabeledStatistics()

  res.status(200).json(labeledStatistics)
})

export default {
  path: '/api/samples/v1',
  handler: app
}
