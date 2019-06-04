var database = firebase.database()
console.log(database)

$('#signin-button').addEventListener('click', function(){
    $('.modal').setAttribute('class', 'modal has-text-centered is-active')
})

$('#modal-close').addEventListener('click', function(){
    $('.modal').setAttribute('class', 'modal has-text-centered')
})

var user = firebase.auth().currentUser

if(user) {
    console.log(user)
}
else {
    console.log('error')
}