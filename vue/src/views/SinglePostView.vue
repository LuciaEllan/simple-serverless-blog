<template>
  <div>
    <SinglePost v-bind="postData"></SinglePost>
  </div>
</template>

<script>
import firebase from 'firebase'
import SinglePost from '@/components/SinglePost'

export default {
  name: 'SinglePostView',
  components: {
    SinglePost
  },
  data () {
    return {
      postData: {},
      firestore: firebase.firestore()
    }
  },
  methods: {
    loadPost () {
      const postID = this.$route.params.id
      if (postID && (postID.length > 0)) {
        const docRef = this.firestore.collection('posts').doc(postID)
        docRef.get().then(post => {
          if (post.exists) {
            this.postData = post.data()
            console.log(post.data())
          } else {
            console.log('post does not exist')
          }
        }).catch(error => {
          console.log('error during getting post: ' + error)
        })
      }
    }
  },
  mounted () {
    this.loadPost()
  }
}
</script>

<style>

</style>
