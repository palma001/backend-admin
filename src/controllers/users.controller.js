const { 
  getUsersFromFirebase,
  getUserFromFirebase,
  createFromFirebase,
  deleteFromFirebase,
  updateFromFirebase ,
  getNumberPhoneFromFirebase,
  getEmailFromFirebase
} = require('../models/User')

const userCtrl = {}

userCtrl.getUsers = async (req, res) => {
  const users = await getUsersFromFirebase(req.query)
  res.json(users)
}

userCtrl.getUser = async (req, res) => {
  const { id } = req.params
  const user = await getUserFromFirebase(id)
  if (user.code) {
    res.status(404).json(user)
  } else {
    res.status(200).json(user)
  }
}

userCtrl.createUser = async (req, res) => {
  const user = await createFromFirebase(req.body)
  if (user.code) {
    res.status(400).json(user)
  } else {
    res.status(201).json(user)
  }
}

userCtrl.updateUser = async (req, res) => {
  const { id } = req.params
  const user = await updateFromFirebase(id, req.body)
  if (user.code) {
    res.status(400).json(user)
  } else {
    res.status(201).json(user)
  }
}

userCtrl.deleteUser = async (req, res) => {
  const { id } = req.params
  const user = await deleteFromFirebase(id)
  if (user.code) {
    res.status(404).json(user)
  } else {
    res.status(201).send('User deleted')
  }
}

userCtrl.getNumberPhone = async (req, res) => {
  const { phone } =  req.params
  let user = await getNumberPhoneFromFirebase(phone)
  if (user.code) {
    res.status(400).json(user)
  } else {
    res.status(200).json(user)
  }
}

userCtrl.getEmail = async (req, res) => {
  const { email } = req.params
  let user = await getEmailFromFirebase(email)
  if (user.code) {
    res.status(400).json(user)
  } else {
    res.status(200).json(user)
  }
}

module.exports = userCtrl