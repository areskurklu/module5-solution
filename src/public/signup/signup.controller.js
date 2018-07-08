/*(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);
    console.log('in signup contr');

SignupController.$inject = ['signup'];
function SignupController(SignupService) {

  $scope.myFunc = function () {
          $scope.myTxt = "You clicked submit!";
      }


 var reg = this;

  reg.submit = function () {
    console.log('called submit');
    reg.completed = true;
  };

 }


})();
*/
(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)
.service('SignupService',SignupService)
.constant('ApiBasePath', "https://ares-course5.herokuapp.com/")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
     list: '<fndItems',
    //  badRemove: '=',
     onRemove: '&'
    }
  //  controller: FoundItemsDirectiveController,
  //  controllerAs: 'list',
  //  bindToController: true
  };
  return ddo;
}



//ItemDetailController.$inject = ['$stateParams', 'MenuDataService'];
SignupController.$inject = ['$stateParams','SignupService','$rootScope'];
function SignupController(SignupCategories,SignupService,$rootScope) {
//  var $signupCtrl = this;
//  $signupCtrl.signupCategories = signupCategories;


   var reg = this;

    reg.submit = function (searchItem) {
      console.log('called submit' + searchItem);
      reg.completed = true;

    };



    reg.SubmitDataCheck = function (sTerm,user){
console.log("empty "+sTerm);
      if (sTerm === undefined)
      {
  
          sTerm =" ";
      }

      reg.errorMessage = "";
      var found = 0;
      var noError =0;
        var promise = SignupService.getMatchedMenuItems();
        promise.then(function (response) {

        	console.log("response data2:"+ response.data);
        	//console.log("test first index:"+ response.data.menu_items[0].description);
            //items.items  =  response.data;
        	//items.items  =  response.data.menu_items;
          var allItems = response.data.menu_items;
        reg.itemFullName ="";
         for (var i = 0; i < allItems.length; i++) {
                  var shortName = allItems[i].short_name;
                  //if description matches the search item
                  if (shortName.toLowerCase() == sTerm.toLowerCase()) {
                    // console.log("found" +allItems[i].short_name);
                      // console.log("found" +allItems[i].name);
                    reg.itemFullName = allItems[i].name;
                    reg.description = allItems[i].description;
                  //  reg.price
                     console.log("found" +  reg.itemFullName);
                     reg.descName = allItems[i].name;
                    reg.itemFullName =reg.itemFullName;
                    found++;
                    $rootScope.favItem =reg.itemFullName;
                      $rootScope.search = sTerm;
                    }

              }//end loop
            if (found>=1)
            {
                reg.errorMessage="";
                reg.noError =1;
            }
            else {
              reg.errorMessage="No such menu number exists";
              reg.noError =0;
            }

            //  user.firstname;
            //  user.lastname;
            //console.log(user.firstname+ user.lastname);
            $rootScope.fName =user.firstname;
              $rootScope.lName =user.lastname;
              $rootScope.eml =user.email;
              $rootScope.ph =user.phone;
              $rootScope.favItem =reg.itemFullName;
              $rootScope.noError =   reg.noError;
              $rootScope.description =   reg.description  ;
                $rootScope.descName = reg.descName;
        })
        .catch(function () {
          console.log("Error in getItemsForCategory");
        });//end promise



    };//end submit



}//end controllerAs


SignupService.$inject = ['$q','$http', 'ApiBasePath'];
function SignupService($q,$http, ApiBasePath) {

  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
        //console.log("called jsoin")
  return $http.get(ApiBasePath + "/menu_items.json").then(function(foundItemsF) {

    return foundItemsF;
  });

  }
}







})();
