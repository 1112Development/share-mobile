function HomeConfig($stateProvider) {
    'ngInject';

    $stateProvider
    .state('home', {
        url: '/',
        views: {
            main: {
                templateUrl: 'app/components/home/home.html',
                controller: 'HomeController as $ctrl'
            }
        }
    });

}

export default HomeConfig;