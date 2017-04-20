var CONSTANTS = require('../constants');

var module = angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE);

/**
 * Controller for listing Files
 */
function FileListController($state, $scope, $window, userClient, $timeout, mobileCamera, desktopCamera, FILE_CONFIG) {
  var self = this;
  self.files = null;
  var _files;
  self.uploadEnabled = FILE_CONFIG.uploadEnabled;
  userClient.getProfile().then(function(profileData) {
    var userFilter;
    if (FILE_CONFIG.userMode) {
      userFilter = profileData.id;
    }
    
    function refreshFiles() {
      modules.file.list(userFilter).then(function(files) {
        $timeout(function() {
          _files = files;
          self.files = files;
        });
      });
    }
    
    refreshFiles();
    self.selectFile = function(event, file) {
      self.selectedFileId = file.id;
      $state.go(FILE_CONFIG.detailStateMount, {fileUid: file.uid}, {reload: false});
    };
  
    //TODO: Move to service
    self.applyFilter = function(term) {
      term = term.toLowerCase();
      self.files = _files.filter(function(file) {
        return String(file.name).toLowerCase().indexOf(term) !== -1
          || String(file.id).indexOf(term) !== -1;
      });
    };
    
    $scope.$parent.selected = {id: null};
    var captureThenUpload = function() {
      if ($window.cordova) {
        return mobileCamera.capture()
          .then(function(capture) {
            var fileData = {
              userId: profileData.id,
              fileURI: capture.fileURI,
              options: {fileName: capture.fileName}
            };
            return modules.file.create(fileData);
          });
      } else {
        return desktopCamera.capture()
          .then(function(dataUrl) {
            return modules.file.create({userId: profileData.id, dataUrl: dataUrl});
          });
      }
    };
    self.capturePhoto = function() {
      captureThenUpload().then(function() {
      }, function(error) {
        console.error(error);
      });
    };
  });
}

module.controller('FileListController', ['$state', '$scope', '$window', 'userClient', '$timeout', 'mobileCamera', 'desktopCamera', 'FILE_CONFIG', FileListController]);


