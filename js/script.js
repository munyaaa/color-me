const $ = el => document.querySelector(el)
const $$ = el => document.querySelectorAll(el)

var firebaseConfig = {
  apiKey: " AIzaSyCcaS2msIz1ZPJAkkZQDELFnQteWGkNo3U",
  authDomain: "color-me-b0a2d.firebaseapp.com",
  databaseURL: "https://color-me-b0a2d.firebaseio.com/",
  projectId: "color-me-b0a2d",
  storageBucket: "color-me-b0a2d.appspot.com",
  messagingSenderId: "811285631900",
  appID: "color-me-b0a2d"
}

firebase.initializeApp(firebaseConfig)
