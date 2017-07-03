angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


      .state('tabsController.circulars', {
    url: '/circulars',
    views: {
      'tab1': {
        templateUrl: 'templates/circulars.html',
        controller: 'circularsCtrl'
      }
    }
  })

  .state('tabsController.polls', {
    url: '/polls',
    views: {
      'tab3': {
        templateUrl: 'templates/polls.html',
        controller: 'pollsCtrl'
      }
    }
  })

  .state('tabsController.authorizations', {
    url: '/authorizations',
    views: {
      'tab2': {
        templateUrl: 'templates/authorizations.html',
        controller: 'authorizationsCtrl'
      }
    }
  })

  .state('tabsController.circularContent', {
    url: '/circularContent',
    views: {
      'tab1': {
        templateUrl: 'templates/circularContent.html',
        controller: 'circularContentCtrl'
      }
    }
  })

  .state('tabsController.pollContent', {
    url: '/pollContent',
    views: {
      'tab3': {
        templateUrl: 'templates/pollContent.html',
        controller: 'pollContentCtrl'
      }
    }
  })

  .state('tabsController.authorizationContent', {
    url: '/authorizationContent',
    views: {
      'tab2': {
        templateUrl: 'templates/authorizationContent.html',
        controller: 'authorizationContentCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.myProfile', {
    url: '/myProfile',
    views: {
      'tab4': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('signUp', {
    url: '/signup',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('smsValidation', {
    url: '/smsValidation',
    templateUrl: 'templates/smsValidation.html',
    controller: 'smsValidationCtrl'
  })

  .state('passCode', {
    url: '/passcode',
    templateUrl: 'templates/passCode.html',
    controller: 'passCodeCtrl'
  })

  .state('centreSelector', {
    url: '/centreSelector',
    templateUrl: 'templates/centreSelector.html',
    controller: 'centreSelectorCtrl'
  })

  .state('tabsController.myData', {
    url: '/myData',
    views: {
      'tab4': {
        templateUrl: 'templates/myData.html',
        controller: 'myDataCtrl'
      }
    }
  })

  .state('tabsController.myCentre', {
    url: '/myCentre',
    views: {
      'tab4': {
        templateUrl: 'templates/myCentre.html',
        controller: 'myCentreCtrl'
      }
    }
  })

  .state('tabsController.myChildren', {
    url: '/myChildren',
    views: {
      'tab4': {
        templateUrl: 'templates/myChildren.html',
        controller: 'myChildrenCtrl'
      }
    }
  })

  if (window.localStorage.getItem("id")==null) {
    $urlRouterProvider.otherwise('/login');
  } else {
    $urlRouterProvider.otherwise('/tabs/circulars');
  }

});
