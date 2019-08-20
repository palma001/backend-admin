var admin = require('firebase-admin')
var jwt = require('jsonwebtoken')

var storage = admin.storage().bucket('gs://backend-map.appspot.com')

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
      addImage(data.photoURL).then(res => {
        data = (data.photoURL) ? data.photoURL =  res : data
        admin.auth().createUser(data)
          .then((userRecord) => {
            resolve(userRecord)
          })
          .catch((error) => {
            resolve(error)
          })
      })
    } catch (e) {
      reject(e)
    }
  })
}

const updateFromFirebase = (id, data) => {
  return new Promise((resolve, rejact) => {
    try {
      addImage(data.photoURL).then(res => {
        data = (data.photoURL) ? data.photoURL =  res : data
        admin.auth().updateUser(id, data)
          .then(function(userRecord) {
            resolve(userRecord.toJSON())
          })
          .catch(function(error) {
            resolve(error)
          })
      })
        .catch(e => {
          console.log(e)
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
          reject(error)
        })
    } catch(e) {
      reject(e)
    }
  })
}

const addImage = (image) => {
  return new Promise((resolve, rejact) => {
    try {
      storage.upload(image)
        .then((data) => {
          const file = data[0]
          const url = `https://firebasestorage.googleapis.com/v0/b/${file.metadata.bucket}/o/${file.metadata.name}?alt=media`
          resolve(url)
        })
        .catch(err => {
          resolve(err)
        })
    } catch (error) {
      rejact(error)
    }
  })
}
const loginFirebase = (data) => {
  data.rol = 'admin'
  admin.createUserWithEmailAndPassword('hola', 'hola')
    .catch(err => {
      console.log(err)
    })
  // return new Promise((resolve, reject) => {
  //   getEmailFromFirebase(data.email)
  //     .then(user => {
  //       const token = jwt.sign(user, 'my_token')
  //       let response = {
  //         token: token
  //       }
  //       resolve(response)
  //     })
  //     .catch(error => {
  //       resolve(error)
  //     })
  // })
}
module.exports = {
  getUsersFromFirebase,
  getUserFromFirebase,
  createFromFirebase,
  updateFromFirebase,
  deleteFromFirebase,
  updatePasswordFromFirebase,
  getNumberPhoneFromFirebase,
  getEmailFromFirebase,
  loginFirebase
}