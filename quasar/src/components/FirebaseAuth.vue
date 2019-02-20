<template>
  <!-- empty div -->
  <div></div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'firebase-auth',
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        firebase.auth().currentUser.getIdTokenResult().then(tokenResult => {
          this.$store.commit('changeAdminStatus', tokenResult.claims.is_admin === true)
        })
        this.$store.commit('changeLoginStatus', user)
      } else {
        // No user is signed in.
        this.$store.commit('changeLoginStatus', undefined)
        this.$store.commit('changeAdminStatus', false)
      }
    })
  }
}
</script>

<style>

</style>
