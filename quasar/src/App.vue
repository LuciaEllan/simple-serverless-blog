<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseConfig from './configs/firebase-config'

export default {
  name: 'App',
  created () {
    firebase.initializeApp(FirebaseConfig)
  }
}
</script>

<style>
</style>
