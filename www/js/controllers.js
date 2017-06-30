angular.module('app.controllers', [])

.controller('circularsCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService', 'MessageData', '$ionicFilterBar',
function ($scope, $stateParams, httpService, httpService, sessionService, MessageData, $ionicFilterBar) {
  //localStorage.clear();
  $scope.circulars = [];
  var filterBarInstance;
  $scope.prueba = new Date();
  httpService.getCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/parents/" + sessionService.get('id') +'/messages?type=Circular')
    .then(function(response){
      if(response.data.success){
        angular.forEach(response.data.content, function(message){
          $scope.circulars.push(message);
        });
      }
    })
  $scope.sendCircularId = function(id){
    MessageData.setMessageData(id);
  };

  $scope.sortCirculars = function(circular) {
    var date = new Date(circular.sendingDate);
    return date;
  };

  $scope.showFilterBar = function () {
     filterBarInstance = $ionicFilterBar.show({
       items: $scope.circulars,
       update: function (filteredItems) {
         $scope.circulars = filteredItems;
       }
     });
  };

}])

.controller('pollsCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService', 'MessageData',
function ($scope, $stateParams, httpService, httpService, sessionService, MessageData) {
  $scope.polls = [];
  httpService.getCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/parents/" + sessionService.get('id') +'/messages?type=Poll')
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
  httpService.getCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/parents/" + sessionService.get('id') +'/messages?type=Authorization')
    .then(function(response){
      if(response.data.success){
        angular.forEach(response.data.content, function(message){
          $scope.authorizations.push(message);
        });
      }
    })
  $scope.sendAuthorizationId = function(id, studentId){
    MessageData.setMessageData(id);
    sessionService.set('studentId', studentId);
  };

  $scope.sortAuthorizations = function(authorization) {
    var date = new Date(authorization.sendingDate);
    return date;
  };

}])

.controller('circularContentCtrl', ['$scope', '$stateParams', 'httpService', 'MessageData',
function ($scope, $stateParams, httpService, MessageData, $ionicPopup) {
  $id = MessageData.getMessageData();
  httpService.getCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/circulars/" + $id)
    .then(function(response){
      if(response.data.success){
        $scope.circularContent=response.data.content;
      }
    })
    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://80.29.46.24:8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
    };
}])

.controller('pollContentCtrl', ['$scope', '$stateParams', 'httpService', 'MessageData', 'sessionService',
function ($scope, $stateParams, httpService, MessageData,  sessionService) {
  $id = MessageData.getMessageData();
  $parentId = sessionService.get('id');
  $scope.showButton = true;
  httpService.getCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/polls/" + $id + "?parent=" + $parentId)
    .then(function(response){
      if(response.data.success){
        $scope.pollContent=response.data.content;
        $scope.showButton=!response.data.content.replied;
        if(response.data.content.replied) document.getElementById('optionsList').innerHTML = "La encuesta ya ha sido respondida.";
      }
    })
    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://80.29.46.24:8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
    };

    $scope.checkMultipleAndDo = function(multiple, checkId) {
      if(!multiple){
        angular.forEach(document.getElementsByTagName('input'), function(input){
          input.checked=false;
        });
        $checkBox = document.getElementById("pollContent-checkbox-" + checkId).getElementsByTagName('input')[0];
        $checkBox.checked = !$checkBox.checked;
      }

    };

    $scope.sendPollReplies = function(){
      angular.forEach(document.getElementsByTagName('input'), function(input){
        if(input.checked){
          $pollOptionId = input.parentNode.parentNode.id;
  		    $pollOptionId = $pollOptionId.substring($pollOptionId.lastIndexOf("-") + 1);
          httpService.postCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/pollreplies", {'parentId': $parentId, 'pollOptionId' : $pollOptionId});
        }
      });
      angular.forEach(document.getElementsByTagName('input'), function(input){
        input.disabled=true;
      });
      $scope.showButton = false;
    };

}])

