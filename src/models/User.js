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
      const Entry = db.ref('users')
      // .orderByChild('apellido')
        .limitToLast(Number(query.pageSize))
      Entry.once('value', (users) => {
        users.forEach((user) => {
          listUsers.data.push(user.val())
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
  const Entry = admin.database().ref('users/' + data.name)
  return new Promise((resolve, reject) => {
    try {
      Entry.set(data)
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}
const updateFromFirebase = (id, data) => {
  const Entry = admin.database().ref('users/' + id)
  return new Promise((resolve, rejact) => {
    try {
      Entry.update(data)
      resolve(Entry.key)
    } catch(e) {
      rejact(e)
    }
  })
}

const deleteFromFirebase = (id) => {
  const Entry = admin.database().ref('users/' + id)
  return new Promise((resolve, rejact) => {
    try {
      Entry.remove()
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