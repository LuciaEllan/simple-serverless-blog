<template>
  <div>
    <div v-if="isSmallScreen">
      <div class="row q-gutter-md justify-between items-start">
        <q-input type="text" class="q-pa-xs col-auto" v-model="name" placeholder="Your Name?" :maxlength="32" dense borderless filled />
        <q-btn class="q-pa-sm col-auto" color="primary" icon="cloud_upload" @click="makeComment" />
      </div>
      <div class="row q-gutter-md justify-between items-start">
        <q-input type="textarea" class="q-pa-xs col" v-model="content" placeholder="Write your comment here..." :maxlength="4096" autogrow dense borderless filled />
      </div>
    </div>
    <div v-else class="row q-gutter-md justify-between items-start">
      <q-input type="text" class="q-pa-xs col-auto" v-model="name" placeholder="Your Name?" :maxlength="32" dense borderless filled />
      <q-input type="textarea" class="q-pa-xs col" v-model="content" placeholder="Write your comment here..." :maxlength="4096" autogrow dense borderless filled />
      <q-btn class="q-pa-sm col-auto" color="primary" icon="cloud_upload" @click="makeComment" />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'CommentWriter',
  props: {
    postId: String
  },
  data () {
    return {
      firestore: firebase.firestore(),
      name: '',
      content: ''
    }
  },
  computed: {
    isSmallScreen () {
      return this.$q.screen.lt.md
    }
  },
  methods: {
    validateContent () {
      return this.name.length > 0 && this.content.length > 0
    },
    makeComment () {
      if (this.validateContent()) {
        if (this.postId) {
          const commentData = {
            author: this.name,
            body: this.content,
            post_id: this.postId,
            date: new Date()
          }
          this.firestore.collection('comments').add(commentData).then(docRef => {
            this.$q.notify({
              message: 'Comment is added!',
              position: 'top-right',
              color: 'positive'
            })
            this.content = ''
            this.$emit('created', { ...commentData, id: docRef.id })
            // TODO: emit an event to refresh comments
          }).catch(error => {
            this.$q.notify({
              message: `Comment is not created because: ${error}`,
              position: 'top-right',
              color: 'negative'
            })
          })
        } else {
          this.$q.notify({
            message: 'Cannot attach this comment to any post.',
            position: 'top-right',
            color: 'warning'
          })
        }
      } else {
        this.$q.notify({
          message: 'Make sure to fill in your name and some message to comment.',
          position: 'top-right',
          color: 'warning'
        })
      }
    }
  }
}
</script>

<style>

</style>
