export default class Mixpanel {
  constructor($cordovaDevice, $ionicPlatform) {
    'ngInject';
    this._$ionicPlatform = $ionicPlatform;
    this._$cordovaDevice = $cordovaDevice;
    this.mixpanel = require('mixpanel-browser');
    this.mixpanel.init("63e93422fe8f78d69ae535533a8ff32b");
  }

  trackLoad () {
    this._$ionicPlatform.ready( () => {
      var device = this._$cordovaDevice.getDevice();
      this.mixpanel.track("Loaded Homepage", {'device': device});
    })
  }
}
