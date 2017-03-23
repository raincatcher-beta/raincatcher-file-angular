var CONSTANTS = require('../constants');


/**
 * Initialistion functions for UI topic subscribers.
 */
angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE).run(['$state','fileMediatorService', 'FILE_CONFIG',function($state, fileMediatorService, FILE_CONFIG) {
  var topics = fileMediatorService.fileUITopics;
  
  //When a file is selected in the UI, we display the file details.
  topics.on(CONSTANTS.TOPICS.SELECTED, function(file){
    $state.go(FILE_CONFIG.detailStateMount, {
        fileUid: file.uid
      }, {
        reload: false
      }
    );
  });

  //Want to display the list of files.
  topics.on(CONSTANTS.TOPICS.LIST, function(){
    $state.go('app.file', null, {
      reload: false
    });
  });
}]);