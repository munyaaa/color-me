var database = firebase.database()
console.log(database)

$('#signin-button').addEventListener('click', function(){
    $('.modal').setAttribute('class', 'modal has-text-centered is-active')
})

$('#modal-close').addEventListener('click', function(){
    $('.modal').setAttribute('class', 'modal has-text-centered')
})