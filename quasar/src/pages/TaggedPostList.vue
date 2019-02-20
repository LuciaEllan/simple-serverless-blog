<template>
  <q-page>
    <LoadingSpinner v-if="isLoadingPost" size="4em" />
    <q-card v-else class="q-ma-md">
      <q-card-section class="blog_post_title">
        Posts tagged <span class="text-italic text-bold">{{ this.$route.params.tag }}</span>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <template v-if="hasPost">
          <div v-for="post in postsData" :key="post.id" class="blog_post_body">
            <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
            <q-icon v-if="!post.is_public" name="lock" color="accent" class="q-ml-xs" />
            <span class="text-caption text-grey q-mx-md">{{ getPostDateDisplay(post) }}</span>
          </div>
        </template>
        <div v-else>
          Ugh, we don't have any posts for this tag.
        </div>
      </q-card-section>
    </q-card>
    <q-btn class="q-mx-md q-mb-md" color="primary" v-if="hasMorePosts" @click="loadList">See more posts</q-btn>
  </q-page>
</template>

<script>
import firebase from 'firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import BlogConfig from '@/configs/blog-config'
import moment from 'moment'

export default {
  name: 'TaggedPostList',
  components: {
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
    },
    hasPost () {
      return (this.postsData !== undefined) && (this.postsData.length > 0)
    }
  },
  methods: {
    loadList () {
      const tag = this.$route.params.tag
      let query = this.firestore.collection('digests').orderBy('date', 'desc').limit(BlogConfig.taggedPostListPerPage)
      if (this.lastPostRef) {
        query = query.startAfter(this.lastPostRef)
      }
      if (!this.$store.getters.isWritableUser) {
        query = query.where('is_public', '==', true)
      }
      query = query.where('tags', 'array-contains', tag)
      query.get().then(result => {
        this.postsData = this.postsData.concat(result.docs.map((doc, index, docs) => ({ id: doc.id, ...doc.data() })))
        if (result.empty) {
          if (this.postsData.length === 0) {
            this.postsData = undefined
          }
          this.hasMorePosts = false
        } else {
          this.lastPostRef = result.docs[result.docs.length - 1]
          this.hasMorePosts = result.docs.length >= BlogConfig.taggedPostListPerPage
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
