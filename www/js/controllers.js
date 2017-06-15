angular.module('app.controllers', [])

.controller('noticesCtrl', ['$scope', '$http', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams) {
  $scope.stories = [];
  $http.get('https://www.reddit.com/r/Android/new/.json').success(function(response){
    angular.forEach(response.data.children, function(child){
      $scope.stories.push(child.data);
    });
  });
}])

.controller('pollsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('authorizationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('noticeContentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('pollContentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('authorizationContentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', 'httpService', 'sessionService', '$state',
    function ($scope, $stateParams, httpService, sessionService, $state) {
      $scope.send= function(phoneNumber){
        sessionService.set('telephone', phoneNumber);
        httpService.getCall("http://localhost:8000/Hermerest/web/app_dev.php/api/parents?telephone=" + phoneNumber)
         .then(function (response) {
           if(response.data.success){
             sessionService.set('id', response.data.content.id);
             sessionService.set('name', response.data.content.name);
             $state.go('tabsController.notices');
           }else{
             $scope.phoneNumber=phoneNumber;
             $state.go('signUp');
           }
         })
      }
 }])


.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signUpCtrl', ['$scope', '$stateParams',  'httpService', 'sessionService', '$state',
function ($scope, $stateParams, httpService, sessionService, $state) {
  $scope.sendName= function(name){
    $data = {'name' : name, 'telephone' : sessionService.get('telephone')};
    sessionService.set('name', name);
    httpService.postCall("http://localhost:8000/Hermerest/web/app_dev.php/api/parents", $data)
     .then(function (response) {
       if(response.data.success){
         sessionService.set('id', response.data.content.id);
         $state.go('tabsController.notices');
       }else{
         alert("No pudiste registrarte wey");
       }
      })
  }
}])
