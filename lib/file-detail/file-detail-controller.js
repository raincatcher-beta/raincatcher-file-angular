var CONSTANTS = require("../constants");

var module = angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE);

// View controller for current implementation
module.controller('FileDetailController', function($scope, $state, $stateParams, userClient, $timeout){
  var self = this;
  self.closeFile = function(event){
    $state.go('app.file');
    event.preventDefault();
    event.stopPropagation();
  };
  
  modrain.file.list().then(function(files){
    $timeout(function(){
      self.file = files.filter(function(file){
        return file.uid === $stateParams.fileUid;
      })[0];
    });
  });
 
  // set display options specifying which parameters of the file to display
  // should be an array object e.g. all fields {id: true, name: true, uid: true, owner: true, preview:true};
  self.options = $scope.displayOptions || {id: true, name: true, uid: true, owner: true, preview: true};
  $scope.$parent.selected = {id: $stateParams.fileUid};
  // TODO get profile data directly
  self.profileData = userClient.getProfile();
  // FIXME - use modules.user to retrieve workermap
  // $q.when(modules.user.resultMapUser().then(function(resultMap) {
  //   $timeout(function(){
  //     self.workerMap = resultMap;
  //   });
  // }));
  self.displayOptions = {id: true, name: true, uid: true, owner: true, preview: true};
});