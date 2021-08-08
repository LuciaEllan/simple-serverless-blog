import { boot } from 'quasar/wrappers'
import firebase from 'firebase/app'
import FirebaseConfig from '../configs/firebase-config'

export default boot(({ app }) => {
  firebase.initializeApp(FirebaseConfig)
})
