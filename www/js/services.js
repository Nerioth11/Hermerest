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
    }
  }
})

.service('BlankService', [function(){

}]);
