window.addEventListener('DOMContentLoaded', () => {
  const newsWrapper = document.querySelector('#displaynews')

  axios.get('js/json/newsData.json').then((response) => {
    /*   for (let i = 0; i < sections.length; i++) { */

    let savedArticles = JSON.parse(localStorage.getItem('archive'))

    const createElement = (tag, options) => {
      return Object.assign(document.createElement(tag), options)
    }

    /*     Object.entries(urlObject).forEach((element) => {
          let [key, value] = element
          if (localStorage.getItem(key) == 'true') {
            CreateNewsCard(key, value)
          }
        }) */

    response.data.news.forEach((element) => {
      const list = createElement('div', {
        className: 'displaynews-list',
      })

      const listCategory = createElement('div', {
        className: 'displaynews-Category',
      })

      const Categorytitlewrapper = createElement('div', {
        className: 'd-f ai-c',
      })

      const Categorybutton = createElement('button')

      const Categoryicon = createElement('i', {
        className: 'fas fa-chevron-right font-xl',
      })

      const Categoryimg = createElement('img', {
        className: 'displaynews-imgtitle',
        src: '../dist/images/icn_surfing.svg',
      })

      const Categorytitle = createElement('h2', {
        className: 'displaynews__h2 h2 font-md cr-drab tt-u p',
        textContent: element,
      })

      const itemwrapper = createElement('ul', {
        className: 'd-n',
        id: `itemwrapper-${element}`,
      })

      newsWrapper.appendChild(list)
      list.appendChild(listCategory)
      list.appendChild(itemwrapper)
      listCategory.appendChild(Categorytitlewrapper)
      listCategory.appendChild(Categorybutton)
      Categorybutton.appendChild(Categoryicon)
      Categorytitlewrapper.appendChild(Categoryimg)
      Categorytitlewrapper.appendChild(Categorytitle)
      listCategory.addEventListener('click', () => {
        itemwrapper.classList.toggle('d-n')
        if (Categorybutton.style.transform == 'rotate(90deg)') {
          Categorybutton.style.transform = 'rotate(0deg)'
        } else {
          Categorybutton.style.transform = 'rotate(90deg)'
        }
      })
    })
    for (let i = 0; i < newsWrapper.childNodes.length; i++) {
      savedArticles.forEach((item) => {
        let listitempath = newsWrapper.childNodes[i].querySelector('ul')
        /* console.log(listitempath.id) */
        if (item.parentId == listitempath.id) {
          console.log(item.parentId)
          setTimeout(() => {
            const listitem = createElement('li', {
              id: item.id,
              className: item.class,
            })
            let innerHTMLRevised = item.innerHTML.replace(
              '<div class="displaynews-savebutton d-f"><i class="displaynews-savebutton-icon fas fa-inbox font-xl" aria-hidden="true"></i></div>',
              '<div class="displaynews-savebutton d-f"><i class="displaynews-savebutton-icon far fa-trash-alt font-xl" aria-hidden="true"></i></div>'
            )
            innerHTMLRevised = innerHTMLRevised.replace('style="transform: translateX(-6rem);', '')
            listitem.innerHTML = innerHTMLRevised
            listitempath.appendChild(listitem)
          }, 500)
        }
      })
    }
  })
})
