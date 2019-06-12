var database = firebase.database()
console.log(database)

$('#signin-button').addEventListener('click', function(){
  $('.modal').setAttribute('class', 'modal has-text-centered is-active')
})

$('#modal-close').addEventListener('click', function(){
  $('.modal').setAttribute('class', 'modal has-text-centered')
})

// firebase.auth().signOut().then(function() {
//   localStorage.clear()
// }).catch(function(error) {
//   console.log(error)
// })

function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    window.location.href = "collection.html"
    let user = firebase.auth().currentUser.uid

      //getUserFromDBByUID(firebase.auth().currentUser.uid)
      
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('_token', btoa(JSON.stringify(user)))
    })
  .catch(function(error) {
    console.log(error)
    if(error.code === 'auth/user-not-found') {
      $('#error-msg').innerHTML = 'This email haven\'t been registered'
      $('#error-msg').style.display = 'flex'
    }
    else {
      $('#error-msg').innerHTML = 'Invalid email or password'
      $('#error-msg').style.display = 'flex'
    }
  })
}

if (firebase.auth().currentUser !== null) {
  $('#signin-button').style.display = 'none'
}

$('#signin-button').addEventListener('click', function() {
  $('#signin-button-in').addEventListener('click', function() {
    let email = $('#email').value
    let password = $('#password').value
    login(email, password)
    console.log('masuk')
  })
})