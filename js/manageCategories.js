window.addEventListener('DOMContentLoaded', () => {
  axios.get('js/json/newsData.json').then((response) => {
    /*   for (let i = 0; i < sections.length; i++) { */

    const createElement = (tag, options) => {
      return Object.assign(document.createElement(tag), options)
    }

    response.data.news.forEach((element) => {
      axios
        .get(
          `https://api.nytimes.com/svc/topstories/v2/${element}.json?api-key=${response.data.apiKey}`
        )
        .then((response) => {
          console.log(response)
          const list = document.querySelector('.settingslist')
          const listItem = createElement('li', {
            className: 'settingslist-listItem d-f ct-sb',
          })
          const itemparagraph = createElement('p', {
            className: 'settingslist-itemparagraph',
            textContent: response.data.section,
          })
          const togglebutton = createElement('button', {
            className: 'settingslist-button settingslist-button_active',
            id: `Settings-panel-${element}`,
          })
          const togglebuttonIcon = createElement('i', {
            className: 'fas fa-circle settingslist-icon',
          })

          list.appendChild(listItem)
          listItem.appendChild(itemparagraph)
          listItem.appendChild(togglebutton)
          togglebutton.appendChild(togglebuttonIcon)

          function CategorySwitchFunction(eSwitch) {
            if (localStorage.getItem(eSwitch.id.replace('Settings-panel-', '')) == 'true') {
              eSwitch.classList.add('settingslist-button_active')
            } else {
              eSwitch.classList.remove('settingslist-button_active')
            }

            eSwitch.addEventListener('click', () => {
              if (eSwitch.classList.contains('settingslist-button_active')) {
                localStorage.setItem(eSwitch.id.replace('Settings-panel-', ''), 'false')
                eSwitch.classList.remove('settingslist-button_active')
              } else {
                localStorage.setItem(eSwitch.id.replace('Settings-panel-', ''), 'true')
                eSwitch.classList.add('settingslist-button_active')
              }
              console.log(
                `"${eSwitch.id.replace('Settings-panel-', '')}" is now: ${localStorage.getItem(
                  eSwitch.id.replace('Settings-panel-', '')
                )}`
              )
            })
          }

          // Initiators
          CategorySwitchFunction(togglebutton)
        })
    })
    /*   } */
  })
})
