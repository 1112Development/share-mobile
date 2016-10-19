export default class Location {
  constructor($cordovaGeolocation, $ionicPlatform) {
    'ngInject';
    this._$ionicPlatform = $ionicPlatform;
    this._$cordovaGeolocation = $cordovaGeolocation;
    this._posOptions = {timeout: 1000, enableHighAccuracy: false};
  }


  setLocation() {
    this._$ionicPlatform.ready( () => {
      this._$cordovaGeolocation
        .getCurrentPosition(this._posOptions)
        .then(function (position) {
          window.localStorage.setItem('lat', position.coords.latitude);
          window.localStorage.setItem('long', position.coords.longitude);
        }, function (err) {
          // error
        });
    })
  }

  getLocation() {
    return {'lat': window.localStorage.getItem('lat'), 'long': window.localStorage.getItem('long')};

  }

}
