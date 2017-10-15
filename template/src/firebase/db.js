import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDzyTCzJCIdio9rTiF9XFwR04kjZY3ZXng',
  authDomain: 'project-atlas-8621c.firebaseapp.com',
  databaseURL: 'https://project-atlas-8621c.firebaseio.com',
  projectId: 'project-atlas-8621c',
  storageBucket: 'project-atlas-8621c.appspot.com',
  messagingSenderId: '713781402583'
})

export default firebaseApp.database()
