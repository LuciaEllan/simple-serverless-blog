<template>
  <q-page v-if="isLoggedIn" class="q-pa-lg">
    <q-tabs
      v-model="currentTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      @input="updateContentValue"
    >
      <q-tab name="edit" label="Edit" />
      <q-tab name="preview" label="Preview" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab">
      <q-tab-panel name="edit">
        <div class="shadow-2">
          <q-input type="text" class="q-pa-sm" v-model="title" placeholder="Post title" dense borderless filled />
        </div>
        <div class="shadow-2">
          <!-- <q-input type="textarea" class="q-my-md q-pa-sm" ref="body" :value="body" placeholder="Write your post here" rows="20" dense borderless filled /> -->
          <q-input type="textarea" class="q-my-md q-pa-sm" ref="body" :value="body" input-style="line-height: 1.6em;" @change="updateContentValue" placeholder="Write your post here" rows="24" dense borderless />
        </div>
        <div class="shadow-2 row items-center">
          <q-toggle class="q-pa-sm" color="primary" v-model="isPublic" label="Publicize?" keep-color left-label />
          <q-input type="text" class="q-pa-sm" placeholder="Hit ENTER to add tag" v-model="currentTag" dense borderless filled @keyup="onTagInput" />
          <q-chip v-for="tag in tags" :key="tag" class="q-px-sm" color="primary" text-color="white" @remove="onTagRemoved(tag)" removable>{{ tag }}</q-chip>
        </div>
      </q-tab-panel>
      <q-tab-panel name="preview">
        <q-scroll-area style="height: 700px;">
          <div class="blog_post_body" v-html="previewCode"></div>
        </q-scroll-area>
      </q-tab-panel>
    </q-tab-panels>
    <div class="col-12 col-md-10">
      <q-btn @click="makePost">Save this post... maybe?</q-btn>
    </div>
  </q-page>
  <q-page v-else class="flex flex-center">
    <div class="block">If you're a writer of this blog then login first, please?<br/></div>
  </q-page>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      title: '',
      body: '',
      tags: [],
      postID: undefined,
      firestore: firebase.firestore(),
      currentTab: 'edit',
      currentTag: '',
      isPublic: true
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isWritableUser
    },
    previewCode () {
      return this.$marked.process(this.body)
    }
  },
  watch: {
    isLoggedIn () {
      if (this.$route.params.post_id) {
        if (this.isLoggedIn) {
          this.loadPost()
        }
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
    updateContentValue () {
      if (this.$refs.body) {
        const textareaElement = this.$refs.body.$el.getElementsByTagName('textarea')[0]
        this.body = textareaElement.value
      }
    },
    onTagRemoved (t) {
      console.log(t)
      this.tags = this.tags.filter(tag => tag !== t)
    },
    onTagInput (e) {
      if (e.keyCode === 13) {
        if (this.currentTag.length > 0) {
          this.tags.push(this.currentTag)
          this.currentTag = ''
        }
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
          this.isPublic = postData.is_public
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
            is_public: this.isPublic,
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
            is_public: this.isPublic,
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
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/css/blog_post.styl'
</style>

<style lang="stylus">
@import '~@/css/code_highlight.styl'
</style>
