import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

export default {
  name: 'PostListing',
  data () {
    return {
      postsData: [],
      lastPostRef: undefined,
      hasMorePosts: false,
      firestore: firebase.firestore(),
      postsPerPagination: 10
    }
  },
  computed: {
    isLoadingPost () {
      return (this.postsData !== undefined) && (this.postsData.length === 0)
    },
    hasPost () {
      return (this.postsData !== undefined) && (this.postsData.length > 0)
    }
  },
  methods: {
    queryList () {
      return Promise.reject('You have to override queryList() method with mixin!')
    },
    loadList () {
      const query = this.queryList()
      query.then(result => {
        this.postsData = this.postsData.concat(result.docs.map((doc, index, docs) => ({ id: doc.id, ...doc.data() })))
        if (result.empty) {
          if (this.postsData.length === 0) {
            this.postsData = undefined
          }
          this.hasMorePosts = false
        } else {
          this.lastPostRef = result.docs[result.docs.length - 1]
          this.hasMorePosts = result.docs.length >= this.postsPerPagination
        }
      }).catch(error => {
        this.postsData = undefined
        this.hasMorePosts = false
        if (error) console.log(error) // just makes linter shut up :X
        this.$q.notify({
          message: `Sorry, cannot find any posts. Did you signed in for sure, right?`,
          position: 'top-right',
          color: 'negative'
        })
      })
    },
    getPostDateDisplay (post) {
      return moment.unix(post.date.seconds).format('YYYY-MM-DD')
    }
  },
  mounted () {
    this.loadList()
  }
}
