  $('#email').value = ''
  $('#username').value = ''
  $('#password').value = ''
  $('#confirm-password').value = ''
  $('#date').value = ''

  function emailValidation() {
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!($('#email').value.match(emailRegex))){
      $('#email-error-msg').innerHTML = 'Invalid Email'
      return false
    }
    return true
  }

  function usernameValidation() {
    if($('#username').value.length < 5 || $('#username').value.length > 15){
      $('#username-error-msg').innerHTML = 'Use 5-15 characters'
      return false
    }

    if($('#username').value.indexOf(' ') > 0){
      $('#username-error-msg').innerHTML = 'Username cannot contain space'
      return false
    }
    return true
    // TODO: validate username is already taken
  }

  function passwordValidation() {
    passwordRegex = /^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1}).*$/
    if(!($('#password').value.match(passwordRegex))){
      $('#password-error-msg').innerHTML = 'Password contain at least 6 characters and include numeric digit'
      return false
    }
    return true
  }

  function confirmPasswordValidation() {
    $('#confirm-password-error-msg').innerHTML = '&nbsp'
    if($('#password').value !== $('#confirm-password').value) {
      $('#confirm-password-error-msg').innerHTML = 'Password is not match'
      return false
    }
    return true
  }

  function nullValidation(id) {
    if($('#' + id).value == ''){
      $('#' + id + '-error-msg').innerHTML = 'Enter your ' + (id === 'confirm-password' ? 'password' : id)
      return false
    }
    return true
  }

  $('#email').addEventListener('input', function(){
    $('#email-error-msg').innerHTML = '&nbsp'
    emailValidation()
  })

  $('#username').addEventListener('input', function(){
    $('#username-error-msg').innerHTML = '&nbsp'
    usernameValidation()
  })

  $('#password').addEventListener('input', function(){
    $('#password-error-msg').innerHTML = '&nbsp'
    passwordValidation()
  })

  $('#confirm-password').addEventListener('input', function(){
    $('#confirm-password-error-msg').innerHTML = '&nbsp'
    confirmPasswordValidation()
  })

  $('#date').addEventListener('input', function(){
    $('#date-error-msg').innerHTML = '&nbsp'
  })

  function writeUserData(userId, email, password, username, birthdate) {
    firebase.database().ref('color-me/users/' + userId).set({
      email: email,
      username: username,
      passwordDisplay: password,
      birthdate : birthdate
    })
  }

  function replacePasswordToStar(p) {
    for ( var i = 0 ; i < p.length ; i++ ) {
      p = p.replace(p[i], '*')
    }
    return p
  }

  function register(email, password, passwordDisplay, username, birthdate) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      // TODO: input data to DB
      let userId = firebase.auth().currentUser.uid
      writeUserData(userId, email, passwordDisplay, username, birthdate)
      $('#register-success').classList.add('is-active')
      $('#register-success-close').addEventListener('click', function(){
        $('#register-success').classList.remove('is-active')
        autoLogin(email, password)
      })
    }).catch(function(error) {
      console.log(error)
      $('#register-error .title').innerHTML = `${error.message}`
      $('#register-error').classList.add('is-active')
      $('#register-error-close').addEventListener('click', function(){
        $('#register-error').classList.remove('is-active')
      })
    })
  }

  function autoLogin(email, password) {
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
    })
  }

  $('#signup-button').addEventListener('click', function(e){
    let validCounter = 0
    if(emailValidation() && nullValidation('email')) {
      validCounter++
    }
    if(usernameValidation() && nullValidation('username')) {
      validCounter++
    }
    if(passwordValidation() && nullValidation('password')) {
      validCounter++
    }
    if(confirmPasswordValidation() && nullValidation('confirm-password')) {
      validCounter++
    }
    if(nullValidation('date')) {
      validCounter++
    }

    if(validCounter == 5){
      let email = $('#email').value
      let password = $('#password').value
      let passwordDisplay = replacePasswordToStar(password)
      let username = $('#username').value
      let birthdate = $('#date').value
      register(email, password, passwordDisplay, username, birthdate)
    }
  })