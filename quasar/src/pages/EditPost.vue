<template>
  <q-page v-if="isLoggedIn" class="q-pa-md column full-height">
    <div class="col-auto row justify-between items-end">
      <div class="col-auto">
        <q-tabs v-model="currentTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="left" @input="updateContentValue">
          <q-tab name="edit" label="Edit" />
          <q-tab name="preview" label="Preview" />
        </q-tabs>
      </div>
      <div class="col-auto q-gutter-sm">
        <q-btn class="q-pa-sm" color="primary" icon="attach_file" @click="invokeFileScreen" />
        <q-btn class="q-pa-sm" color="primary" icon="cloud_upload" @click="makePost" />
      </div>
    </div>
    <q-tab-panels class="col" v-model="currentTab">
      <!-- post edit texts -->
      <q-tab-panel name="edit" class="q-gutter-sm column full-height">
        <div class="shadow-2 col-auto">
          <q-input type="text" class="q-pa-xs" v-model="title" placeholder="Post title" dense borderless filled />
        </div>
        <div class="shadow-2 col">
          <q-input type="textarea" class="q-pa-xs full-height full-height-children" ref="body" :value="body" input-style="line-height: 1.6em; height: 100%;" filled @change="updateContentValue" placeholder="Write your post here" dense borderless />
        </div>
        <div class="shadow-2 col-auto row">
          <q-toggle class="col-auto q-pa-xs" color="primary" v-model="isPublic" label="Publicize?" keep-color left-label />
          <q-input type="text" class="col-auto q-pa-xs" placeholder="Hit ENTER to add tag" v-model="currentTag" dense borderless filled @keyup="onTagInput" />
          <div class="col self-center">
            <q-chip v-for="tag in tags" :key="tag" class="q-px-sm" color="primary" text-color="white" @remove="onTagRemoved(tag)" removable>{{ tag }}</q-chip>
          </div>
        </div>
      </q-tab-panel>
      <!-- post previewer -->
      <q-tab-panel name="preview" class="full-height">
        <q-scroll-area class="full-height">
          <div class="blog_post_body" v-html="previewCode"></div>
        </q-scroll-area>
      </q-tab-panel>
    </q-tab-panels>
    <!-- file uploader diablog -->
    <q-dialog v-model="filesScreen" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Attachments</div>
        </q-card-section>
        <q-card-section>
          <q-tabs v-model="filesdTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="left">
            <q-tab name="upload" label="Upload" />
            <q-tab name="files" label="Files" />
          </q-tabs>
          <q-tab-panels v-model="filesdTab">
            <!-- local file uploader -->
            <q-tab-panel name="upload" class="q-gutter-sm column full-height">
              <FirebaseUploader v-if="isEditMode" :pathPrefix="filePathPrefix" @uploaded="onFileUploaded" />
              <div v-else>Please save the post first. Once you save it, you'll be able to upload files to this post.</div>
            </q-tab-panel>
            <!-- file listing -->
            <q-tab-panel name="files" class="full-height">
              <q-list bordered>
                <q-item v-for="file in files" :key="file.name">
                  <q-item-section>{{ file.name }}</q-item-section>
                  <q-item-section side>
                    <q-btn icon="attachment" @click="onCopyRequested(file, false)" />
                  </q-item-section>
                  <q-item-section side>
                    <q-btn icon="add_photo_alternate" @click="onCopyRequested(file, true)"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-dialog />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
  <q-page v-else class="flex flex-center">
    <div class="block">If you're a writer of this blog then login first, please?<br/></div>
  </q-page>
</template>

<script>
import firebase from 'firebase'
import FirebaseUploader from 'components/FirebaseUploader'

export default {
  data () {
    return {
      title: '',
      body: '',
      tags: [],
      postID: undefined,
      files: [],
      isPublic: true,
      firestore: firebase.firestore(),
      currentTab: 'edit',
      currentTag: '',
      filesScreen: false,
      filesdTab: 'upload'
    }
  },
  components: {
    FirebaseUploader
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isWritableUser
    },
    previewCode () {
      return this.$marked.process(this.body)
    },
    isEditMode () {
      return this.postID !== undefined
    },
    filePathPrefix () {
      return `public/${this.postID}/`
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
    invokeFileScreen () {
      this.filesScreen = true
    },
    onFileUploaded (payload) {
      if (!this.files.some(file => {
        if (file.name === payload.fileName) {
          file.url = payload.downloadURL
          return true
        }
        return false
      })) {
        this.files.push({
          name: payload.fileName,
          url: payload.downloadURL
        })
      }
    },
    onCopyRequested (file, asImage = false) {
      const code = `${asImage ? '!' : ''}[${file.name}](${file.url})`
      navigator.clipboard.writeText(code).then(() => {
        this.$q.notify({
          message: 'Copied to clipboard.',
          position: 'top-right',
          color: 'positive'
        })
      }).catch(() => {
        this.$q.notify({
          message: `Failed to copy data. URL is: ${file.url}`,
          position: 'top-right',
          color: 'negative'
        })
      })
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
          this.files = postData.files || []
          this.isPublic = postData.is_public
          // console.log(post.data())
        } else {
          // does nothing if document does not exist, so this *edit* will make a new post
          this.$q.notify({
            message: `Target post is not found.`,
            position: 'top-right',
            type: 'warning'
          })
        }
      }).catch(error => {
        this.$q.notify({
          message: `Post is not loaded because: ${error}`,
          position: 'top-right',
          color: 'negative'
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
            files: this.files,
            is_public: this.isPublic,
            last_update: new Date()
          }, { merge: true }).then(() => {
            this.$router.push(`/post/${this.postID}`, () => {
              this.$q.notify({
                message: `Successfully edited!`,
                position: 'top-right',
                color: 'positive'
              })
            })
          }).catch(error => {
            this.$q.notify({
              message: `Post is not edited because: ${error}`,
              position: 'top-right',
              color: 'negative'
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
                position: 'top-right',
                color: 'positive'
              })
            })
          }).catch(error => {
            this.$q.notify({
              message: `Post is not created because: ${error}`,
              position: 'top-right',
              color: 'negative'
            })
          })
        }
      } else {
        this.$q.notify({
          message: `Make sure to fill in a title and some content.`,
          position: 'top-right',
          color: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/css/blog_post.styl'

.full-height-children >>> div
  height: 100%
</style>

<style lang="stylus">
@import '~@/css/code_highlight.styl'
</style>
