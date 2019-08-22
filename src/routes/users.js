const { Router } = require('express')
const router = Router()
const { middlewares } = require('../middleware/auth')

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

router.route('/')
  .get(middlewares.auth, getUsers)
  .post(middlewares.auth, createUser)

router.route('/login')
  .post(login)

router.route('/:id')
  .get(middlewares.auth, getUser)
  .delete(middlewares.auth, deleteUser)
  .put(middlewares.auth, updateUser)

router.route('/phone/:phone')
  .get(middlewares.auth, getNumberPhone)

router.route('/email/:email')
  .get(middlewares.auth, getEmail)

module.exports = router
