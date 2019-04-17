import firebase from 'firebase/app'
import FirebaseConfig from '../configs/firebase-config'

export default async ({ Vue }) => {
  firebase.initializeApp(FirebaseConfig)
}
