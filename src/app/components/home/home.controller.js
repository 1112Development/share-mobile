class HomeController {
  constructor($ionicPlatform, Mixpanel, Location, Camera, AppConstants) {
    'ngInject';

    this.name = "HomeController";
    this._Location = Location;
    this._$ionicPlatform = $ionicPlatform;
    this._Camera = Camera;

    this.list = [];
    this.images = [];
    if (AppConstants.production){
      Mixpanel.trackLoad();
    }

    this._Location.setLocation();
    console.log('Where Am I?', this._Location.getLocation());
  }

  addImage() {
  this._Camera.takePhoto().then(function(imageURI) {
    // save to object
    console.log(imageURI);
  }, function(err) {
    console.err(err);
  });
};


}
  export default HomeController;
