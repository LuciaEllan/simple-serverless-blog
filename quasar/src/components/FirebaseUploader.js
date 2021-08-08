import { computed } from 'vue'
import { createUploaderComponent } from 'quasar'
import firebase from 'firebase/app'
import 'firebase/storage'

const props = {
  pathPrefix: {
    type: String,
    default: ''
  }
}

const emits = ['uploaded', 'failed', 'uploading']

function injectPlugin ({ props, emit, helpers }) {
  // can call any other composables here
  // as this function will run in the component's setup()
  const storage = firebase.storage().ref()
  let activeTasks = []

  // [ REQUIRED! ]
  // We're working on uploading files
  const isUploading = computed(() => {
    return activeTasks.length > 0
  })

  // [ optional ]
  // Shows overlay on top of the
  // uploader signaling it's waiting
  // on something (blocks all controls)
  const isBusy = computed(() => {
    return isUploading
  })

  // [ REQUIRED! ]
  // Abort and clean up any process
  // that is in progress
  function abort () {
    activeTasks.forEach(task => {
      task.cancel()
    })
    activeTasks = []
  }

  // [ REQUIRED! ]
  // Start the uploading process
  function upload () {
    const queue = helpers.queuedFiles.value.slice(0)
    if (queue.length > 0) {
      queue.forEach(file => {
        uploadSingleFile(file)
      })
    }
    helpers.queuedFiles.value = []
  }

  function uploadSingleFile (file) {
    const pathPrefix = props.pathPrefix || ''
    const fileRef = storage.child(pathPrefix + file.name)
    helpers.updateFileStatus(file, 'uploading', 0)
    const uploadTask = fileRef.put(file)
    activeTasks.push(uploadTask)
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        if (file.__status !== 'failed') {
          const loaded = Math.min(snapshot.totalBytes, snapshot.bytesTransferred)
          helpers.updateFileStatus(file, 'uploading', loaded)
        }
      }, error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        this.__updateFile(file, 'failed')
        this.$emit('failed', { file, error })
        this.uploadedSize -= file.__uploaded
        this.activeTasks = this.activeTasks.filter(t => t !== uploadTask)
      }, () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const fullPath = uploadTask.snapshot.ref.fullPath
          const fileName = uploadTask.snapshot.ref.name
          helpers.updateFileStatus(file, 'uploaded')
          emit('uploaded', { file, downloadURL, fullPath, fileName })
        }).catch(error => {
          helpers.queuedFiles.valuepush(file)
          helpers.updateFileStatus(file, 'failed')
          emit('failed', { file, error })
        })
        activeTasks = activeTasks.filter(t => t !== uploadTask)
      }
    )
  }

  return {
    isUploading,
    isBusy,
    abort,
    upload
  }
}

export default createUploaderComponent({
  name: 'FirestoreUploader',
  props,
  emits,
  injectPlugin
})
