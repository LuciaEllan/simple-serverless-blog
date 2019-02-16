const admin = require('firebase-admin')
const serviceAccount = require('./private/serviceAccountKey.json')

const targetUserID = 'ypm0a4PWvIZLlaweYaRKr3JUZSW2'
const privilegeObject = {
  is_admin: true
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
admin.auth().setCustomUserClaims(targetUserID, privilegeObject).then(() => {
  console.log('Successfully set custom claims.')
  process.exit()
});
  