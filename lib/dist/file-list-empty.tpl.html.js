var ngModule;
try {
  ngModule = angular.module('wfm.file.directives');
} catch (e) {
  ngModule = angular.module('wfm.file.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/file-list-empty.tpl.html',
    '<div class="empty-state" layout-padding layout-margin>\n' +
    '  <h2 class="md-title">No file selected.</h2>\n' +
    '  <p class="md-body-1">Select a file from the menu:</p>\n' +
    '</div>\n' +
    '');
}]);
