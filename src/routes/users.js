const { Router } = require('express')
const router = Router()

const { getUsers, createUser, updateUser, deleteUser, getUser, updatePassword } = require('../controllers/users.controller')

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/:id')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser)

router.route('/reset-password/:id')
  .put(updatePassword)
module.exports = router
