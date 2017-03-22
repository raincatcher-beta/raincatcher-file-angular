/**
 * Detail view o a file, passed in is file object and options.
 * Options help to chose which details we want to render
 * options e.g. {id: true, name: true, uid: true, owner: true, preview:true};
 */

require('./file-detail-controller');
var CONSTANTS = require("../constants");

angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE).directive('fileDetail', function($templateCache) {
    return {
      restrict: 'E',
      template: $templateCache.get('wfm-template/file-detail.tpl.html'),
      scope: {
        file: '=',
        displayOptions: '='
      },
      controller: 'FileDetailController',
      controllerAs: 'ctrl'
    };
});