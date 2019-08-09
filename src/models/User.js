var admin = require('firebase-admin')

const getUsersFromFirebase = (query) => {
  const listUsers = {
    data: [],
    link: null,
    metadata: {}
  }
  return new Promise((resolve, reject) => {
    try {
      admin.auth().listUsers(Number(query.page))
        .then(function(listUsersResult) {
          listUsersResult.users.forEach(function(userRecord) {
            listUsers.data.push(userRecord.toJSON())
            listUsers.metadata.size = listUsers.data.length
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
          reject(error)
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
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          resolve(userRecord)
        })
        .catch(function(error) {
          reject(error)
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
          rejact('Error updating user:', error)
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
          resolve ('Successfully deleted user')
        })
        .catch(function(error) {
          rejact('Error deleting user:', error)
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

module.exports = {
  getUsersFromFirebase,
  getUserFromFirebase,
  createFromFirebase,
  updateFromFirebase,
  deleteFromFirebase,
  updatePasswordFromFirebase
}