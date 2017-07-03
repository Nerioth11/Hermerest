angular.module('app.controllers', [])

.controller('circularsCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService', 'MessageData', '$ionicFilterBar',
function ($scope, $stateParams, httpService, httpService, sessionService, MessageData, $ionicFilterBar) {
  $scope.circulars = [];
  var filterBarInstance;
  $scope.prueba = new Date();
  httpService.getCall("parents/" + sessionService.get('id') +'/messages?type=Circular')
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

  $scope.showFilterBar = function () {
     filterBarInstance = $ionicFilterBar.show({
       items: $scope.circulars,
       update: function (filteredItems) {
         $scope.circulars = filteredItems;
       }
     });
  };

}])

.controller('pollsCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService', 'MessageData', '$ionicFilterBar',
function ($scope, $stateParams, httpService, httpService, sessionService, MessageData, $ionicFilterBar) {
  $scope.polls = [];
  httpService.getCall("parents/" + sessionService.get('id') +'/messages?type=Poll')
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

  $scope.showFilterBar = function () {
     filterBarInstance = $ionicFilterBar.show({
       items: $scope.polls,
       update: function (filteredItems) {
         $scope.polls = filteredItems;
       }
     });
  };

}])

.controller('authorizationsCtrl', ['$scope', '$stateParams', '$http', 'httpService', 'sessionService', 'MessageData', '$ionicFilterBar',
function ($scope, $stateParams, httpService, httpService, sessionService, MessageData, $ionicFilterBar) {
  $scope.authorizations = [];
  httpService.getCall("parents/" + sessionService.get('id') +'/messages?type=Authorization')
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

  $scope.showFilterBar = function () {
     filterBarInstance = $ionicFilterBar.show({
       items: $scope.authorizations,
       update: function (filteredItems) {
         $scope.authorizations = filteredItems;
       }
     });
  };

}])

.controller('circularContentCtrl', ['$scope', '$stateParams', 'httpService', 'MessageData',
function ($scope, $stateParams, httpService, MessageData, $ionicPopup) {
  $id = MessageData.getMessageData();
  httpService.getCall("circulars/" + $id)
    .then(function(response){
      if(response.data.success){
        $scope.circularContent=response.data.content;
      }
      $scope.dataArrived = true;
    })

    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://' + httpService.getIp() + ':8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
    };
}])

.controller('pollContentCtrl', ['$scope', '$stateParams', 'httpService', 'MessageData', 'sessionService',
function ($scope, $stateParams, httpService, MessageData,  sessionService) {
  $id = MessageData.getMessageData();
  $parentId = sessionService.get('id');
  $scope.isActive = true;
  $scope.pollReplied = false;
  httpService.getCall("polls/" + $id + "?parent=" + $parentId)
    .then(function(response){
      if(response.data.success){
        $scope.pollContent=response.data.content;
        $scope.pollReplied = response.data.content.replied;
        if(dateComparator(getTodaysDate(), dateToString($scope.pollContent.limitDate)) == 1) $scope.isActive = false;
        $scope.dataArrived = true;
      }

    })

    function getTodaysDate() {
    today = new Date()
    day = today.getDate();
    month = today.getMonth() + 1;
    year = today.getFullYear();

    return ((day < 10) ? "0" + day : day) +
        "/" +
        ((month < 10) ? "0" + month : month) +
        "/" +
        year;
    }

    function dateToString(date) {
        return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
    }

    function dateComparator(date1, date2) {
        if (date1 === date2) return 0;
        if (date1.substring(6, 10) > date2.substring(6, 10)) return 1;
        if (date1.substring(6, 10) < date2.substring(6, 10)) return -1;
        if (date1.substring(3, 5) > date2.substring(3, 5)) return 1;
        if (date1.substring(3, 5) < date2.substring(3, 5)) return -1;
        if (date1.substring(0, 2) > date2.substring(0, 2)) return 1;
        else return -1;
    }

    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://' + httpService.getIp() + ':8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
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
          httpService.postCall("pollreplies", {'parentId': $parentId, 'pollOptionId' : $pollOptionId});
        }
      });
      angular.forEach(document.getElementsByTagName('input'), function(input){
        input.disabled=true;
      });
      $scope.showButton = false;
    };

}])

