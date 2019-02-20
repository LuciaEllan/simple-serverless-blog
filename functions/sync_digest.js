// https://firebase.google.com/docs/functions/firestore-events?authuser=0

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()
// The behavior for Date objects stored in Firestore is going to change, so I need this line
firestore.settings({
  timestampsInSnapshots: true
})

function writeDigest (postID, data) {
  const digestDoc = firestore.doc(`digests/${postID}`)
  return digestDoc.set({
    title: data.title,
    tags: data.tags,
    is_public: data.is_public,
    date: data.date,
    author: data.author
  })
}

function deleteDigest (postID) {
  const digestDoc = firestore.doc(`digests/${postID}`)
  return digestDoc.delete()
}

module.exports = functions.firestore.document('posts/{postId}').onWrite(
  (change, context) => {
    // Retrieve the current and previous value
    const data = change.after.exists ? change.after.data() : null
    const previousData = change.before.exists ? change.before.data() : null

    if (data !== null) {
      if (previousData !== null) {
        // document is updated
        if ((previousData.last_update === undefined) || (data.last_update.seconds > previousData.last_update.seconds)) {
          // actually update the digest, i.e. overwrite the digest
          return writeDigest(context.params.postId, data)
        }
        // else, i.e. older update data is arrived in delay, don't do anything
        console.log('SyncDigest: Older update data is arrived in delay, ignoring.')
        return false
      } else {
        // document is created
        return writeDigest(context.params.postId, data)
      }
    } else {
      // document is removed
      return deleteDigest(context.params.postId)
    }
  }
)
