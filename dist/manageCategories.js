"use strict";

window.addEventListener('DOMContentLoaded', function () {
  axios.get('js/json/newsData.json').then(function (response) {
    /*   for (let i = 0; i < sections.length; i++) { */
    var createElement = function createElement(tag, options) {
      return Object.assign(document.createElement(tag), options);
    };

    response.data.news.forEach(function (element) {
      axios.get("https://api.nytimes.com/svc/topstories/v2/".concat(element, ".json?api-key=").concat(response.data.apiKey)).then(function (response) {
        console.log(response);
        var list = document.querySelector('.settingslist');
        var listItem = createElement('li', {
          className: 'settingslist-listItem d-f ct-sb'
        });
        var itemparagraph = createElement('p', {
          className: 'settingslist-itemparagraph',
          textContent: response.data.section
        });
        var togglebutton = createElement('button', {
          className: 'settingslist-button settingslist-button_active',
          id: "Settings-panel-".concat(element)
        });
        var togglebuttonIcon = createElement('i', {
          className: 'fas fa-circle settingslist-icon'
        });
        list.appendChild(listItem);
        listItem.appendChild(itemparagraph);
        listItem.appendChild(togglebutton);
        togglebutton.appendChild(togglebuttonIcon);

        function CategorySwitchFunction(eSwitch) {
          if (localStorage.getItem(eSwitch.id.replace('Settings-panel-', '')) == 'true') {
            eSwitch.classList.add('settingslist-button_active');
          } else {
            eSwitch.classList.remove('settingslist-button_active');
          }

          eSwitch.addEventListener('click', function () {
            if (eSwitch.classList.contains('settingslist-button_active')) {
              localStorage.setItem(eSwitch.id.replace('Settings-panel-', ''), 'false');
              eSwitch.classList.remove('settingslist-button_active');
            } else {
              localStorage.setItem(eSwitch.id.replace('Settings-panel-', ''), 'true');
              eSwitch.classList.add('settingslist-button_active');
            }

            console.log("\"".concat(eSwitch.id.replace('Settings-panel-', ''), "\" is now: ").concat(localStorage.getItem(eSwitch.id.replace('Settings-panel-', ''))));
          });
        } // Initiators


        CategorySwitchFunction(togglebutton);
      });
    });
    /*   } */
  });
});