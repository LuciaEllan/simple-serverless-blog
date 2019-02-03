<template>
  <!-- empty div -->
  <div></div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'firebase-auth',
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('State: logged in')
        this.$store.commit('changeLoginStatus', user)
      } else {
        // No user is signed in.
        console.log('State: not logged in')
        this.$store.commit('changeLoginStatus', undefined)
      }
    })
  }
}
</script>

<style>

</style>
