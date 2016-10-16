class HomeController {
  constructor($cordovaGeolocation) {
    'ngInject';
    var posOptions = {timeout: 1000, enableHighAccuracy: false};
    function getLocation() {
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        window.localStorage.setItem('lat', position.coords.latitude);
        window.localStorage.setItem('long', position.coords.longitude);
      }, function(err) {
        // error
      });
  	}
    getLocation();
    console.log('Where Am I?', window.localStorage.getItem('lat'), window.localStorage.getItem('long'));
  }
}

export default HomeController;