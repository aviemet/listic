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
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
}

// Initialize Firebase
const fire = firebase.initializeApp(config)

if(process.env.NODE_ENV === 'production') {
  firebase.analytics()
}

const db = fire.database()
const auth = fire.auth()

export { fire, db, auth, ROLES }
