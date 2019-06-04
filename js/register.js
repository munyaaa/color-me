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
    passwordRegex = /^.*(?=.{4,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
    if(!($('#password').value.match(passwordRegex))){
      $('#password-error-msg').innerHTML = 'Password contain at least 4 characters and must include uppercase letter, lowercase letter, and numeric digit'
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

      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      })
      $('.modal').classList.add('is-active')
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          window.location.href = 'index.html?'+ idToken
        }).catch(function(error) {
      })
    }
  })

  $('#modal-close').addEventListener('click', function(){
    $('.modal').classList.remove('is-active')
  })

