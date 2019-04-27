const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { transformAdvisorData, fetchAdvisorData, updateAdvisorData, checkEmptyAvailability } = require('./utils/helpers')
const app = express()
const port = 4433

const bookingsDb = []

app.use(cors())
app.use(bodyParser.json())

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
})

app.get('/bookings', (req, res) => {
  res.send(bookingsDb)
})

app.post('/bookings', (req, res) => {
  bookingsDb.push({
    bookingId: req.body.bookingId,
    advisorId: req.body.advisorId,
    studentName: req.body.studentName,
    dateTime: req.body.dateTime
  })
  res.sendStatus(201)
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))
