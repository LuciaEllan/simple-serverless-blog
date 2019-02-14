<template>
  <q-page>
    <PostItem v-for="post in postsData" :key="post.id" v-bind="post"></PostItem>
    <div>
      <q-btn v-if="hasMorePosts" @click="loadPost">See more posts</q-btn>
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase'
import PostItem from 'components/PostItem'
import BlogConfig from '@/configs/blog-config'

export default {
  name: 'PagedPost',
  components: {
    PostItem
  },
  data () {
    return {
      postsData: [],
      lastPostRef: undefined,
      hasMorePosts: true,
      firestore: firebase.firestore()
    }
  },
  computed: {
    hasPost () {
      return this.postsData !== undefined
    }
  },
  methods: {
    loadPost () {
      let query = this.firestore.collection('posts').orderBy('date', 'desc').limit(BlogConfig.postsPerPage)
      if (this.lastPostRef) {
        query = query.startAfter(this.lastPostRef)
      }
      query = query.where('is_public', '==', true)
      query.get().then(result => {
        this.postsData = this.postsData.concat(result.docs.map((doc, index, docs) => ({ id: doc.id, ...doc.data() })))
        if (result.empty) {
          this.hasMorePosts = false
        } else {
          this.lastPostRef = result.docs[result.docs.length - 1]
          // console.log(this.lastPostRef)
          console.log(this.lastPostRef.id)
        }
        // console.log(result)
      }).catch(error => {
        this.postsData = undefined
        this.hasMorePosts = false
        console.log('error during getting post: ' + error)
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
