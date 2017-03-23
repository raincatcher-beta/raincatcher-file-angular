var CONSTANTS = require('../constants');

angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE).config(['$stateProvider', 'FILE_CONFIG', function($stateProvider, FILE_CONFIG) {

  var views = {
  };

  views[FILE_CONFIG.mainColumnViewId] = {
    template: '<file-detail file="ctrl.file"></file-detail>',
  };
  
  $stateProvider.state(FILE_CONFIG.detailStateMount, {
    url: '/file/:fileUid',
    views: views
  });
}]);
