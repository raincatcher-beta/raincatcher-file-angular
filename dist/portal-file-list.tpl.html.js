var ngModule;
try {
  ngModule = angular.module('wfm.file.directives');
} catch (e) {
  ngModule = angular.module('wfm.file.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/portal-file-list.tpl.html',
    '<md-toolbar>\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      <span>Files</span>\n' +
    '    </h3>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form action="#" class="persistent-search">\n' +
    '  <label for="search"><i class="material-icons">search</i></label>\n' +
    '  <input type="text" id="search" placeholder="Search">\n' +
    '</form>\n' +
    '\n' +
    '<md-list class="wfm-file-list">\n' +
    '  <md-list-item class="md-2-line" ng-click="navigateTo(\'app.file.detail\', {fileUid: file.uid})" ng-repeat="file in ctrl.files" ng-class="{active: selected.id === file.id}">\n' +
    '    <div class="md-list-item-text">\n' +
    '      <img wfm-img uid="file.uid">\n' +
    '      <div class="wfm-file-list-desc">\n' +
    '        <h3>{{file.name}}</h3>\n' +
    '        <p>{{ctrl.workerMap[file.owner].name}}</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <md-icon class="md-secondary" md-font-set="material-icons">delete</md-icon>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
