class HomeController {
  constructor(images, $ionicPlatform, $http, Photos, AppConstants, Location, Mixpanel) {
    'ngInject';

    this.name = "HomeController";
    this._$ionicPlatform = $ionicPlatform;
    this._$http = $http;
    this._Location = Location;
    this._Photos = Photos;

    if (AppConstants.production){
      Mixpanel.trackLoad();
    }

    this.list = [];

    console.log('images', images);
  }

  addImage(source) {
    // Take The photo
  this._Photos.newPhoto(source).then((imageURI) => {
    // save to object ** In Progress
    this._Photos.uploadPhoto(imageURI, this._Location.getLocation()).then((res) =>
    console.log(res)
    );
    // add image to image list ** Next (or just re-retrive the image list?/)
    // var image = document.getElementById('myImage');
    // image.src = "data:image/jpeg;base64," + imageData;

  }, function(err) {
    console.err(err);
  });
};

  testList() {
    this._Photos.getPhotos().then((res) => console.log(res))
  }

}
  export default HomeController;
