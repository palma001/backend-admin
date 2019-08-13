var admin = require('firebase-admin')

const getUsersFromFirebase = (query) => {
  const listUsers = {
    content: [],
    link: null,
    metadata: {}
  }
  return new Promise((resolve, reject) => {
    try {
      let page = (query.page) ? query.page : 1000
      admin.auth().listUsers(Number(page))
        .then(function(listUsersResult) {
          listUsersResult.users.forEach(function(userRecord) {
            listUsers.content.push(userRecord.toJSON())
            listUsers.metadata.size = listUsers.content.length
          })
          resolve(listUsers)
        })
        .catch(function(error) {
          reject(error)
        })
    } catch(err) {
      reject(err)
    }
  })
}

const getUserFromFirebase = (id) => {
  return new Promise((resolve, reject) => {
    try {
      admin.auth().getUser(id)
        .then(function(userRecord) {
          resolve(userRecord.toJSON())
        })
        .catch(function(error) {
          resolve(error)
        })
    } catch(e) {
      reject(e)
    }
  })
}

const createFromFirebase = (data) => {
  return new Promise((resolve, reject) => {
    try {
      admin.auth().createUser(data)
        .then((userRecord) => {
          resolve(userRecord)
        })
        .catch((error) => {
          resolve(error)
        })
    } catch (e) {
      reject(e)
    }
  })
}

const updateFromFirebase = (id, data) => {
  return new Promise((resolve, rejact) => {
    try {
      admin.auth().updateUser(id, data)
        .then(function(userRecord) {
          resolve(userRecord.toJSON())
        })
        .catch(function(error) {
          resolve(error)
        })
    } catch(e) {
      rejact(e)
    }
  })
}

const deleteFromFirebase = (id) => {
  return new Promise((resolve, rejact) => {
    try {
      admin.auth().deleteUser(id)
        .then(function() {
          resolve('Successfully deleted user')
        })
        .catch(function(error) {
          resolve(error)
        })
    } catch(e) {
      rejact(e)
    }
  })
}

const updatePasswordFromFirebase = (id, email) => {
  return new Promise((resolve, rejact) => {
    var user = admin.auth()
    try {
      user.sendPasswordEmail(id)
        .then(function() {
          resolve(email)
        })
        .catch(function(error) {
          rejact(error)
        })
    } catch(e) {
      rejact(e)
    }
  })
}

const getNumberPhoneFromFirebase = (phone) => {
  return new Promise((resolve, reject) => {
    try { 
      admin.auth().getUserByPhoneNumber(phone)
        .then(function(userRecord) {
          resolve(userRecord.toJSON())
        })
        .catch(function(error) {
          resolve(error)
        })
    } catch(e) {
      reject(e)
    }
  })
}

const getEmailFromFirebase = (email) => {
  return new Promise((resolve, reject) => {
    try {
      admin.auth().getUserByEmail(email)
        .then(function(userRecord) {
          resolve(userRecord.toJSON())
        })
        .catch(function(error) {
          resolve(error)
        })
    } catch(e) {
      reject(e)
    }
  })
}

module.exports = {
  getUsersFromFirebase,
  getUserFromFirebase,
  createFromFirebase,
  updateFromFirebase,
  deleteFromFirebase,
  updatePasswordFromFirebase,
  getNumberPhoneFromFirebase,
  getEmailFromFirebase
}