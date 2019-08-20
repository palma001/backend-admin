const { Router } = require('express')
var jwt = require('jsonwebtoken')
const router = Router()
const { middleware } = require('../middleware/auth')

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


// function middleware(rol, fn) {
//   router.all('*', function(req, res, next) {
//     let token = req.headers['authorization']
//     jwt.verify(token, 'my_token', (err, data) => {
//       if (err) {
//         res.sendStatus(401).json({
//           error: true,
//           message: 'Unauthorized'
//         })
//       } else {
//         // res.json(data)
//         next()
//       }
//     })
//   })
//   fn()
// }

router.route('/login')
  .post(login)

middleware('admin', () => {
  router.route('/')
    .get(getUsers)
    .post(createUser)
})

middleware('superuser', () => {
  router.route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)
})
router.route('/admin')
  .get((req, res) => {
    let token = req.headers['authorization']
    jwt.verify(token, 'my_token', (err, data) => {
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
router.route('/phone/:phone')
  .get(getNumberPhone)

router.route('/email/:email')
  .get(getEmail)

module.exports = router
