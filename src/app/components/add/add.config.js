function AddConfig($stateProvider) {
    'ngInject';

    $stateProvider
    .state('add', {
        url: '/',
        views: {
            main: {
                templateUrl: 'app/components/add/add.html',
                controller: 'addController as $ctrl'
            }
        }
    });

}

export default AddConfig;