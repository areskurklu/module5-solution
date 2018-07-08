(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);


MyinfoController.$inject  = ['$stateParams','SignupService','$rootScope'];
function MyinfoController(SignupCategories,SignupService,  $rootScope) {
  //var $ctrl = this;
//  $ctrl.menuCategories = menuCategories;

var myInfo = this;

console.log(  "here root:" +$rootScope.fName);

myInfo.favItem =  $rootScope.favItem;
myInfo.fName = $rootScope.fName;
myInfo.lName =$rootScope.lName;
myInfo.eml =$rootScope.eml;
myInfo.ph =$rootScope.ph;
myInfo.noError =$rootScope.noError;
myInfo.descName =$rootScope.descName;
myInfo.description =$rootScope.description;
myInfo.search = $rootScope.search;
}


})();
