export default class Photos {
  constructor($http, $q, $cordovaCamera, $ionicPlatform, $cordovaFileTransfer, AppConstants) {
    'ngInject';

    this._$http = $http;
    this._$q = $q;
    this._$cordovaCamera = $cordovaCamera;
    this._$ionicPlatform = $ionicPlatform;
    this._$cordovaFileTransfer = $cordovaFileTransfer;
    this._AppConstants = AppConstants

  }


  // Get list of photos from the api, takes a location object.
  getPhotos (location) {
    // convert the location object to URL params
    let URILocation = 'lat=' + encodeURIComponent(location.lat) + '&' +'long=' + encodeURIComponent(location.long);

    let deferred = this._$q.defer();
    this._$http({
      url: this._AppConstants.api +'photos/' + '?' + URILocation,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data),
      (err) => deferred.resolve(err)
    );
    return deferred.promise;
  }


  // Gets an image from Camera or the photo Library, returns photo's storage location
  newPhoto (source) {
    var q = this._$q.defer();
    var _picker = false;
    if (source === 'camera') {
      _picker = true;
    }

    console.log('it happened');
    var _camera = Camera.PictureSourceType.CAMERA;
    var _photoLibary = Camera.PictureSourceType.PHOTOLIBRARY;

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


  uploadPhoto (photoURI, location) {
  // I don't know if we need the $q and defer here....?
    let q = this._$q.defer();
    let serverURL = this._AppConstants.api + 'photos/';

    console.log('at upload',photoURI,location)

    var options = new FileUploadOptions();
    options.chunkedMode = false;
    options.fileKey = 'original';
    // options.headers = {
    //   'Connection': 'close'
    // };
    // extra fields
    options.params = {
      'lat': location.lat,
      'long': location.long,
      'Content-Type': 'image/jpeg',
    };


    this._$cordovaFileTransfer.upload(encodeURI(serverURL), photoURI, options).then(function (data) {
      q.resolve(data);
    }, function (err) {
      console.log(err);
      q.reject(err);
    });
    return q.promise;

  }
}
