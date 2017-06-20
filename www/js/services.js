angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('httpService', function($http){
  return {
    getCall: function(url){
      return $http.get(url);
    },

    postCall: function(url, data){
      return $http.post(url, data);
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
