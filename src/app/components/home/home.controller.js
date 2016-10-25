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
    this.modalState = false;
    this.URI = "";
    this.photoExists = false;
  }

  cancelImage() {
    this.photoExists = false;
    this.URI = "";
  };

  toggleModal(view) {
    this.modalState = view === 'show';
  };

  addImage(source) {
    //hides modal
    this.modalState = false;
    // Take The photo
    this._Photos.newPhoto(source).then((imageURI) => {

      this.photoExists = true;
      this.URI = imageURI;
      this.photoExists = true;

    }, function(err) {
      console.err(err);
    });
  }


  upload() {
    this._Photos.uploadPhoto(imageURI, this._Location.getLocation()).then((res) =>
    console.log('resolution',res)
    );
  }
  testList() {
    this._Photos.getPhotos().then((res) => console.log(res))
  }

}
  export default HomeController;
