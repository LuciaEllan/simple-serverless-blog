<template>
  <div>
    <h1>{{title}}</h1>
    <h6>at {{dateDisplay}}, by {{author}}</h6>
    <div v-html="parsedMarkdown"></div>
    <h6>Tags: {{tagsDisplay}}</h6>
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
      return this.tags.reduce((accm, val) => {
        if (val.length > 0) {
          return `${accm}, ${val}`
        } else {
          return accm
        }
      }, '')
    },
    dateDisplay () {
      return moment.unix(this.date.seconds).format('YYYY-MM-DD hh:mm:ss')
    },
    parsedMarkdown () {
      return marked(this.body)
    }
  }
}
</script>

<style>

</style>
