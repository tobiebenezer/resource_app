const { initializeApp } = require("firebase/app");

const { getAnalytics } = require("firebase/analytics");



// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDOqXu3gSBhBaVWb5NYWqpg2UDsXxspcXA",

  authDomain: "resoure-hub.firebaseapp.com",

  projectId: "resoure-hub",

  storageBucket: "resoure-hub.appspot.com",

  messagingSenderId: "1066278497454",

  appId: "1:1066278497454:web:3603e2d05b63bec9e5113f",

  measurementId: "G-7PPDVJPZR2"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
