import { QUploaderBase } from 'quasar'
import firebase from 'firebase'

export default {
  name: 'FirebaseUploader',
  props: {
    pathPrefix: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      storage: firebase.storage().ref(),
      activeTasks: []
    }
  },
  mixins: [ QUploaderBase ],
  computed: {
    isIdle () {
      return this.activeTasks.length === 0
    },
    isUploading () {
      return this.activeTasks.length > 0
    }
  },
  methods: {
    abort () {
      this.activeTasks.forEach(task => {
        task.cancel()
      })
      this.activeTasks = []
    },
    upload () {
      if (this.disable || !this.queuedFiles.length) { return }
      this.queuedFiles.forEach(file => {
        this.__uploadSingleFile(file)
      })
    },
    __uploadSingleFile (file) {
      let pathPrefix = this.pathPrefix || ''
      const fileRef = this.storage.child(pathPrefix + file.name)
      this.__updateFile(file, 'uploading', 0)
      const uploadTask = fileRef.put(file)
      this.activeTasks.push(uploadTask)
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          if (file.__status !== 'failed') {
            const loaded = Math.min(snapshot.totalBytes, snapshot.bytesTransferred)
            this.uploadedSize += loaded - file.__uploaded
            this.__updateFile(file, 'uploading', loaded)
          }
        }, error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          this.queuedFiles.push(file)
          this.__updateFile(file, 'failed')
          this.__emit('failed', { file, error })
          this.uploadedSize -= file.__uploaded
          this.activeTasks = this.activeTasks.filter(t => t !== uploadTask)
        }, () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            const fullPath = uploadTask.snapshot.ref.fullPath
            const fileName = uploadTask.snapshot.ref.name
            this.uploadedFiles.push(file)
            this.__updateFile(file, 'uploaded')
            this.__emit('uploaded', { file, downloadURL, fullPath, fileName })
            this.uploadedSize += file.size - file.__uploaded
          }).catch(error => {
            this.__emit('failed', { file, error })
          })
          this.activeTasks = this.activeTasks.filter(t => t !== uploadTask)
        }
      )
    }
  }
}