.controller('authorizationContentCtrl', ['$scope', '$stateParams',  '$ionicPopup', 'httpService', 'MessageData', 'sessionService',
function ($scope, $stateParams, $ionicPopup, httpService, MessageData , sessionService) {
  $parentId = sessionService.get('id');
  $studentId = sessionService.get('studentId');
  $id = MessageData.getMessageData();
  $scope.isActive = true;
  httpService.getCall("parents/" + $parentId + "/authorizations/" + $id + "?student=" + $studentId)
    .then(function(response){
      if(response.data.success){
        $scope.authorizationContent=response.data.content;
        if(dateComparator(getTodaysDate(), dateToString($scope.authorizationContent.limitDate)) == 1) $scope.isActive = false;
        $scope.dataArrived = true;
      }
    })
    $scope.openInExternalBrowser = function(attachmentId){
    window.open('http://' + httpService.getIp() + ':8000/Hermerest_attachments/'+ attachmentId,'_system','location=yes');
    };


    function getTodaysDate() {
    today = new Date()
    day = today.getDate();
    month = today.getMonth() + 1;
    year = today.getFullYear();

    return ((day < 10) ? "0" + day : day) +
        "/" +
        ((month < 10) ? "0" + month : month) +
        "/" +
        year;
    }

    function dateToString(date) {
        return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
    }

    function dateComparator(date1, date2) {
        if (date1 === date2) return 0;
        if (date1.substring(6, 10) > date2.substring(6, 10)) return 1;
        if (date1.substring(6, 10) < date2.substring(6, 10)) return -1;
        if (date1.substring(3, 5) > date2.substring(3, 5)) return 1;
        if (date1.substring(3, 5) < date2.substring(3, 5)) return -1;
        if (date1.substring(0, 2) > date2.substring(0, 2)) return 1;
        else return -1;
    }

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
                    httpService.postCall("authorizationreplies", {'authorized' : reply, 'parentId': $parentId, 'authorizationId' : $id, 'studentId' : $studentId})
                    .then(function(response){
                      if(response.data.success){
                        $scope.authorizationContent.authorized=response.data.content.authorized;
                        $scope.authorizationContent.reply = reply;
                        $scope.authorizationContent.replyId = response.data.content.replyId;
                      }
                    });

                  }else{
                    httpService.putCall("authorizationreplies/" + replyId, {'authorized' : reply, 'authorizationId' : $id, 'studentId' : $studentId})
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
      $scope.send= function(phoneNumber, form){
        if(form.$invalid) return;
        sessionService.set('telephone', phoneNumber);
        httpService.getCall("parents?telephone=" + phoneNumber)
         .then(function (response) {
           if(response.data.content.found){
             sessionService.set('id', response.data.content.id);
             sessionService.set('name', response.data.content.name);
           }
           sessionService.set('smsCode', response.data.content.smsCode);
           sessionService.set('isRegistered', response.data.content.found);
           $state.go('smsValidation');
         })
      }
 }])


.controller('smsValidationCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'sessionService',
function ($scope, $stateParams, $state, $ionicPopup, sessionService) {
  $serverSmsCode = sessionService.get('smsCode');
  $scope.validate = function(smsCode){
    if(smsCode == $serverSmsCode){
      $state.go('passCode');
    } else{
      var alertPopup = $ionicPopup.alert({
        title: 'Código de verificación incorrecto',
        template: 'Lo sentimos, el código de verificación no coincide.'
      });
    }
  }
}])

.controller('signUpCtrl', ['$scope', '$stateParams', '$state', 'httpService', 'sessionService',
function ($scope, $stateParams,  $state, httpService, sessionService) {
  $scope.sendName= function(name){
    $data = {'name' : name, 'telephone' : sessionService.get('telephone')};
    sessionService.set('name', name);
    httpService.postCall("parents", $data)
     .then(function (response) {
       if(response.data.success){
         sessionService.set('id', response.data.content.id);
         $state.go('centreSelector');
       }else{
         alert("Hubo un error en el registro");
       }
      })
  }
}])

.controller('passCodeCtrl', ['$scope', '$stateParams',  '$state', '$ionicPopup', 'sessionService',
function ($scope, $stateParams, $state, $ionicPopup, sessionService) {
  sessionService.get('isRegistered') ? $scope.buttonName = 'Finalizar' : $scope.buttonName = 'Siguiente';
  $scope.sendPasscode = function(passCode, passCodeRepeated, form) {
    if(passCode == passCodeRepeated){
      if(form.$invalid) return;
      sessionService.set('passCode', passCode);
      if(sessionService.get('isRegistered')){
        $state.go('tabsController.circulars')
      } else {
        $state.go('signUp');
      }
    }else{
      var alertPopup = $ionicPopup.alert({
        title: 'Código de seguridad',
        template: 'Lo sentimos, los códigos no coinciden. Por favor, revise su código de seguridad.'
      });
    }
  };
}])

