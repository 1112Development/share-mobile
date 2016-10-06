function PhotolistConfig($stateProvider) {
    'ngInject';

    $stateProvider
    .state('photolist', {
        url: '/',
        views: {
            Photolist: {
                templateUrl: 'app/locations/photolist/photolist.html',
                controller: 'PhotolistController as photolistCtrl'
            }
        }
    });

}

export default PhotolistConfig;
