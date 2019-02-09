<template>
  <q-layout>
    <q-page-container>
      <q-page v-if="isLoggedIn" class="q-pa-lg">
        <q-tabs style="min-height: 800px;" inverted @select="onTabChange">
          <!-- Tabs - notice slot="title" -->
          <q-tab default slot="title" name="tab-edit" label="Edit" />
          <q-tab slot="title" name="tab-preview" label="Preview" />
          <!-- Targets -->
          <q-tab-pane name="tab-edit">
            <div class="shadow-2">
              <q-input type="text" class="q-my-sm q-pa-sm" v-model="title" placeholder="Post title" hide-underline />
            </div>
            <div class="shadow-2">
              <q-input type="textarea" class="q-my-sm q-pa-sm" ref="body" :value="body" placeholder="Write your post here" max-height="550" rows="20" hide-underline />
            </div>
            <div class="shadow-2">
              <q-chips-input class="q-my-sm q-pa-sm" v-model="tags" placeholder="Tags (Write and hit ENTER to add)" hide-underline />
            </div>
          </q-tab-pane>
          <q-tab-pane name="tab-preview" class="full-width full-height">
            <q-scroll-area style="height: 700px;">
              <div class="blog_post_body" v-html="previewCode"></div>
            </q-scroll-area>
          </q-tab-pane>
        </q-tabs>
        <div class="col-12 col-md-10">
          <q-btn @click="makePost">Save this post... maybe?</q-btn>
        </div>
      </q-page>
      <q-page v-else class="flex flex-center">
        <div class="block">If you're a writer of this blog then login first, please?<br/></div>
        <FirebaseLogin></FirebaseLogin>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import FirebaseLogin from '@/components/FirebaseLogin'
import firebase from 'firebase'

export default {
  data () {
    return {
      title: '',
      body: '',
      tags: [],
      postID: undefined,
      firestore: firebase.firestore()
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isWritableUser
    },
    previewCode () {
      // https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements
      return this.$marked.process(this.body)
    }
  },
  watch: {
    isLoggedIn () {
      if (this.isLoggedIn) {
        this.loadPost()
      }
    }
  },
  mounted () {
    if (this.$route.params.post_id) {
      // read from firebase, and fill in contents for edit
      if (this.isLoggedIn) {
        this.loadPost()
      }
    }
  },
  methods: {
    onTabChange (t) {
      if (this.$refs.body) {
        this.updateContentValue()
      }
    },
    updateContentValue () {
      if (this.$refs.body) {
        this.body = this.$refs.body.model
      }
    },
    loadPost () {
      const docRef = this.firestore.collection('posts').doc(this.$route.params.post_id)
      docRef.get().then(post => {
        if (post.exists) {
          // assign data
          this.postID = post.id
          const postData = post.data()
          this.title = postData.title
          this.body = postData.body
          this.tags = postData.tags
          // console.log(post.data())
        } else {
          console.log(post)
          // does nothing if document does not exist, so this *edit* will make a new post
          this.$q.notify({
            message: `Target post is not found.`,
            position: 'bottom-left',
            type: 'warning'
          })
        }
      }).catch(error => {
        console.log(error)
        this.$q.notify({
          message: `Post is not loaded because: ${error}`,
          position: 'bottom-left',
          type: 'negative'
        })
      })
    },
    makePost () {
      this.updateContentValue()
      if ((this.title.length > 0) && (this.body.length > 0)) {
        if (this.postID) {
          this.firestore.collection('posts').doc(this.postID).set({
            title: this.title,
            body: this.body,
            tags: this.tags,
            last_update: new Date()
          }, { merge: true }).then(() => {
            this.$router.push(`/post/${this.postID}`, () => {
              this.$q.notify({
                message: `Successfully edited!`,
                position: 'bottom-left',
                type: 'positive'
              })
            })
          }).catch(error => {
            this.$q.notify({
              message: `Post is not edited because: ${error}`,
              position: 'bottom-left',
              type: 'negative'
            })
          })
        } else {
          this.firestore.collection('posts').add({
            title: this.title,
            body: this.body,
            tags: this.tags,
            is_public: true,
            author: this.$store.state.currentUser.displayName,
            author_id: this.$store.state.currentUser.uid,
            date: new Date(),
            last_update: new Date()
          }).then(docRef => {
            this.$router.push(`/post/${docRef.id}`, () => {
              this.$q.notify({
                message: `Successfully posted!`,
                position: 'bottom-left',
                type: 'positive'
              })
            })
          }).catch(error => {
            this.$q.notify({
              message: `Post is not created because: ${error}`,
              position: 'bottom-left',
              type: 'negative'
            })
          })
        }
      } else {
        this.$q.notify({
          message: `Make sure to fill in a title and some content.`,
          position: 'bottom-left',
          type: 'warning'
        })
      }
    }
  },
  components: {
    FirebaseLogin
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/css/blog_post.styl'
</style>

<style lang="stylus">
@import '~@/css/code_highlight.styl'
</style>
