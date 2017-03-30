var ngModule;
try {
  ngModule = angular.module('wfm.file.directives');
} catch (e) {
  ngModule = angular.module('wfm.file.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/file-list.tpl.html',
    '<md-button class="md-fab" aria-label="Take photo" ng-click="ctrl.capturePhoto($event)" ng-if="ctrl.uploadEnabled">\n' +
    '    <md-icon md-font-set="material-icons">photo_camera</md-icon>\n' +
    '</md-button>\n' +
    '\n' +
    '<md-toolbar>\n' +
    '    <div class="md-toolbar-tools">\n' +
    '        <h3>\n' +
    '            <span>Files</span>\n' +
    '        </h3>\n' +
    '    </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form action="#" class="persistent-search">\n' +
    '    <label for="search"><i class="material-icons">search</i></label>\n' +
    '    <input type="text" id="search" placeholder="Search" ng-model="searchValue" ng-change="ctrl.applyFilter(searchValue)">\n' +
    '</form>\n' +
    '\n' +
    '<md-list class="wfm-file-list">\n' +
    '    <md-list-item class="md-2-line" ng-click="ctrl.selectFile($event, file)" ng-repeat="file in ctrl.files" >\n' +
    '        <div class="md-list-item-text">\n' +
    '            <img wfm-img uid="file.uid">\n' +
    '            <div class="wfm-file-list-desc">\n' +
    '                <h3>{{file.name}}</h3>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- TODO implement delete\n' +
    '        <md-icon class="md-secondary" md-font-set="material-icons">delete</md-icon>\n' +
    '        -->\n' +
    '        <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
