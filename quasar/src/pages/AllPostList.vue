<template>
  <q-page>
    <LoadingSpinner v-if="isLoadingPost" size="4em" />
    <q-card v-else class="q-ma-md">
      <q-card-section class="blog_post_title">
        List of all posts
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
          Ugh, we don't have any posts for this blog yet.
        </div>
      </q-card-section>
    </q-card>
    <q-btn class="q-mx-md q-mb-md" color="primary" v-if="hasMorePosts" @click="loadList">See more posts</q-btn>
  </q-page>
</template>

<script>
import PostListing from 'pages/PostListing'
import LoadingSpinner from 'components/LoadingSpinner'
import BlogConfig from '@/configs/blog-config'

export default {
  name: 'TaggedPostList',
  components: {
    LoadingSpinner
  },
  mixins: [ PostListing ],
  data () {
    return {
      postsPerPagination: BlogConfig.allPostListPerPage
    }
  },
  computed: {
    listTitle () {
      return `Posts tagged <span class="text-italic text-bold">${this.$route.params.tag}</span>`
    }
  },
  methods: {
    queryList () {
      let query = this.firestore.collection('digests').orderBy('date', 'desc').limit(this.postsPerPagination)
      if (this.lastPostRef) {
        query = query.startAfter(this.lastPostRef)
      }
      if (!this.$store.getters.isWritableUser) {
        query = query.where('is_public', '==', true)
      }
      return query.get()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/css/blog_post.styl'
</style>
