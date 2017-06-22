angular.module('app.controllers', [])

.controller('noticesCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService', 'MessageData', '$ionicFilterBar',
function ($scope, $stateParams, httpService, httpService, sessionService, MessageData, $ionicFilterBar) {
  //localStorage.clear();
  $scope.notices = [];
  var filterBarInstance;

  httpService.getCall("http://83.46.80.214:8000/Hermerest/web/app_dev.php/api/parents/" + sessionService.get('id') +'/messages?type=Circular')
    .then(function(response){
      if(response.data.success){
        angular.forEach(response.data.content, function(message){
          $scope.notices.push(message);
        });
      }
    })
  $scope.sendNoticeId = function(id){
    MessageData.setMessageData(id);
  };

  $scope.sortNotices = function(notice) {
    var date = new Date(notice.sendingDate);
    return date;
  };

  $scope.showFilterBar = function () {
     filterBarInstance = $ionicFilterBar.show({
       items: $scope.notices,
       update: function (filteredItems) {
         $scope.notices = filteredItems;
       }
     });
  };

}])

.controller('pollsCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService', 'MessageData',
function ($scope, $stateParams, httpService, httpService, sessionService, MessageData) {
  $scope.polls = [];
  httpService.getCall("http://83.46.80.214:8000/Hermerest/web/app_dev.php/api/parents/" + sessionService.get('id') +'/messages?type=Poll')
    .then(function(response){
      if(response.data.success){
        angular.forEach(response.data.content, function(message){
          $scope.polls.push(message);
        });
      }
    })
  $scope.sendPollId = function(id){
    MessageData.setMessageData(id);
  };

  $scope.sortPolls = function(poll) {
    var date = new Date(poll.sendingDate);
    return date;
  };

}])

.controller('authorizationsCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService', 'MessageData',
function ($scope, $stateParams, httpService, httpService, sessionService, MessageData) {
  $scope.authorizations = [];
  httpService.getCall("http://83.46.80.214:8000/Hermerest/web/app_dev.php/api/parents/" + sessionService.get('id') +'/messages?type=Authorization')
    .then(function(response){
      if(response.data.success){
        angular.forEach(response.data.content, function(message){
          $scope.authorizations.push(message);
        });
      }
    })
  $scope.sendAuthorizationId = function(id){
    MessageData.setMessageData(id);
  };

  $scope.sortAuthorizations = function(authorization) {
    var date = new Date(authorization.sendingDate);
    return date;
  };

}])

.controller('noticeContentCtrl', ['$scope', '$stateParams', 'httpService', 'MessageData',
function ($scope, $stateParams, httpService, MessageData, $ionicPopup) {
  $id = MessageData.getMessageData();
  httpService.getCall("http://83.46.80.214:8000/Hermerest/web/app_dev.php/api/circulars/" + $id)
    .then(function(response){
      if(response.data.success){
        $scope.noticeContent=response.data.content;
      }
    })
    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://83.46.80.214:8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
    };
}])

.controller('pollContentCtrl', ['$scope', '$stateParams', 'httpService', 'MessageData',
function ($scope, $stateParams, httpService, MessageData) {
  $id = MessageData.getMessageData();
  httpService.getCall("http://83.46.80.214:8000/Hermerest/web/app_dev.php/api/polls/" + $id)
    .then(function(response){
      if(response.data.success){
        $scope.pollContent=response.data.content;
      }
    })
    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://83.46.80.214:8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
    };
}])

.controller('authorizationContentCtrl', ['$scope', '$stateParams',  'httpService', 'MessageData', '$ionicPopup', 'sessionService',
function ($scope, $stateParams, httpService, MessageData , $ionicPopup, sessionService) {
  $id = MessageData.getMessageData();
  httpService.getCall("http://83.46.80.214:8000/Hermerest/web/app_dev.php/api/authorizations/" + $id)
    .then(function(response){
      if(response.data.success){
        $scope.authorizationContent=response.data.content;
      }
    })
    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://83.46.80.214:8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
    };

    $scope.showPopup = function() {
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<input type="tel" style="-webkit-text-security:disc;" ng-model="data.passcode">',
        title: 'Código de seguridad',
        subTitle: 'Por favor, introduzca su código de seguridad.',
        scope: $scope,
        buttons: [
          { text: 'Cancelar' },
          {
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.passcode) {
                e.preventDefault();
              } else {
                if($scope.data.passcode == sessionService.get('passCode')){
                  var alertPopup = $ionicPopup.alert({
                    title: 'Respuesta enviada',
                    template: 'Se ha respondido correctamente a la autorización. ¡Gracias!'
                  });
                }else{
                  var alertPopup = $ionicPopup.alert({
                    title: 'Código de seguridad incorrecto',
                    template: 'Lo sentimos, el código de seguridad no coincide.'
                  });
                }
              }
            }
          },
        ]
      });
    }
}])

.controller('loginCtrl', ['$scope', '$stateParams', 'httpService', 'sessionService', '$state',
    function ($scope, $stateParams, httpService, sessionService, $state) {
      $scope.send= function(phoneNumber){
        sessionService.set('telephone', phoneNumber);
        httpService.getCall("http://83.46.80.214:8000/Hermerest/web/app_dev.php/api/parents?telephone=" + phoneNumber)
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

.controller('signUpCtrl', ['$scope', '$stateParams', '$state', 'httpService', 'sessionService',
function ($scope, $stateParams,  $state, httpService, sessionService) {
  $scope.sendName= function(name){
    $data = {'name' : name, 'telephone' : sessionService.get('telephone')};
    sessionService.set('name', name);
    httpService.postCall("http://83.46.80.214:8000/Hermerest/web/app_dev.php/api/parents", $data)
     .then(function (response) {
       if(response.data.success){
         sessionService.set('id', response.data.content.id);
         $state.go('passCode');
       }else{
         alert("Hubo un error en el registro");
       }
      })
  }
}])

.controller('passCodeCtrl', ['$scope', '$stateParams',  '$state', 'sessionService',
function ($scope, $stateParams, $state, sessionService) {
  $scope.sendPasscode = function(passCode) {
    sessionService.set('passCode', passCode);
    $state.go('tabsController.notices');
  };
}])
