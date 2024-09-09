// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");
const serviceAccount = require("./resoure-hub-firebase-adminsdk-1aeml-0fdb8bcf53.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://resoure-hub.appspot.com"
})

const bucket = admin.storage().bucket();

module.exports = {
    bucket,
    admin
}