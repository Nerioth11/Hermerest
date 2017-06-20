angular.module('app.controllers', [])

.controller('noticesCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService', 'MessageData',
function ($scope, $stateParams, httpService, httpService, sessionService, MessageData) {
  //localStorage.clear();
  $scope.notices = [];
  httpService.getCall("http://localhost:8000/Hermerest/web/app_dev.php/api/parents/" + sessionService.get('id') +'/messages?type=Circular')
    .then(function(response){
      if(response.data.success){
        angular.forEach(response.data.content, function(message){
          $scope.notices.push(message);
        });
      }
    })
  $scope.sendMessageId = function(id){
    MessageData.setMessageData(id);
    $scope.noticeId=id;
  }

  $scope.sortNotices = function(notice) {
    var date = new Date(notice.sendingDate);
    return date;
  }
}])

.controller('pollsCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService',
function ($scope, $stateParams, httpService, httpService, sessionService) {
  $scope.polls = [];
  httpService.getCall("http://localhost:8000/Hermerest/web/app_dev.php/api/parents/" + sessionService.get('id') +'/messages?type=Poll')
    .then(function(response){
      if(response.data.success){
        angular.forEach(response.data.content, function(message){
          $scope.polls.push(message);
        });
      }
    })
}])

.controller('authorizationsCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService',
function ($scope, $stateParams, httpService, httpService, sessionService) {
  $scope.authorizations = [];
  httpService.getCall("http://localhost:8000/Hermerest/web/app_dev.php/api/parents/" + sessionService.get('id') +'/messages?type=Authorization')
    .then(function(response){
      if(response.data.success){
        angular.forEach(response.data.content, function(message){
          $scope.authorizations.push(message);
        });
      }
    })
}])

.controller('noticeContentCtrl', ['$scope', '$stateParams', 'httpService', 'MessageData',
function ($scope, $stateParams, httpService, MessageData) {
  $id = MessageData.getMessageData();
  httpService.getCall("http://localhost:8000/Hermerest/web/app_dev.php/api/circulars/" + $id)
    .then(function(response){
      if(response.data.success){
        $scope.noticeContent=response.data.content;
      }
    })
    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://localhost:8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
    };
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
