"use strict";

window.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('#displaynews');
  var archiveArray = [];

  if (localStorage.getItem('archive')) {
    archiveArray = JSON.parse(localStorage.getItem('archive'));
  }

  container.addEventListener('click', function (event) {
    if (event.target.classList.contains('displaynews-savebutton')) {
      save(event.target.parentNode.id);
    } else if (event.target.classList.contains('displaynews-savebutton-icon')) {
      save(event.target.parentNode.parentNode.id);
    }
  });

  function save(elementId) {
    var article = document.querySelector("#".concat(elementId));
    var articleObject = {
      id: article.id,
      parentId: article.parentNode.id,
      "class": article.classList[0],
      innerHTML: article.innerHTML
    };
    archiveArray.push(articleObject);
    localStorage.setItem('archive', JSON.stringify(archiveArray));
    article.classList.add('animate__animated', 'animate__fadeOutLeft', 'animate__fast');
    setTimeout(function () {
      article.parentNode.removeChild(article);
    }, 800);
  }
});