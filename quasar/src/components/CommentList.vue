<template>
  <div>
    <CommentWriter :post-id="postId" @created="onCommentAdded" />
    <template v-if="comments === undefined">
      <div>
        Sorry, couldn't get comments for this post.
      </div>
    </template>
    <template v-else>
      <CommentItem v-for="comment in comments" :key="comment.id" :comment-data="comment" @removed="onCommentRemoved" />
    </template>
  </div>
</template>

<script>
import CommentWriter from 'components/CommentWriter'
import CommentItem from 'components/CommentItem'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'CommentList',
  components: {
    CommentWriter,
    CommentItem
  },
  props: {
    postId: String
  },
  data () {
    return {
      firestore: firebase.firestore(),
      comments: []
    }
  },
  methods: {
    loadComment () {
      if (this.postId) {
        const query = this.firestore.collection('comments').orderBy('date', 'asc').where('post_id', '==', this.postId)
        query.get().then(result => {
          this.comments = result.docs.map((doc, index, docs) => ({ id: doc.id, ...doc.data() }))
        }).catch(error => {
          this.comments = undefined
          if (!error) console.log(error) // just makes linter shut up :X
        })
      }
    },
    onCommentAdded (commentData) {
      this.comments.push(commentData)
      console.log(commentData)
    },
    onCommentRemoved (commentData) {
      this.comments = this.comments.filter(c => c.id !== commentData.id)
    }
  },
  mounted () {
    this.loadComment()
  }
}
</script>

<style>

</style>
