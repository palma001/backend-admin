var admin = require('firebase-admin')
var serviceAccount = require('../backend-map-firebase.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://backend-map.firebaseio.com'
})