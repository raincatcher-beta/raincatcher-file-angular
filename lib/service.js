'use strict';

var _ = require('lodash');
var CONSTANTS = require('./constants');
var fileClient = require('./file-client');

module.exports = CONSTANTS.FILE_MODULE_ID;

angular.module(CONSTANTS.FILE_MODULE_ID, [])
  .factory('fileService', function($q, $timeout, mediator){
    var fileService = {};
    var fileClient = fileClient(mediator);
    _.forOwn(fileClient, function(value, key){
      if(typeof value === 'function'){
        fileService[key] = function(){
          return $q.when(fileClient[key].apply(fileClient, arguments));
        };
      }else{
        fileService[key] = value;
      }
    });
    fileService.createManager = function() {
      if (fileService.manager) {
        return fileService.manager;
      } else {
        fileService.manager = fileClient;
        return fileService.manager;
      }
    };
    fileService.removeManager = function() {
      if(fileService.manager){
        return fileService.manager.safeStop()
          .then(function(){
            delete fileService.manager;
          });
      }
    };
    return fileService;
  });
