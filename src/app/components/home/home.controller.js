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

    this.toggleModal = (view) => {
      this.modalState =  view === 'show' ? true : false;
    }

  }

  addImage(source) {
    //hides modal
    this.modalState = false;
    // Take The photo
  this._Photos.newPhoto(source).then((imageURI) => {
    console.log('wtf!!!')
    this.URI = this._Photos.toDataUrl(imageURI,function(base64img){
        return base64img;
    });

    // save to object ** In Progress

   
    // image.src = "data:image/jpeg;base64," + this.URI.src;

  }, function(err) {
    console.err(err);
  });
};

  

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
