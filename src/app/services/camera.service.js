export default class Location {
  constructor($cordovaCamera, $ionicPlatform) {
    'ngInject';
    this._$ionicPlatform = $ionicPlatform;
    this._$cordovaCamera = $cordovaCamera;
    this._posOptions = {timeout: 1000, enableHighAccuracy: false};
  }

  takePhoto() {
    console.log('test', this._$ionicPlatform);
    this._$ionicPlatform.ready(() => {

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        // targetWidth: 100,
        // targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true
      };

      this._$cordovaCamera.getPicture(options).then(function (imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        // error
      });

    }, false);

  };

}
