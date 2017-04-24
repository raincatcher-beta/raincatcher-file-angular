var CONSTANTS = require('../constants');

var module = angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE);

/**
 * Controller for listing Files
 */
function FileListController($scope, mediator, $stateParams, $window, userClient, fileMediatorService, $timeout, mobileCamera, desktopCamera, FILE_CONFIG) {
  var self = this;
  self.files = null;
  var _files;
  self.uploadEnabled = FILE_CONFIG.uploadEnabled;
  userClient.getProfile().then(function(profileData){
    var userFilter;
    if(FILE_CONFIG.userMode){
      userFilter = profileData.id;
    }
    
    function refreshFiles(){
      fileMediatorService.listFiles(userFilter).then(function(files){
        $timeout(function(){
          _files = files;
          self.files = files;
        });
      });
    }
  
    refreshFiles();
  
    fileMediatorService.subscribeToFileCRUDDoneTopics($scope, refreshFiles);
  
    self.selectFile = function(event, file){
      self.selectedFileId = file.id;
      mediator.publish(fileMediatorService.fileUITopics.getTopic(CONSTANTS.TOPICS.SELECTED), file);
    };
  
    //TODO: Move to service
    self.applyFilter = function(term){
      term = term.toLowerCase();
      self.files = _files.filter(function(file){
        return String(file.name).toLowerCase().indexOf(term) !== -1
          || String(file.id).indexOf(term) !== -1;
      });
    };
  
    $scope.$parent.selected = {id: null};
    var captureThenUpload = function(){
      if($window.cordova){
        return mobileCamera.capture()
          .then(function(capture){
            var fileData = {
              userId: profileData.id,
              fileURI: capture.fileURI,
              options: {fileName: capture.fileName}
            };
            fileMediatorService.createFile(fileData);
          });
      }else{
        return desktopCamera.capture()
          .then(function(dataUrl){
            return fileMediatorService.createFile({userId: profileData.id, dataUrl: dataUrl});
          });
      }
    };
    self.capturePhoto = function(){
      captureThenUpload().then(function(){
      }, function(error){
        console.error(error);
      });
    };
  });
}

module.controller('FileListController', [ '$scope', 'mediator', '$stateParams', '$window', 'userClient', 'fileMediatorService', '$timeout', 'mobileCamera', 'desktopCamera', 'FILE_CONFIG', FileListController]);


