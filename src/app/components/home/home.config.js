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
      },
      resolve: {
        images: function (Photos, Location) {
          // get the users location and use that location to get the photo list
          return Photos.getPhotos(Location.setLocation()).then((images) => images)
        }
      }
    });

}

export default HomeConfig;
