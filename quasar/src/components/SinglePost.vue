<template>
  <div class="blog_post">
    <div class="q-display-3">{{title}}</div>
    <div class="q-body-1">at {{dateDisplay}}, by {{author}}</div>
    <div class="blog_post_body" v-html="parsedMarkdown"></div>
    <div class="q-body-1">Tags: {{tagsDisplay}}</div>
    <div class="q-body-1">Permalink: <router-link :to="permalinkRoute">{{permalinkRoute}}</router-link></div>
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
    }
  }
}
</script>

<style>
.blog_post {
  padding: 10px;
  margin: 30px 10px;
  border: 1px solid #cccccc;
}
.blog_post_body h1 {
  font-size: 56px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.04em;
  margin: 0.3em 0;
}
.blog_post_body h2 {
  font-size: 44px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.04em;
  margin: 0.3em 0;
}
.blog_post_body h3 {
  font-size: 38px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.04em;
  margin: 0.3em 0;
}
.blog_post_body h4 {
  font-size: 30px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.04em;
  margin: 0.3em 0;
}
.blog_post_body h5 {
  font-size: 24px;
  font-weight: 450;
  line-height: 1.2;
  letter-spacing: -0.04em;
  margin: 0.3em 0;
}
.blog_post_body h6 {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.04em;
  margin: 0.3em 0;
}
.blog_post_body h7 {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.04em;
  margin: 0.3em 0;
}
</style>
