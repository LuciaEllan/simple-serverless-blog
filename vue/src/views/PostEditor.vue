<template>
  <div>
    <!-- <div v-if="currentUser != null"> -->
    <div>
      <p>Post title: <input type="text" v-model="title"></p>
      <p><textarea v-model="body"></textarea></p>
      <p>Post tags: <input type="text" v-model="tags"></p>
      <p><button @click="makePost">Post</button></p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      title: '',
      body: '',
      tags: '',
      firestore: firebase.firestore()
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    makePost () {
      if ((this.title.length > 0) && (this.body.length > 0)) {
        this.firestore.collection('posts').add({
          title: this.title,
          body: this.body,
          tags: this.tags.split(','),
          is_public: true,
          // author: this.currentUser.displayName,
          author: 'None',
          date: new Date()
        }).then(docRef => {
          alert(`Document is created with id=${docRef.id}`)
        }).catch(error => {
          alert(`Document is not created because: ${error}`)
        })
      } else {
        alert('Please validate inputs first.')
      }
    }
  }
}
</script>

<style>
input {
  width: 600px;
}

textarea {
  width: 600px;
  height: 320px;
}
</style>
