(function () {
"use strict";

angular.module('public')
.controller('MenuController', MenuController);
console.log('in menu controller');
MenuController.$inject = ['menuCategories'];
function MenuController(menuCategories) {
  var $ctrl = this;
  $ctrl.menuCategories = menuCategories;
/*
  $ctrl.myFunc = function () {
          $ctrl.myTxt = "You clicked submit!";
          console.log('CLICKED');
      }*/
}


})();
