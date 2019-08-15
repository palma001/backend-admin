const { Router } = require('express')
var jwt = require('jsonwebtoken')

const router = Router()

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getNumberPhone,
  getEmail,
  login
} = require('../controllers/users.controller')

function generateToken (req, res, next) {
  let token = req.headers['authorization']
  if (typeof token !== 'undefined') {
    req.token = token
    next()
  } else {
    res.redirect('/api/users')
  }
}
router.route('/admin')
  .get(generateToken, (req, res) => {
    jwt.verify(req.token, 'my_token', (err, data) => {
      if (err) {
        res.sendStatus(403)
      } else {
        res.json({
          name: 'Soy el admin',
          data
        })
      }
    })
  })

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/login')
  .post(login)

router.route('/:id')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser)

router.route('/phone/:phone')
  .get(getNumberPhone)

router.route('/email/:email')
  .get(getEmail)

module.exports = router
