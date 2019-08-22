var jwt = require('jsonwebtoken')
const middlewares = {
  auth: function (req, res, next) {
    let token = req.headers['authorization']
    jwt.verify(token, 'my_token', (err, data) => {
      if (err) {
        res.sendStatus(401).json({
          error: true,
          message: 'Unauthorized'
        })
      }
      next()
    })
  }
}
module.exports = { middlewares }