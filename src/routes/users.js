const { Router } = require('express')
const router = Router()

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller')

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/:id')
  .delete(deleteUser)
  .put(updateUser)

module.exports = router
