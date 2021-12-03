"use strict";

window.addEventListener('DOMContentLoaded', function () {
  axios.get('js/json/newsData.json').then(function (response) {
    /*   for (let i = 0; i < sections.length; i++) { */
    var createElement = function createElement(tag, options) {
      return Object.assign(document.createElement(tag), options);
    };
    /*     Object.entries(urlObject).forEach((element) => {
      let [key, value] = element
      if (localStorage.getItem(key) == 'true') {
        CreateNewsCard(key, value)
      }
    }) */


    response.data.news.forEach(function (element) {
      if (localStorage.getItem(element) == 'true') {
        createlist(element);
      }
    });

    function createlist(element) {
      axios.get("https://api.nytimes.com/svc/topstories/v2/".concat(element, ".json?api-key=").concat(response.data.apiKey)).then(function (response) {
        var newsWrapper = document.querySelector('#displaynews');
        var newspath = response.data.results;
        var list = createElement('div', {
          className: 'displaynews-list'
        });
        var listCategory = createElement('div', {
          className: 'displaynews-Category'
        });
        var Categorytitlewrapper = createElement('div', {
          className: 'd-f ai-c'
        });
        var Categorybutton = createElement('button');
        var Categoryicon = createElement('i', {
          className: 'fas fa-chevron-right font-xl'
        });
        var Categoryimg = createElement('img', {
          className: 'displaynews-imgtitle',
          src: '../dist/images/icn_surfing.svg'
        });
        var Categorytitle = createElement('h2', {
          className: 'displaynews__h2 h2 font-md cr-drab tt-u p',
          textContent: response.data.section
        });
        var itemwrapper = createElement('ul', {
          className: 'd-n',
          id: "itemwrapper-".concat(element)
        });
        newsWrapper.appendChild(list);
        list.appendChild(listCategory);
        list.appendChild(itemwrapper);
        listCategory.appendChild(Categorytitlewrapper);
        listCategory.appendChild(Categorybutton);
        Categorybutton.appendChild(Categoryicon);
        Categorytitlewrapper.appendChild(Categoryimg);
        Categorytitlewrapper.appendChild(Categorytitle);
        listCategory.addEventListener('click', function () {
          itemwrapper.classList.toggle('d-n');

          if (Categorybutton.style.transform == 'rotate(90deg)') {
            Categorybutton.style.transform = 'rotate(0deg)';
          } else {
            Categorybutton.style.transform = 'rotate(90deg)';
          }
        });
        console.log(response);

        for (var i = 0; i < newspath.length; i++) {
          if (i != 0) {
            var listitem = createElement('li', {
              className: 'displaynews-listitem d-g',
              id: newspath[i].short_url.replace('https://nyti.ms/', 'id_')
            });
            var itemlink = createElement('a', {
              className: 'displaynews-itemlink d-g',
              href: newspath[i].url
            });
            var itemimg = createElement('img', {
              className: 'displaynews-itemimg',
              src: newspath[i].multimedia[0].url
            });
            var itemarticle = createElement('article', {
              className: 'displaynews__acticle d-f'
            });
            var itemheadline = createElement('h3', {
              className: 'cr-drab font-md',
              textContent: newspath[i].title.substring(0, 28) + '...'
            });
            var itemparagraph = createElement('p', {
              className: 'cr-slate font-sm',
              textContent: newspath[i]["abstract"].substring(0, 54) + '...'
            });
            var saveButtonwrapper = createElement('div', {
              className: 'displaynews-savebutton d-f'
            });
            var deleteIcon = createElement('i', {
              className: 'displaynews-savebutton-icon fas fa-inbox font-xl'
            });
            itemwrapper.appendChild(listitem);
            listitem.appendChild(itemlink);
            itemlink.appendChild(itemimg);
            itemlink.appendChild(itemarticle);
            itemarticle.appendChild(itemheadline);
            itemarticle.appendChild(itemparagraph);
            listitem.appendChild(saveButtonwrapper);
            saveButtonwrapper.appendChild(deleteIcon);
          } // let article = document.createElement('article');
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
      });
    }
  });
});