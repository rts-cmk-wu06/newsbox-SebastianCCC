"use strict";

var coordinateStart;
var coordinateMove;
var container = document.querySelector('#displaynews');
var targetItem;
var moveTarget;
container.addEventListener('touchstart', function (event) {
  targetItem = event.target;

  if (event.target.tagName == "IMG" || event.target.tagName == "P" || event.target.tagName == 'H3' || event.target.tagName == 'ARTICLE') {
    coordinateStart = event.touches[0].clientX;
  }
});
container.addEventListener('touchmove', function (event) {
  if (targetItem.tagName == 'IMG' || targetItem.tagName == 'P' || targetItem.tagName == 'H3' || targetItem.tagName == 'ARTICLE') {
    coordinateMove = event.touches[0].clientX;

    if (targetItem.tagName == 'P' || targetItem.tagName == 'H3') {
      moveTarget = targetItem.parentNode.parentNode;
    } else {
      moveTarget = targetItem.parentNode;
    }

    if (coordinateMove < coordinateStart && coordinateMove > coordinateStart - moveTarget.clientWidth * 0.4) {
      moveTarget.style.transform = "translateX(".concat(coordinateMove - coordinateStart, "px)");
    }
  }
});
container.addEventListener('touchend', function () {
  if (moveTarget) {
    if (coordinateMove < coordinateStart - moveTarget.clientWidth * 0.2) {
      moveTarget.style.transform = "translateX(-6rem)";
    } else {
      moveTarget.style.transform = "translateX(0)";
    }
  }
});