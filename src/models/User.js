var admin = require('firebase-admin')

var db = admin.database()

const getUserFromFirebase = (query) => {
  const listUsers = {
    data: [],
    link: null,
    metadata: {}
  }
  return new Promise((resolve, reject) => {
    try {
      const user = db.ref('users')
      // .orderByChild('apellido')
        .limitToLast(Number(query.pageSize))
      user.on('value', (users) => {
        users.forEach((data) => {
          listUsers.data.push(data.val())
          listUsers.metadata.totalElements = users.numChildren()
          listUsers.metadata.size = listUsers.data.length
        })
        resolve(listUsers)
      })
    } catch(err) {
      reject(err)
    }
  })
}
const createFromFirebase = (data) => {
  const user = admin.database().ref('users/' + data.name)
  var storageRef = admin.storage().ref()
  var mountainsRef = storageRef.child('mountains.jpg')
  var mountainImagesRef = storageRef.child('images/mountains.jpg')
  mountainsRef.name === mountainImagesRef.name            // true
  mountainsRef.fullPath === mountainImagesRef.fullPath    // false
  var file = 'Note.js'
  ref.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!')
  })
  return new Promise((resolve, reject) => {
    try {
      user.set(data)
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}
const updateFromFirebase = (id, data) => {
  const user = admin.database().ref('users/' + id)
  return new Promise((resolve, rejact) => {
    try {
      user.update(data)
      resolve(user.key)
    } catch(e) {
      rejact(e)
    }
  })
}

const deleteFromFirebase = (id) => {
  const user = admin.database().ref('users/' + id)
  return new Promise((resolve, rejact) => {
    try {
      user.remove()
      resolve('User deleted successfull')
    } catch(e) {
      rejact(e)
    }
  })
}
module.exports = {
  getUserFromFirebase,
  createFromFirebase,
  updateFromFirebase,
  deleteFromFirebase
}