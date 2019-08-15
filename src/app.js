const express = require('express')
const cors = require('cors')
var swaggerUi = require('swagger-ui-express')
var bodyParser = require('body-parser')
var swaggerDoc = require('./swagger')
const morgan = require('morgan')
require('./firebase-admin')
const app = express()

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
// routes
app.use('/api/users', require('./routes/users'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

module.exports = app
