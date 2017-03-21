var CONSTANTS = require('../constants');

angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE).config(['$stateProvider', 'FILE_CONFIG', function($stateProvider, FILE_CONFIG) {

  var views = {};
  var emptyPreview = {
    templateProvider: function($templateCache){
      return $templateCache.get('wfm-template/file-list-empty.tpl.html');
    }
  };
  
  var listView =  {
    template: '<file-list></file-list>',
    controller: 'FileListController',
  };
  
  // Support side preview on larger screens
  if(FILE_CONFIG.listColumnViewId){
    views[FILE_CONFIG.mainColumnViewId] = emptyPreview;
    views[FILE_CONFIG.listColumnViewId] = listView;
  }else{
    views[FILE_CONFIG.mainColumnViewId] = listView
  }

  $stateProvider.state('app.file', {
    url: '/files',
    views: views
  });
}]);