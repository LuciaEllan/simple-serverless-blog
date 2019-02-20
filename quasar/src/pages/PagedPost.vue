<template>
  <q-page>
    <LoadingSpinner v-if="isLoadingPost" size="4em" />
    <div v-else>
      <PostItem v-for="post in postsData" :key="post.id" v-bind="post"></PostItem>
      <q-btn class="q-mx-md q-mb-md" color="primary" v-if="hasMorePosts" @click="loadPost">See more posts</q-btn>
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import PostItem from 'components/PostItem'
import LoadingSpinner from 'components/LoadingSpinner'
import BlogConfig from '@/configs/blog-config'

export default {
  name: 'PagedPost',
  components: {
    PostItem,
    LoadingSpinner
  },
  data () {
    return {
      postsData: [],
      lastPostRef: undefined,
      hasMorePosts: false,
      firestore: firebase.firestore()
    }
  },
  computed: {
    isLoadingPost () {
      return (this.postsData !== undefined) && (this.postsData.length === 0)
    }
  },
  methods: {
    loadPost () {
      let query = this.firestore.collection('posts').orderBy('date', 'desc').limit(BlogConfig.postsPerPage)
      if (this.lastPostRef) {
        query = query.startAfter(this.lastPostRef)
      }
      if (!this.$store.getters.isWritableUser) {
        query = query.where('is_public', '==', true)
      }
      query.get().then(result => {
        this.postsData = this.postsData.concat(result.docs.map((doc, index, docs) => ({ id: doc.id, ...doc.data() })))
        if (result.empty) {
          this.hasMorePosts = false
        } else {
          this.lastPostRef = result.docs[result.docs.length - 1]
          this.hasMorePosts = result.docs.length >= BlogConfig.postsPerPage
        }
      }).catch(error => {
        this.postsData = undefined
        this.hasMorePosts = false
        if (!error) console.log(error) // just makes linter shut up :X
        this.$q.notify({
          message: `Sorry, cannot find any posts. Did you signed in for sure, right?`,
          position: 'top-right',
          color: 'negative'
        })
      })
    }
  },
  mounted () {
    this.loadPost()
  }
}
</script>

<style>
</style>