.controller('authorizationContentCtrl', ['$scope', '$stateParams',  'httpService', 'MessageData', '$ionicPopup', 'sessionService',
function ($scope, $stateParams, httpService, MessageData , $ionicPopup, sessionService) {
  $parentId = sessionService.get('id');
  $studentId = sessionService.get('studentId');
  $id = MessageData.getMessageData();
  httpService.getCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/parents/" + $parentId + "/authorizations/" + $id + "?student=" + $studentId)
    .then(function(response){
      if(response.data.success){
        $scope.authorizationContent=response.data.content;
      }
    })
    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://80.29.46.24:8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
    };

    $scope.showPopup = function(reply, replyId) {
      $scope.data = {};
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
                  if(replyId == null){
                    httpService.postCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/authorizationreplies", {'authorized' : reply, 'parentId': $parentId, 'authorizationId' : $id, 'studentId' : $studentId})
                    .then(function(response){
                      if(response.data.success){
                        $scope.authorizationContent.authorized=response.data.content.authorized;
                        $scope.authorizationContent.reply = reply;
                        $scope.authorizationContent.replyId = response.data.content.replyId;
                      }
                    });

                  }else{
                    httpService.putCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/authorizationreplies/" + replyId, {'authorized' : reply, 'authorizationId' : $id, 'studentId' : $studentId})
                    .then(function(response){
                      if(response.data.success){
                        $scope.authorizationContent.authorized=response.data.content.authorized;
                        $scope.authorizationContent.reply = !$scope.authorizationContent.reply;
                      }
                    });
                  }
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
        httpService.getCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/parents?telephone=" + phoneNumber)
         .then(function (response) {
           if(response.data.success){
             sessionService.set('id', response.data.content.id);
             sessionService.set('name', response.data.content.name);
             $state.go('tabsController.circulars');
           }else{
             $scope.phoneNumber=phoneNumber;
             $state.go('signUp');
           }
         })
      }
 }])


.controller('settingsCtrl', ['$scope', '$stateParams', '$state', 'sessionService',
function ($scope, $stateParams, $state, sessionService) {
}])

.controller('signUpCtrl', ['$scope', '$stateParams', '$state', 'httpService', 'sessionService',
function ($scope, $stateParams,  $state, httpService, sessionService) {
  $scope.sendName= function(name){
    $data = {'name' : name, 'telephone' : sessionService.get('telephone')};
    sessionService.set('name', name);
    httpService.postCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/parents", $data)
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
    $state.go('centreSelector');
  };
}])

.controller('centreSelectorCtrl', ['$scope', '$stateParams',  '$state', 'httpService', 'sessionService',
function ($scope, $stateParams, $state, httpService, sessionService) {
  $parentId = sessionService.get('id');
  httpService.getCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/centres")
  .then(function (response){
    if(response.data.success){
      $scope.centres = response.data.content;
    }
  });

  $scope.addCentres = function(){
    angular.forEach(document.getElementsByTagName('input'), function(input){
      if(input.checked){
        $centreId = input.parentNode.parentNode.id;
        $centreId = $centreId.substring($centreId.lastIndexOf("-") + 1);
        httpService.postCall("http://80.29.46.24:8000/Hermerest/web/app_dev.php/api/centres", {'parentId': $parentId, 'centreId' : $centreId})
        .then(function (response){
          if(response.data.success){
            $state.go('tabsController.circulars');
          }
        });
      }
    });
  };
}])

.controller('myDataCtrl', ['$scope', '$stateParams',  '$state', 'httpService', 'sessionService',
function ($scope, $stateParams, $state, httpService, sessionService) {
  $scope.parentData = [];
  $scope.parentData.name = sessionService.get('name');
  $scope.parentData.telephone = sessionService.get('telephone');
}])

.controller('myChildrenCtrl', ['$scope', '$stateParams',  '$state', 'httpService', 'sessionService',
function ($scope, $stateParams, $state, httpService, sessionService) {
}])

.controller('myCentreCtrl', ['$scope', '$stateParams',  '$state', 'httpService', 'sessionService',
function ($scope, $stateParams, $state, httpService, sessionService) {
}])
