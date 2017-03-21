var CONSTANTS = require("../constants");
var _ = require("lodash");

var module = angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE);

// View controller for current implementation
module.controller('FileDetailController', function($scope, $state, $stateParams, userClient, mediator, fileMediatorService, $timeout){
  var self = this;
  self.closeFile = function(event){
    mediator.publish('wfm:file:detail:close');
    event.preventDefault();
    event.stopPropagation();
  };
  
  mediator.subscribeForScope('wfm:file:detail:close', $scope, function() {
    $state.go('app.file');
  });
  
  function refreshFiles() {
    fileMediatorService.listFiles().then(function(files) {
      $timeout(function() {
        self.file = files.filter(function(file) {
          return file.uid === $stateParams.fileUid;
        })[0];
      });
    
    });
  }
  refreshFiles();
  
  fileMediatorService.subscribeToFileCRUDDoneTopics($scope, refreshFiles);
 
  // set display options specifying which parameters of the file to display
  // should be an array object e.g. all fields {id: true, name: true, uid: true, owner: true, preview:true};
  self.options = $scope.displayOptions || {id: true, name: true, uid: true, owner: true, preview: true};
  $scope.$parent.selected = {id: $stateParams.fileUid};
  // TODO get profile data directly
  self.profileData = userClient.getProfile();
  // TODO Return user information directly from cloud
  userClient.list().then(function(workers){
    var map={};
    _.each(workers, function(worker){
      map[worker.id] = worker;
    });
    $timeout(function(){
      self.workerMap = map;
    });
  });
  self.displayOptions = {id: true, name: true, uid: true, owner: true, preview: true};
});