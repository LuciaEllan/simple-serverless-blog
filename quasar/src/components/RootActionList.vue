<template>
  <q-list no-border>
    <q-item clickable v-if="isLoggedOut" @click="login">
      <q-item-section avatar>
        <q-icon name="fas fa-sign-in-alt" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Sign in</q-item-label>
        <q-item-label caption>If you're a maintainer</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-if="isWritable" to="/edit">
      <q-item-section avatar>
        <q-icon name="create" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Write a new post</q-item-label>
        <q-item-label caption>Create new contents</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-if="isLoggedIn" @click="logout">
      <q-item-section avatar>
        <q-icon name="fas fa-sign-in-alt" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Sign out</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'RootActionList',
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
      // will not care about this promise, as firebase.auth().onAuthStateChanged in FirebaseAuth will handle the change
      firebase.auth().signInWithPopup(this.googleAuth)
    },
    logout () {
      if (this.isNotEditScreen) {
        firebase.auth().signOut().then(() => {
          console.log('Successfully signed out')
        })
      } else {
        this.$q.dialog({
          title: 'You\'re editing a post!',
          message: 'You\'ll lose any unsaved modification if you sign out now.',
          ok: {
            color: 'negative'
          },
          cancel: {
            color: 'primary'
          }
        }).onOk(() => {
          firebase.auth().signOut().then(() => {
            console.log('Successfully signed out')
          })
        })
      }
    }
  }
}
</script>

<style>

</style>
