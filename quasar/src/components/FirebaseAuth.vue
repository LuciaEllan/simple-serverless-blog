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
        console.log('State: logged in')
        firebase.auth().currentUser.getIdTokenResult().then(tokenResult => {
          console.log('is_admin: ', tokenResult.claims.is_admin)
          this.$store.commit('changeAdminStatus', tokenResult.claims.is_admin === true)
        })
        this.$store.commit('changeLoginStatus', user)
      } else {
        // No user is signed in.
        console.log('State: not logged in')
        this.$store.commit('changeLoginStatus', undefined)
        this.$store.commit('changeAdminStatus', false)
      }
    })
  }
}
</script>

<style>

</style>
