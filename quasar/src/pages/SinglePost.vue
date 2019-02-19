<template>
  <q-page>
    <PostItem v-if="hasPost" v-bind="postData"></PostItem>
    <div v-else-if="isInvalidPost">Post not found!</div>
    <LoadingSpinner v-else size="4em" />
  </q-page>
</template>

<script>
import firebase from 'firebase'
import PostItem from 'components/PostItem'
import LoadingSpinner from 'components/LoadingSpinner'

export default {
  name: 'SinglePost',
  components: {
    PostItem,
    LoadingSpinner
  },
  data () {
    return {
      postData: {},
      firestore: firebase.firestore()
    }
  },
  computed: {
    hasPost () {
      return this.postData !== undefined && this.postData.id
    },
    isInvalidPost () {
      return this.postData === undefined
    }
  },
  methods: {
    loadPost () {
      const postID = this.$route.params.post_id
      if (postID && (postID.length > 0)) {
        const docRef = this.firestore.collection('posts').doc(postID)
        docRef.get().then(post => {
          if (post.exists) {
            this.postData = { id: post.id, ...post.data() }
            // console.log(post.data())
          } else {
            this.postData = undefined
            console.log('post does not exist')
          }
        }).catch(error => {
          this.postData = undefined
          console.log('error during getting post: ' + error)
        })
      } else {
        // invalid post id specified
        this.postData = undefined
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
