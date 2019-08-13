const { Router } = require('express')
const router = Router()

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getNumberPhone,
  getEmail
} = require('../controllers/users.controller')

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/:id')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser)

router.route('/phone/:phone')
  .get(getNumberPhone)

router.route('/email/:email')
  .get(getEmail)

module.exports = router
