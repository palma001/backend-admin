const express = require('express')
const cors = require('cors')
var swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
require('./database')

const app = express()

// settings
app.set('port', process.env.PORT || 4000)
// middlewares 
app.use(cors())
app.use(express.json())

// routes+
app.use('/api/users', require('./routes/users'))

const swaggerDefinition = {
  info: {
    'title': 'Swagger Map App',
    'description': 'This is a sample server Map.',
    'termsOfService': 'http://swagger.io/terms/',
    'contact': {
      'name': 'API Support',
      'url': 'http://www.swagger.io/support',
      'email': 'support@swagger.io'
    },
    'license': {
      'name': 'Apache 2.0',
      'url': 'http://www.apache.org/licenses/LICENSE-2.0.html'
    },
    'version': '1.0.1'
  }
}
const options = {
  swaggerDefinition,
  apis: ['./controllers/*.js',], // <-- not in the definition, but in the options
}

const swaggerSpec = swaggerJSDoc(options)

app.get('/api-docs.json', function(req, res) { // line 41
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
module.exports = app
