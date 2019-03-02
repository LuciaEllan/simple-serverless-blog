<template>
  <div class="q-ma-xs">
    <span class="q-mr-lg text-body1 text-primary">{{ commentData.author }}</span>
    <span class="q-mx-xs text-body1">{{ commentData.body }}</span>
    <span class="q-mx-xs text-caption text-grey">{{ dateDisplay }}</span>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CommentItem',
  props: {
    commentData: Object
  },
  computed: {
    dateDisplay () {
      if (this.commentData.date.seconds) {
        return moment.unix(this.commentData.date.seconds).format('YYYY-MM-DD HH:mm:ss')
      } else if (this.commentData.date instanceof Date) {
        // this is for event-triggered comment
        return moment.unix(this.commentData.date).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return 'Invalid date'
      }
    }
  }
}
</script>

<style>

</style>
