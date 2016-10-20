export default class Location {
  constructor($cordovaCamera, $ionicPlatform, $q) {
    'ngInject';
    this._$q = $q;
    this._$ionicPlatform = $ionicPlatform;
    this._$cordovaCamera = $cordovaCamera;
    this._posOptions = {timeout: 1000, enableHighAccuracy: false};
  }

  takePhoto () {
    var q = this._$q.defer();
    var _picker = false;
    var source = 'camera';
    if (source === 'camera') {
      _picker = true;
    }

    var _camera = Camera.PictureSourceType.CAMERA;
    var _photoLibary = Camera.PictureSourceType.PHOTOLIBRAY;

    var options = {
      quality: 100,
      allowEdit: false,
      correctOrientation: false,
      // targetWidth: 600,
      // targetHeight: 600,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: _picker ? _camera : _photoLibary,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: true
    };
    this._$cordovaCamera.getPicture(options).then(function (imageData) {
      q.resolve(imageData);
    }, function (err) {
      q.reject(err);
    });
    return q.promise;
  };
}
