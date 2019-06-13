var database = firebase.database()

function getUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid;
      let usersRef = database.ref('color-me/users/' + uid)
      usersRef.once('value', function (data){
        console.log(data.val())
        $('#username').value = data.val().username
        $('#email').value = data.val().email
        $('#password').value = data.val().passwordDisplay
        $('#date').value = data.val().birthdate
      }, function(err){
        console.log(err)
      })
    } else {
    }
  })
}

getUser()

function clickAndLeave (id) {
  $(id).addEventListener('click', function (e) {
    e.target.removeAttribute('readonly')
  })
  $(id).addEventListener('mouseleave', function (e) {
    e.target.setAttribute('readonly', 'readonly')
  })
}

clickAndLeave('#username')
clickAndLeave('#email')
clickAndLeave('#date')