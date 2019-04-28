const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { transformAdvisorData, fetchAdvisorData, updateAdvisorData, checkEmptyAvailability } = require('./utils/helpers')
const app = express()
const port = process.env.PORT || 4433

const bookingsDb = []

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(200)
})

app.get('/advisors', (req, res) => {
  fetchAdvisorData()
    .then(data => {
      // Convert data to object with keys for each advisor
      const advisorData = transformAdvisorData(data)
      // Remove any bookings in db before sending in response
      const updatedData = updateAdvisorData(bookingsDb, advisorData)
      // Delete any advisor keys with no availability
      const cleanedUpData = checkEmptyAvailability(updatedData)
      res.send(cleanedUpData)
    })
    .catch(error => {
      console.error(error)
      res.status(500).send('Could not fetch advisor data from Thinkful API')
    })
})

app.get('/bookings', (req, res) => {
  res.send(bookingsDb)
})

app.post('/bookings', (req, res) => {
  if (req.body.bookingId && req.body.advisorId && req.body.studentName && req.body.dateTime) {
    bookingsDb.push({
      bookingId: req.body.bookingId,
      advisorId: req.body.advisorId,
      studentName: req.body.studentName,
      dateTime: req.body.dateTime
    })
    res.sendStatus(201)
  } else {
    res.status(400).send('Booking not saved - one of the following properties was invalid: bookingId, advisorId, studentName or dateTime.')
  }
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server listening on port ${port}!`))
}

module.exports = app
