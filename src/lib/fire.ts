import firebase from 'firebase'
import 'firebase/analytics'
import 'firebase/auth'

const ROLES = {
	admin: 'admin',
	owner: 'owner',
	editor: 'editor',
	user: 'user'
}

const config = {
  apiKey: "AIzaSyDin-xOT8bMoecdkDCIbWvlg43UtfASgzA",
  authDomain: "listic-17cbd.firebaseapp.com",
  databaseURL: "https://listic-17cbd.firebaseio.com",
  projectId: "listic-17cbd",
  storageBucket: "listic-17cbd.appspot.com",
  messagingSenderId: "906805463498",
  appId: "1:906805463498:web:658f80e57fcefd6af0e733",
  measurementId: "G-CZP1EDG0LF"
}

// Initialize Firebase
const fire = firebase.initializeApp(config)
if(process.env.NODE_ENV === 'production') {
  firebase.analytics()
}

const db = fire.database()
const auth = fire.auth()

export { fire, db, auth, ROLES }
