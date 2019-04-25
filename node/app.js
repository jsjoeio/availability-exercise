const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { transformAdvisorData, fetchAdvisorData } = require('./utils/helpers')
const app = express()
const port = 4433

app.use(cors())
app.use(bodyParser.json())

app.get('/advisors', (req, res) => {
  fetchAdvisorData()
    .then(data => {
      const advisorData = transformAdvisorData(data)
      res.send(advisorData)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
