window.addEventListener('load', (event) => {
  var doc = document.querySelector('#svg-object')
  svg = doc.contentDocument

  let backgroundRect = svg.querySelector(`#Background rect`)
  backgroundRect.setAttribute('id', 'b')
  backgroundRect.style.fill = '#f4f4f4'

  document.querySelector('.container').style.cursor = `url("./img/cursor/cursor-platinum.png"), auto`

  let colorParent = svg.querySelector('#Color') 
  let colorChildren = colorParent.children
  let colorLength = colorParent.children.length

  for(var i = 0 ; i < colorLength ; i++){
    colorChildren[i].setAttribute('id', `c${i}`)
    let childId = svg.querySelector('#Color').children[i].id
    svg.querySelector(`#${childId}`).style.fill = 'white'
  }

  let colorDetected = 'rgb(0,0,0) transparent'

  function detectColor(targetId){
    let colorName = targetId.substr(targetId.indexOf('-'))
    let color = getComputedStyle(document.querySelector(`#${targetId}`)).backgroundColor
    let container = document.querySelector('.container')
    container.style.cursor = `url("./img/cursor/cursor${colorName}.png"), auto`
    svg.addEventListener('mouseover', function(e) {
      e.target.style.cursor = `url("../cursor/cursor${colorName}.png"), auto`
    })
    return color
  }

  document.addEventListener('click', (e) => {
    if(e && e.target.id.startsWith('color-')){
      colorDetected = detectColor(e.target.id)
    }
  })

  function applyColor(targetId, color){
    svg.querySelector(`#${targetId}`).style.fill = `${colorDetected}`
  }

  svg.querySelector(`#Color`).addEventListener('click', (e) => {
    applyColor(e.target.id, colorDetected)
  })

  svg.querySelector(`#Background`).addEventListener('click', (e) => {
    applyColor(e.target.id, colorDetected)
  })
})



