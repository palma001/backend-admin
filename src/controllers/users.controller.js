const { 
  getUsersFromFirebase,
  getUserFromFirebase,
  createFromFirebase,
  deleteFromFirebase,
  updateFromFirebase ,
  updatePasswordFromFirebase
} = require('../models/User')

const userCtrl = {}

userCtrl.getUsers = async (req, res) => {
  const users = await getUsersFromFirebase(req.query)
  res.json(users)
}

userCtrl.getUser = async (req, res) => {
  const { id } = req.params
  const user = await getUserFromFirebase(id)
  res.json(user)
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

userCtrl.updatePassword = async (req, res) => {
  const { id } = req.params
  let user = await updatePasswordFromFirebase(id, req.body.password)
  res.json(user)
}
module.exports = userCtrl