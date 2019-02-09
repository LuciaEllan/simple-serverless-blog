<template>
  <div class="blog_post round-borders shadow-3">
    <div class="blog_post_title">{{title}}</div>
    <div class="blog_post_date">at {{dateDisplay}}, by {{author}}</div>
    <div class="blog_post_body" v-html="parsedMarkdown"></div>
    <div class="blog_post_tags">Tags: {{tagsDisplay}}</div>
    <div class="blog_post_actions">
      <span v-if="isLoggedIn" style="margin-right: 20px;"><router-link :to="editPostRoute">Edit</router-link></span>
      Permalink: <router-link :to="permalinkRoute">{{permalinkRoute}}</router-link>
    </div>
  </div>
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
    tags: { type: Array, default: Array }
  },
  computed: {
    tagsDisplay () {
      return this.tags.join(', ')
      // return this.tags.reduce((accm, val) => {
      //   if (val.length > 0) {
      //     return `${accm}, ${val}`
      //   } else {
      //     return accm
      //   }
      // }, '')
    },
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
      console.log(this.$store.getters.isWritableUser)
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
