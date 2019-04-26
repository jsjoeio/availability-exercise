const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { transformAdvisorData, fetchAdvisorData } = require('./utils/helpers')
const app = express()
const port = 4433

const bookingsDb = [{
  advisorId: 34562,
  studentName: 'Joe Previte',
  dateTime: '2019-04-04T13:00:00-04:00'
}]

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
