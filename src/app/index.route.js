function routerConfig ($urlRouterProvider,$stateProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
        url:'/',
        views: {
            main: {
                url: '/',
                templateUrl: 'app/components/home/home.html',
                controller: 'HomeController',
                controllerAs:'homeCtrl'
            }
        }
    })
    .state('add', {
        url: '/add',
        views: {
            main: {
                templateUrl: 'app/components/add/add.html',
                controller: 'AddController',
                controllerAs:'addCtrl'
            }
        }
    })
    .state('login', {
        url: '/login',
        views: {
            main: {
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginController',
                controllerAs:'loginCtrl'
            }
        }
    });
}

export default routerConfig;
