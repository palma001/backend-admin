const { 
  getUserFromFirebase,
  createFromFirebase,
  deleteFromFirebase,
  updateFromFirebase 
} = require('../models/User')

const userCtrl = {}

userCtrl.getUsers = async (req, res) => {
  const users = await getUserFromFirebase(req.query)
  res.json(users)
}

userCtrl.createUser = async (req, res) => {
  const user = await createFromFirebase(req.body)
  res.json(user)
}

userCtrl.updateUser = async (req, res) => {
  const { id } = req.params
  const user = await updateFromFirebase(id, req.body)
  res.json(user)
}

userCtrl.deleteUser = async (req, res) => {
  const { id } = req.params
  await deleteFromFirebase(id)
  res.json('User deleted')
}

module.exports = userCtrl