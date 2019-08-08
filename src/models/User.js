const firebase = require("firebase");

const getUserFromFirebase = (query) => {
  const listUsers = {
    data: [],
    link: null,
    metadata: {}
  }
  return new Promise((resolve, reject) => {
    try {
        const Entry = firebase.database()
          .ref('users')
          // .orderByChild('apellido')
          .limitToLast(Number(query.pageSize));
        Entry.on('value', (users) => {
          users.forEach((user) => {
            listUsers.data.push(user.val());
            listUsers.metadata.totalElements = user.numChildren();
            listUsers.metadata.size = listUsers.data.length;
          });
          resolve(listUsers);
        });
    } catch(err) {
      reject(err);
    }
  });
}
const createFromFirebase = (data) => {
  const Entry = firebase.database().ref('users/' + data.name);
  return new Promise((resolve, reject) => {
    try {
      let user = Entry.set(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}
const updateFromFirebase = (id, data) => {
  const Entry = firebase.database().ref('users/' + id);
  return new Promise((resolve, rejact) => {
    try {
      Entry.update(data);
      resolve(Entry.key);
    } catch(e) {
      rejact(e);
    }
  });
}

const deleteFromFirebase = (id) => {
  const Entry = firebase.database().ref('users/' + id);
  return new Promise((resolve, rejact) => {
    try {
      Entry.remove();
      resolve('User deleted successfull');
    } catch(e) {
      rejact(e);
    }
  });
}
module.exports = {
  getUserFromFirebase,
  createFromFirebase,
  updateFromFirebase,
  deleteFromFirebase
};