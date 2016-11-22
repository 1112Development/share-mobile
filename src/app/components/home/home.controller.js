class HomeController {
  constructor($ionicPlatform,$interval,$timeout, $ionicModal, $scope, $http, images, Photos, AppConstants, Location, Mixpanel) {
    'ngInject';
    this.name = "HomeController";
    this._$ionicPlatform = $ionicPlatform;
    this._$scope = $scope;
    this._$http = $http;
    this._$interval = $interval;
    this._$timeout = $timeout;
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
    this.progress = null;
  }

  viewPreview(public_id) {
    this.URI = this._Photos.getImage(public_id, 'preview');
    this.downloadURL = this._Photos.getImage(public_id, null);
    this.openModal('preview');
  }

  openModal(modal) {
    if (modal == 'upload') this._$scope.oModal1.show();
    else this._$scope.oModal2.show();
  }

  closeModal(modal) {
    this.URI = "";
    if (modal == 'upload') this._$scope.oModal1.hide();
    else this._$scope.oModal2.hide();
  }

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

  doRefresh() {
    var that = this;
    return this._Photos.getPhotos(that._Location.setLocation()).then(
      (images) => {
        that.images = images;
        console.log('images',images);
      }
      );
  }

  upload(imageURI) {
    this.URI = "";
    this._Photos.uploadPhoto(imageURI, this._Location.getLocation()).then((res) =>
      console.log('resolution', res)
    );
  }

  download(imageURI) {
    var that = this;
    this._Photos.downloadPhoto(imageURI);

    var promise = this._$interval(function(){
          that.progress = Math.round(that._Photos.downloadProgress * 100) / 100;

          if(that.progress === 100) {
            that._$interval.cancel(promise);
            that.progress = "downloaded";

            that._$timeout(function() {
              that.progress = null;
            },1000);
          }
    },200);

    this.closeModal('download');
  }



  testList() {
    this._Photos.getPhotos().then((res) => console.log(res));
  }

}
  export default HomeController;
