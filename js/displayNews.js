window.addEventListener('DOMContentLoaded', () => {
  axios.get('js/json/newsData.json').then((response) => {
    /*   for (let i = 0; i < sections.length; i++) { */

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
      if (localStorage.getItem(element) == 'true') {
        createlist(element)
      }
    })
    function createlist(element) {
      axios
        .get(
          `https://api.nytimes.com/svc/topstories/v2/${element}.json?api-key=${response.data.apiKey}`
        )
        .then((response) => {
          const newsWrapper = document.querySelector('#displaynews')
          const newspath = response.data.results

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
            textContent: response.data.section,
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
          console.log(response)
          for (let i = 0; i < newspath.length; i++) {
            if (i != 0) {
              const listitem = createElement('li', {
                className: 'displaynews-listitem d-g',
                id: newspath[i].short_url.replace('https://nyti.ms/', 'id_'),
              })

              const itemlink = createElement('a', {
                className: 'displaynews-itemlink d-g',
                href: newspath[i].url,
              })

              const itemimg = createElement('img', {
                className: 'displaynews-itemimg',
                src: newspath[i].multimedia[0].url,
              })

              const itemarticle = createElement('article', {
                className: 'displaynews__acticle d-f',
              })

              const itemheadline = createElement('h3', {
                className: 'cr-drab font-md',
                textContent: newspath[i].title.substring(0, 28) + '...',
              })

              const itemparagraph = createElement('p', {
                className: 'cr-slate font-sm',
                textContent: newspath[i].abstract.substring(0, 54) + '...',
              })

              const saveButtonwrapper = createElement('div', {
                className: 'displaynews-savebutton d-f',
              })

              let deleteIcon = createElement('i', {
                className: 'displaynews-savebutton-icon fas fa-inbox font-xl',
              })

              itemwrapper.appendChild(listitem)
              listitem.appendChild(itemlink)
              itemlink.appendChild(itemimg)
              itemlink.appendChild(itemarticle)
              itemarticle.appendChild(itemheadline)
              itemarticle.appendChild(itemparagraph)
              listitem.appendChild(saveButtonwrapper)
              saveButtonwrapper.appendChild(deleteIcon)
            }

            // let article = document.createElement('article');
            // let headline = document.createElement('h3');
            // let p = document.createElement('p');
            // p.textContent = newsObject.abstract;
            // headline.textContent = newsObject.title;

            // article.appendChild(headline)
            // article.appendChild(p);

            // a.appendChild(article)
            // a.appendChild(imgContainer);
            // li.appendChild(a);
            // parentContainer.appendChild(li)
          }
        })
    }
  })
})
