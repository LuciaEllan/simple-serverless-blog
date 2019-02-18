<template>
  <q-page>
    <q-card class="q-ma-md">
      <q-card-section class="blog_post_title">
        Posts tagged <span class="text-italic text-bold">{{ this.$route.params.tag }}</span>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div v-for="post in postsData" :key="post.id" class="blog_post_body">
          <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
          <span class="text-caption q-mx-sm" style="color: #777;">{{ getPostDateDisplay(post) }}</span>
        </div>
      </q-card-section>
    </q-card>
    <div>
      <q-btn v-if="hasMorePosts" @click="loadPost">See more posts</q-btn>
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase'
import BlogConfig from '@/configs/blog-config'
import moment from 'moment'

export default {
  name: 'TaggedPostList',
  data () {
    return {
      postsData: [],
      lastPostRef: undefined,
      hasMorePosts: false,
      firestore: firebase.firestore()
    }
  },
  methods: {
    loadList () {
      const tag = this.$route.params.tag
      let query = this.firestore.collection('digests').orderBy('date', 'desc').limit(BlogConfig.taggedPostListPerPage)
      if (this.lastPostRef) {
        query = query.startAfter(this.lastPostRef)
      }
      query = query.where('is_public', '==', true).where('tags', 'array-contains', tag)
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
    },
    getPostDateDisplay (post) {
      return moment.unix(post.date.seconds).format('YYYY-MM-DD')
    }
  },
  mounted () {
    this.loadList()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/css/blog_post.styl'
</style>