.controller('centreSelectorCtrl', ['$scope', '$stateParams',  '$state', 'httpService', 'sessionService',
function ($scope, $stateParams, $state, httpService, sessionService) {
  $parentId = sessionService.get('id');
  httpService.getCall("centres/" + $parentId)
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
        httpService.postCall("parents/" + $parentId + '/centres/' + $centreId, {})
        .then(function (response){
          if(response.data.success){
            $state.go('tabsController.circulars');
          }
        });
      }
    });
  };
}])

.controller('myProfileCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'sessionService',
function ($scope, $stateParams, $state, $ionicPopup, sessionService) {
}])

.controller('myDataCtrl', ['$scope', '$stateParams',  '$state', '$ionicPopup', 'httpService', 'sessionService',
function ($scope, $stateParams, $state, $ionicPopup, httpService, sessionService) {
  $parentId = sessionService.get('id');
  $scope.parentData = [];
  $scope.parentData.name = sessionService.get('name');
  $scope.parentData.telephone = sessionService.get('telephone');
  $passCode = sessionService.get('passCode');
  $scope.sendNewPasscode = function(actualCode, newCode, newCodeRepeated) {
    if(actualCode != $passCode){
      var alertPopup = $ionicPopup.alert({
        title: 'Código de seguridad incorrecto',
        template: 'El código de seguridad actual no es correcto'
      });
    }else if (newCode != newCodeRepeated) {
      var alertPopup = $ionicPopup.alert({
        title: 'Código de seguridad incorrecto',
        template: 'El nuevo código no coincide'
      });
    }else{
      sessionService.destroy('passCode');
      sessionService.set('passCode', newCode);
      angular.forEach(document.getElementsByTagName('input'), function(input){
        if(input.name != "updateButton") input.value = "";
      });
    }
  };
  $scope.showPopup = function() {
    $scope.newName = {};
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="newName.text">',
      title: 'Actualizar nombre',
      subTitle: 'Por favor, introduzca su nuevo nombre.',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Ok</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.newName.text) {
              e.preventDefault();
            } else {
              httpService.putCall("parents/" + $parentId, {'newName' : $scope.newName.text})
              .then(function (response){
                if(response.data.success){
                  sessionService.destroy('name');
                  sessionService.set('name', $scope.newName.text);
                  $scope.parentData.name = $scope.newName.text;
                }
              });
            }
          }
        },
      ]
    });
  }
}])

.controller('myChildrenCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'httpService', 'sessionService',
function ($scope, $stateParams, $state, $ionicPopup, httpService, sessionService) {
  $parentId = sessionService.get('id');
  httpService.getCall("parents/" + sessionService.get('id') +'/students')
  .then(function (response){
    if(response.data.success){
      $scope.children = response.data.content;
      $scope.dataArrived = true;
    }
  });
  $scope.deleteChild = function(item, childId){
    var myPopup = $ionicPopup.show({
      template: '¿Está seguro de que desea disociarse de este/a hijo/a?',
      title: 'Confirmación',
      subTitle: 'IMPORTANTE: Esta acción no será reversible',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Ok</b>',
          type: 'button-positive',
          onTap: function(e) {
              httpService.deleteCall("parents/" + $parentId + "/students/" + childId, {})
              .then(function (response){
                if(response.data.success){
                  $scope.children.splice($scope.children.indexOf(item), 1);
                }
              });
          }
        },
      ]
    });
  };
}])

.controller('myCentreCtrl', ['$scope', '$stateParams',  '$state', 'httpService', 'sessionService',
function ($scope, $stateParams, $state, httpService, sessionService) {
  $parentId = sessionService.get('id');
  httpService.getCall("centres/" + $parentId)
  .then(function (response){
    if(response.data.success){
      $scope.centres = response.data.content;
      $scope.dataArrived = true;
    }
  });

  $scope.addCentres = function(){
    httpService.deleteCall("parents/" + $parentId + "/centres", {})
    .then(function (){
      angular.forEach(document.getElementsByTagName('input'), function(input){
        if(input.checked){
          $centreId = input.parentNode.parentNode.id;
          $centreId = $centreId.substring($centreId.lastIndexOf("-") + 1);
          httpService.postCall("parents/" + $parentId + '/centres/' + $centreId, {});
        }
      });
    });
  };
}])
