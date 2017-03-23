var CONSTANTS = require('../constants');

angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE).directive('fileList', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/file-list.tpl.html')
    , controller: "FileListController"
    , controllerAs: 'ctrl'
  };
});