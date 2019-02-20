<template>
  <div id="q-app">
    <FirebaseAuth />
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseConfig from 'src/configs/firebase-config'
import FirebaseAuth from 'src/components/FirebaseAuth'

export default {
  name: 'App',
  created () {
    firebase.initializeApp(FirebaseConfig)
  },
  components: {
    FirebaseAuth
  }
}
</script>

<style>
</style>
