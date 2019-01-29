<template>
  <div>
    <button @click="login" v-if="currentUser === null">Sign in with Google</button>
    <button @click="logout" v-if="currentUser !== null">Sign out</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseConfig from '@/firebase-config'

export default {
  name: 'firebase-auth',
  data () {
    return {
      googleAuth: new firebase.auth.GoogleAuthProvider(),
      currentUser: null
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithPopup(this.googleAuth).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        // ...
        console.log('Successfully signed in')
        console.log(result)
      }).catch((error) => {
        console.log('Error during signed in')
        console.log(error)
        // Handle Errors here.
        // var errorCode = error.code
        // var errorMessage = error.message
        // The email of the user's account used.
        // var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential
        // ...
      })
    },
    logout () {
      firebase.auth().signOut().then(() => {
        console.log('Successfully signed out')
      })
    }
  },
  created () {
    firebase.initializeApp(firebaseConfig)

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('State: logged in')
        console.log(user)
        this.currentUser = user
      } else {
        // No user is signed in.
        console.log('State: not logged in')
        this.currentUser = null
      }
      this.$store.commit('changeLoginStatus', user)
    })
    console.log(firebase.auth().currentUser)
  }
}
</script>

<style>

</style>
