import express from 'express'
import randomizeUtils from '../util/randomize-utils'

const app = express()

app.get('/statistics/comparisons/period', (req, res) => {
  const comparedStatistics = randomizeUtils.getComparedStatistics()

  res.status(200).json(comparedStatistics)
})

export default {
  path: '/api/samples/v1',
  handler: app
}
