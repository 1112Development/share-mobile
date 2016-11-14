class HomeController {
  constructor($ionicPlatform, $ionicModal, $scope, $http, images, Photos, AppConstants, Location, Mixpanel) {
    'ngInject';
    this.name = "HomeController";
    this._$ionicPlatform = $ionicPlatform;
    this._$scope = $scope;
    this._$http = $http;
    this._Location = Location;
    this._Photos = Photos;

    // Mixpanel Event
    if (AppConstants.production){
      Mixpanel.trackLoad();
    }

    // Upload Modal
    $ionicModal.fromTemplateUrl('app/components/modals/upload.html', {
      id: '1',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.oModal1 = modal;
    });

    // Preview Modal
    $ionicModal.fromTemplateUrl('app/components/modals/download.html', {
      id: '2',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.oModal2 = modal;
    });

    // variables
    this.URI = "";
    this.photoExists = false;
    this.images = images;
  }

  viewPreview(public_id) {
    this.URI = this._Photos.getImage(public_id, 'preview');
    this.downloadURL = this._Photos.getImage(public_id, null);
    this.openModal('preview')
  }

  openModal(modal) {
    if (modal == 'upload') this._$scope.oModal1.show();
    else this._$scope.oModal2.show();
  };

  closeModal(modal) {
    if (modal == 'upload') this._$scope.oModal1.hide();
    else this._$scope.oModal2.hide();
  };

  getThumbnail(public_id) {
    return this._Photos.getImage(public_id, 'thumbnail');
  }

  getPreview(public_id) {
    return this._Photos.getImage(public_id, 'preview');
  }

  cancelImage() {
    this.photoExists = false;
    this.URI = "";
  }

  addImage(source) {
    //hides modal
    this.UploadModal = false;
    // Take The photo
    this._Photos.newPhoto(source).then((imageURI) => {

      this.photoExists = true;
      this.URI = imageURI;
      this.photoExists = true;

    }, function(err) {
      console.err(err);
    });
  }

  upload(imageURI) {
    this.URI = ""
    this._Photos.uploadPhoto(imageURI, this._Location.getLocation()).then((res) =>
      console.log('resolution', res)
    );
  }

  download(imageURI) {
    this._Photos.downloadPhoto(imageURI);
  }

  testList() {
    this._Photos.getPhotos().then((res) => console.log(res));
  }

}
  export default HomeController;
