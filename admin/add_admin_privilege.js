const admin = require('firebase-admin')
const serviceAccount = require('./private/serviceAccountKey.json')

const privilegeObject = {
  is_admin: true
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

function setCustomClaims(targetUserID, claims) {
  return admin.auth().setCustomUserClaims(targetUserID, privilegeObject).then(() => {
    console.log('Success: Successfully set custom claims.')
  }).catch(error => {
    console.log(`Error: ${error.message}`)
  })
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question('Please enter the user ID to make admin: ', (id) => {
  readline.close()
  setCustomClaims(id.trim(), privilegeObject).finally(() => {
    process.exit()
  })
})
