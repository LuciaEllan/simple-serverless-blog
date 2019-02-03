<template>
  <div class="blog_post">
    <div class="q-display-3">{{title}}</div>
    <div class="q-body-1">at {{dateDisplay}}, by {{author}}</div>
    <div class="blog_post_body" v-html="parsedMarkdown"></div>
    <div class="q-body-1">Tags: {{tagsDisplay}}</div>
    <div class="q-body-1">
      <span v-if="isLoggedIn" style="margin-right: 20px;"><router-link :to="editPostRoute">Edit</router-link></span>
      Permalink: <router-link :to="permalinkRoute">{{permalinkRoute}}</router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import marked from 'marked'

export default {
  name: 'SinglePost',
  props: {
    title: {
      type: String,
      default: 'Post title'
    },
    author: {
      type: String,
      default: 'Some kind guy'
    },
    authorid: {
      type: String,
      default: ''
    },
    date: {
      type: [String, Date, Object],
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: 'Some random Lorem Ipsum thing'
    },
    tags: {
      type: Array,
      default: Array
    }
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
      return marked(this.body)
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

<style>
@import '~@/css/blog_post.css';
</style>
