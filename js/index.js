var database = firebase.database()
console.log(database)

document.querySelector('#signin-button').addEventListener('click', function(){
    document.querySelector('.modal').setAttribute('class', 'modal has-text-centered is-active')
})

document.querySelector('#modal-close').addEventListener('click', function(){
    document.querySelector('.modal').setAttribute('class', 'modal has-text-centered')
})