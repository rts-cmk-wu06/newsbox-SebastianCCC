window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#displaynews')
  let archiveArray = []

  if (localStorage.getItem('archive')) {
    archiveArray = JSON.parse(localStorage.getItem('archive'))
  }

  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('displaynews-savebutton')) {
      save(event.target.parentNode.id)
    } else if (event.target.classList.contains('displaynews-savebutton-icon')) {
      save(event.target.parentNode.parentNode.id)
    }
  })

  function save(elementId) {
    let article = document.querySelector(`#${elementId}`)

    let articleObject = {
      id: article.id,
      parentId: article.parentNode.id,
      class: article.classList[0],
      innerHTML: article.innerHTML,
    }

    archiveArray.push(articleObject)

    localStorage.setItem('archive', JSON.stringify(archiveArray))

    article.classList.add('animate__animated', 'animate__fadeOutLeft', 'animate__fast')
    setTimeout(() => {
      article.parentNode.removeChild(article)
    }, 800)
  }
})
