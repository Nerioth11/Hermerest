angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('httpService', function($http){
  $ip = '80.29.46.24';
  return {
    getCall: function(url){
      return $http.get('http://' + $ip + ':8000/Hermerest/web/api/' + url);
    },

    postCall: function(url, data){
      return $http.post('http://' + $ip + ':8000/Hermerest/web/api/' + url, data);
    },

    putCall: function(url, data){
      return $http.put('http://' + $ip + ':8000/Hermerest/web/api/' + url, data);
    },

    deleteCall: function(url, data){
      return $http.delete('http://' + $ip + ':8000/Hermerest/web/api/' + url, data);
    },

    getIp: function(){
      return $ip;
    },
  };
})

.factory('sessionService',['$http',function($http){
return {
   set:function(key,value){
      return localStorage.setItem(key,JSON.stringify(value));
   },
   get:function(key){
     return JSON.parse(localStorage.getItem(key));
   },
   destroy:function(key){
     return localStorage.removeItem(key);
   },
 };
}])

.factory('MessageData', function () {
var messageId = {};
  return {
      getMessageData: function () {
          return messageId;
      },
      setMessageData: function (id) {
          messageId = id;
      },
  };
})

.service('BlankService', [function(){

}]);
