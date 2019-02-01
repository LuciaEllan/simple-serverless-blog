<template>
  <div>
    <SinglePost v-if="hasPost" v-bind="postData"></SinglePost>
    <div v-else-if="isInvalidPost">Post not found!</div>
    <div v-else></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import SinglePost from 'components/SinglePost'

export default {
  name: 'SinglePostPage',
  components: {
    SinglePost
  },
  data () {
    return {
      postData: {},
      firestore: firebase.firestore()
    }
  },
  computed: {
    hasPost () {
      return this.postData !== undefined && this.postData.is_public === true
    },
    isInvalidPost () {
      return this.postData === undefined
    }
  },
  methods: {
    loadPost () {
      const postID = this.$route.params.post_id
      if (postID && (postID.length > 0)) {
        // const docRef = this.firestore.collection('posts').doc(postID)
        // docRef.get().then(post => {
        //   if (post.exists) {
        //     this.postData = Object.assign({ id: post.id }, post.data())
        //     console.log(post.data())
        //   } else {
        //     this.postData = undefined
        //     console.log('post does not exist')
        //   }
        // }).catch(error => {
        //   this.postData = undefined
        //   console.log('error during getting post: ' + error)
        // })

        const query = this.firestore.collection('posts').where(firebase.firestore.FieldPath.documentId(), '==', postID).where('is_public', '==', true)
        query.get().then(result => {
          if (result.empty) {
            this.postData = undefined
            console.log('post does not exist')
          } else {
            this.postData = { id: result.docs[0].id, ...result.docs[0].data() }
            console.log(result.docs[0].data())
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
