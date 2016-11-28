export default class Photos {
  constructor($http,$rootScope, $q, $cordovaFile, $timeout, $cordovaCamera, $ionicPlatform, $cordovaFileTransfer, $cordovaDevice, AppConstants) {
    'ngInject';

    this._$http = $http;
    this._$q = $q;
    this._$cordovaFile = $cordovaFile;
    this._$timeout = $timeout;
    this._$cordovaCamera = $cordovaCamera;
    this._$ionicPlatform = $ionicPlatform;
    this._$cordovaFileTransfer = $cordovaFileTransfer;
    this._$cordovaDevice = $cordovaDevice;
    this._AppConstants = AppConstants;

  }


  // Get list of photos from the api, takes a location object.
  getPhotos(location) {
    // convert the location object to URL params
    let URILocation = 'lat=' + encodeURIComponent(location.lat) + '&' + 'long=' + encodeURIComponent(location.long);

    let deferred = this._$q.defer();
    this._$http({
      url: this._AppConstants.api + 'photos/' + '?' + URILocation,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data),
      (err) => deferred.resolve(err)
    );
    return deferred.promise;
  }

  // Create thumbnail URL
  getImage(public_id, size) {
    var height,width;
    if (size == 'thumbnail') {

      height = '150';
      width = '100';
    } else {
        height = window.screen.height;
        width = window.screen.width;
    }
    let cloudinaryURL = 'http://res.cloudinary.com/hidfratev/';
    let translation = 'c_fit%2Ch_' + height + '%2Cw_' + width + '/';
    if (size) {
      return cloudinaryURL + translation + public_id;
    } else {
      return cloudinaryURL + public_id;
    }
  }

  // Gets an image from Camera or the photo Library, returns photo's storage location
  newPhoto(source) {
    var q = this._$q.defer();
    var _picker = false;
    if (source === 'camera') {
      _picker = true;
    }
    var _camera = Camera.PictureSourceType.CAMERA;
    var _photoLibrary = Camera.PictureSourceType.PHOTOLIBRARY;

    var options = {
      quality: 100,
      allowEdit: false,
      correctOrientation: false,
      // targetWidth: 600,
      // targetHeight: 600,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: _picker ? _camera : _photoLibrary,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: _picker ? true : false
    };

    this._$cordovaCamera.getPicture(options).then(function (imageData) {
      // Fix for old android versions until Cordova 3.5.0
      if (imageData.substring(0, 21) == "content://com.android") {
        var photo_split = imageData.split("%3A");
        imageData = "content://media/external/images/media/" + photo_split[1];
      }
      q.resolve(imageData);
    }, function (err) {
      q.reject(err);
    });

    return q.promise;
  }


  uploadPhoto(photoURI, location) {
    // I don't know if we need the $q and defer here....?
    let q = this._$q.defer();
    let serverURL = this._AppConstants.api + 'photos/';

    var options = new FileUploadOptions();
    options.chunkedMode = false;
    options.fileKey = 'image';
    // options.headers = {
    //   'Connection': 'close'
    // };
    // extra fields
    options.params = {
      'lat': location.lat,
      'long': location.long,
      'Content-Type': 'image/jpeg',
      'device': this._$cordovaDevice.getDevice()
    };

    this._$cordovaFileTransfer.upload(encodeURI(serverURL), photoURI, options).then(function (data) {
      q.resolve(data);
    }, function (err) {
      console.log(err);
      q.reject(err);
    });
    return q.promise;

  }

  downloadPhoto(photoURL) {
    let q = this._$q.defer();

    var targetPath = cordova.file.dataDirectory + "temp.jpeg";
    var trustHosts = true;
    var options = {};
    var that = this;

    // save the photo to a temp location, then pass it to the save function, then delete the temp photo
    this._$cordovaFileTransfer.download(photoURL, targetPath, options, trustHosts)
      .then(
        function (result) {
          that.savePhoto(result);
          that.removeTempPhoto(result.name);
        }, function (err) {
          console.log('error', err);
          q.reject(err);
        }, function (progress) {
         
            that.downloadProgress = (progress.loaded / progress.total) * 100;
        
        });
  }

  savePhoto(fileEntry) {
    let url = fileEntry.nativeURL;
    var album = 'Share';
    cordova.plugins.photoLibrary.saveImage(
      url,
      album,
      (success) => {
        console.log('saved', success);
      },
      (err) => {
        console.log('error', err);
      });
  }

  removeTempPhoto(url = 'temp.jpeg') {
    this._$cordovaFile.removeFile(cordova.file.dataDirectory, url)
      .then(function (success) {
        console.log('deleted', success);
      }, function (error) {
        console.log('did not delete', error);
      });
  }

}
