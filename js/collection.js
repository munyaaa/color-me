var database = firebase.database()
let collectionRef = database.ref('color-me/collection')

let drawing = document.querySelector('#drawing')
let categoryArr = []

function getCollection() {
  collectionRef.once('value', function (data){
    let ref = data
    ref.forEach(function(data){
      let title = data.val().title
      let category = data.val().category
      drawing.innerHTML += `
      <div class="column is-one-quarter all ${category}" data-tags="${category}"data-toggle="on">
      <a href="color-page.html?id=${data.key}&title=${title.split(' ').join('+')}">
      <figure class="image is-128x128 is-marginless">
      <img src="./img/drawing/${data.key}.svg" id=${data.key}>
      <div class="title is-5 is-marginless has-text-centered">${title}</div>
      </a>
      </figure>
      </div>
      `
      categoryArr.push(category)
    })
  }, function(err){
    console.log(err)
  })
}

getCollection()

function getCategory () {
  arr = []
  for(var i = 0 ; i < categoryArr.length ; i++){
    arr[i] = categoryArr[i].split(' ').join('.')
  }
  return arr
}

document.addEventListener('click', function(e) {
  let button = e.target
  if(button.id.startsWith('category-') == true){
    let filter = button.getAttribute('data-filter')
    let categoryButton = document.querySelectorAll('.category')
    var c = button.classList
    var catArr = getCategory()
    if(button.getAttribute('data-reset') === 'true'){
      if(`${c}`.search('is-clicked') < 0){
        // console.log(`${c}`.search('is-clicked'))
        button.classList.add('is-clicked')
        for(var i = 1 ; i < categoryButton.length ; i++){
          categoryButton[i].classList.remove('is-clicked')
        }
        for(var i = 0 ; i < catArr.length ; i++){
          var x = document.querySelectorAll('.' + catArr[i])
          x.forEach(function(j){
            j.setAttribute('data-toggle', 'on')
          })
        }
      }
    }
    else {
      if(`${c}`.search('is-clicked') < 0){
        categoryButton[0].classList.remove('is-clicked')
        button.classList.add('is-clicked')
        var tag = button.getAttribute('data-filter-tag')
        for (var i = 0; i < catArr.length; i++) {
          let x = document.querySelectorAll('.' + catArr[i])
          x.forEach(function(item){
            var itemTags = item.getAttribute('data-tags')
            if (itemTags != null) {
              if (itemTags.indexOf(tag) < 0) {
                item.setAttribute('data-toggle', 'off');
              }
            }
          })
        }
      }
      else {
        button.classList.remove('is-clicked')
        var tag = button.getAttribute('data-filter-tag')
        for (var i = 0; i < catArr.length; i++) {
          let x = document.querySelectorAll('.' + catArr[i])
          x.forEach(function(item){
            var itemTags = item.getAttribute('data-tags')
            if (itemTags != null) {
              if (itemTags.indexOf(tag) < 0) {
                item.setAttribute('data-toggle', 'on');
              }
            }
          })
        }
      }
    }
  }
})