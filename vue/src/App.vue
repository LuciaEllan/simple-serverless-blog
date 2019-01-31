<template>
  <div id="app">
    <FirebaseAuth></FirebaseAuth>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/edit">Post Add Test</router-link> |
      <router-link to="/post/RAiS13Ksn0pXs0eFGw06">Post View Test</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import firebase from 'firebase'
import firebaseConfig from '@/configs/firebase-config'

import FirebaseAuth from '@/components/FirebaseAuth'

export default {
  name: 'app',
  components: {
    FirebaseAuth
  },
  created () {
    firebase.initializeApp(firebaseConfig)
  }
}
</script>
