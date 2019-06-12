'use strict'

let user = localStorage.getItem('user')
// let _token = JSON.parse(atob(localStorage.getItem('_token')))

let _token = localStorage.getItem('_token')

if (user === null || _token === null) {
  window.location.href = "index.html"
}

else {
  _token = JSON.parse(atob(localStorage.getItem('_token')))
  if (_token.uid !== user.uid) {
    window.location.href = "index.html"
  }
}

$('#sign-out').addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    localStorage.clear()
    window.location.href = './index.html'
  }).catch(function(error) {
    console.log(error)
  })
})