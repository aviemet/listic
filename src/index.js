import React from 'react'
import * as firebase from 'firebase'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

const firebaseConfig = {
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
firebase.initializeApp(firebaseConfig)
firebase.analytics()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
