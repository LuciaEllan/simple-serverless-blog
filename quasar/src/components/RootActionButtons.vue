<template>
  <div class="fixed-bottom-right q-mx-sm q-my-xl">
    <q-btn class="q-ma-sm" round size="md" color="primary" icon="fas fa-sign-in-alt" @click="login" v-if="isLoggedOut"></q-btn>
    <q-btn class="q-ma-xs" round size="md" color="primary" icon="create" to="/edit" v-if="isWritable" />
    <q-btn class="q-ma-xs" round size="md" color="primary" icon="fas fa-sign-out-alt" @click="logout" v-if="isLoggedIn" />
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'RootActionButtons',
  data () {
    return {
      googleAuth: new firebase.auth.GoogleAuthProvider()
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.currentUser != null
    },
    isLoggedOut () {
      return this.$store.state.currentUser == null
    },
    isNotEditScreen () {
      return this.$route.fullPath.substr(0, 5) !== '/edit'
    },
    isWritable () {
      return this.$store.getters.isWritableUser && this.$route.fullPath.substr(0, 5) !== '/edit'
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
  }
}
</script>

<style>

</style>
