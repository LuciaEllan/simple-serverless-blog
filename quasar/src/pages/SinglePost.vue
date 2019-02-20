<template>
  <q-page>
    <PostItem v-if="hasPost" v-bind="postData"></PostItem>
    <LoadingSpinner v-else size="4em" />
  </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
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
            this.$q.notify({
              message: `Sorry, cannot find the post. Pleasse check if your address bar is OK.`,
              position: 'top-right',
              color: 'negative'
            })
          }
        }).catch(error => {
          this.postData = undefined
          if (!error) console.log(error) // just makes linter shut up :X
          this.$q.notify({
            message: `Sorry, cannot find the post. Did you signed in for sure, right?`,
            position: 'top-right',
            color: 'negative'
          })
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
