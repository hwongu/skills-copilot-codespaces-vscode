// Create web server
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

// Create express instance
const app = express()

// Log requests to the console
app.use(morgan('combined'))
// Parse requests of content-type - application/json
app.use(bodyParser.json())
// Enable CORS
app.use(cors())

require('./routes')(app)

// Sync with database
sequelize.sync()
  .then(() => {
    // Start server
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })