class HomeController {
  constructor($ionicPlatform, Mixpanel, Location, Camera) {
    'ngInject';

    this.name = "HomeController";
    this._Location = Location;
    this._$ionicPlatform = $ionicPlatform;
    this._Camera = Camera;

    this.list = [];
    this.images = [];

    Mixpanel.trackLoad();

    this._Location.setLocation();
    console.log('Where Am I?', this._Location.getLocation());
  }


  addImage() {
    console.log('test', this._$ionicPlatform);
    this._Camera.takePhoto()
  }
}
  export default HomeController;
