const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { transformAdvisorData, fetchAdvisorData } = require('./utils/helpers')
const app = express()
const port = 4433

const bookingsDb = []

app.use(cors())
app.use(bodyParser.json())

app.get('/advisors', (req, res) => {
  fetchAdvisorData()
    .then(data => {
      const advisorData = transformAdvisorData(data)
      res.send(advisorData)
    })
})

app.get('/bookings', (req, res) => {
  res.send(bookingsDb)
})

app.post('/bookings', (req, res) => {
  bookingsDb.push({
    advisorId: req.body.advisorId,
    studentName: req.body.studentName,
    dateTime: req.body.dateTime
  })
  res.sendStatus(201)
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))
