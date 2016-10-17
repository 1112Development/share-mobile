class HomeController {
  constructor($cordovaGeolocation,$cordovaCamera,$ionicPlatform) {
    'ngInject';

    this.name = "HomeController";

    this.list = [];

    this.images = [];

    this.addImage = function() {
      console.log('test',$ionicPlatform)
      $ionicPlatform.ready(function () {

          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
          correctOrientation:true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
          }, function(err) {
            // error
          });

        }, false);

    };

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