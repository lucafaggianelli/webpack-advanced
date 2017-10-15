const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.createUser = functions.auth.user().onCreate(event => {
  let uid = event.data.uid

  admin.database().ref('/users').child(uid).set({
    email: event.data.email
  })
})
