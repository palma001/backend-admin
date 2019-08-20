const { Router } = require('express')
var jwt = require('jsonwebtoken')
const router = Router()

const middleware = function (rol, fn) {
  router.all('*', function(req, res, next) {
    let token = req.headers['authorization']
    console.log(token)
    jwt.verify(token, 'my_token', (err, data) => {
      if (err) {
        res.sendStatus(401).json({
          error: true,
          message: 'Unauthorized'
        })
      } else {
        next()
      }
    })
  })
  fn()
}

module.exports = {
  middleware
}