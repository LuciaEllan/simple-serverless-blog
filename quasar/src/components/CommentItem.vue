<template>
  <div class="q-ma-xs">
    <span class="q-mr-lg text-body1 text-primary">{{ commentData.id }}</span>
    <span class="q-mr-lg text-body1 text-primary">{{ commentData.author }}</span>
    <span class="q-mx-xs text-body1">{{ commentData.body }}</span>
    <span class="q-mx-xs text-caption text-grey">{{ dateDisplay }}</span>
    <a v-if="isLoggedIn" class="q-mx-md text-caption" @click="deleteComment">Remove</a>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

export default {
  name: 'CommentItem',
  props: {
    commentData: Object
  },
  data () {
    return {
      firestore: firebase.firestore()
    }
  },
  computed: {
    dateDisplay () {
      if (this.commentData.date.seconds) {
        return moment.unix(this.commentData.date.seconds).format('YYYY-MM-DD HH:mm:ss')
      } else if (this.commentData.date instanceof Date) {
        // this is for event-triggered comment
        return moment(this.commentData.date).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return 'Invalid date'
      }
    },
    isLoggedIn () {
      return this.$store.getters.isWritableUser
    }
  },
  methods: {
    deleteComment () {
      this.$q.dialog({
        title: 'Really remove this comment?',
        message: 'You cannot restore it once it is deleted. Remove the comment anyway?',
        ok: {
          color: 'negative'
        },
        cancel: {
          color: 'primary'
        }
      }).onOk(() => {
        this.firestore.collection('comments').doc(this.commentData.id).delete().then(() => {
          this.$q.notify({
            message: `Comment is removed!`,
            position: 'top-right',
            color: 'positive'
          })
          this.$emit('removed', this.commentData)
          // TODO: emit an event to refresh comments
        }).catch(error => {
          this.$q.notify({
            message: `Comment is not removed because: ${error}`,
            position: 'top-right',
            color: 'negative'
          })
        })
      })
    }
  }
}
</script>

<style>

</style>
