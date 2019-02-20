<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="blog_post_title">
        {{ title }}
        <q-icon v-if="!is_public" name="lock" color="accent"/>
      </div>
      <div class="blog_post_date">at {{ dateDisplay }}, by {{ author }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section class="blog_post_body" v-html="parsedMarkdown"></q-card-section>
    <q-separator inset />
    <q-card-section class="row justify-between">
      <div class="col blog_post_tags">
        Tags:
        <span v-for="tag in tags" :key="tag" class="q-mx-xs">
          <router-link :to="`/tag/${tag}`">{{ tag }}</router-link>
        </span>
      </div>
      <div class="col text-right blog_post_actions">
        <span v-if="isLoggedIn" class="q-mr-md"><router-link :to="editPostRoute">Edit</router-link></span>
        <router-link :to="permalinkRoute">Permalink</router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PostItem',
  props: {
    title: { type: String, default: '' },
    author: { type: String, default: '' },
    authorid: { type: String, default: '' },
    date: { type: [String, Date, Object], default: '' },
    id: { type: String, default: '' },
    body: { type: String, default: '' },
    tags: { type: Array, default: Array },
    is_public: { type: Boolean, default: true }
  },
  computed: {
    dateDisplay () {
      return moment.unix(this.date.seconds).format('YYYY-MM-DD HH:mm:ss')
    },
    parsedMarkdown () {
      return this.$marked.process(this.body)
    },
    permalinkRoute () {
      return `/post/${this.id}`
    },
    editPostRoute () {
      return `/edit/${this.id}`
    },
    isLoggedIn () {
      return this.$store.getters.isWritableUser
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/css/blog_post.styl'
</style>

<style lang="stylus">
@import '~@/css/code_highlight.styl'
</style>
