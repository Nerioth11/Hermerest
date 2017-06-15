angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


      .state('tabsController.notices', {
    url: '/notices',
    views: {
      'tab1': {
        templateUrl: 'templates/notices.html',
        controller: 'noticesCtrl'
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

  .state('tabsController.noticeContent', {
    url: '/noticeContent',
    views: {
      'tab1': {
        templateUrl: 'templates/noticeContent.html',
        controller: 'noticeContentCtrl'
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

  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab4': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('signUp', {
    url: '/signup',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

$urlRouterProvider.otherwise('/login')


});
