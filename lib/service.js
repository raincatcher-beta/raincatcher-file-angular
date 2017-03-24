'use strict';

var _ = require('lodash');
var CONSTANTS = require('./constants');
var FileClient = require('./file-client');

module.exports = CONSTANTS.FILE_SERVICE_MODULE;

angular.module(CONSTANTS.FILE_SERVICE_MODULE, [])
  .factory('fileClient', function($q, $timeout, mediator){
    var fileService = {};
    var fileClient = FileClient(mediator);
    _.forOwn(fileClient, function(value, key){
      if(typeof value === 'function'){
        fileService[key] = function(){
          return $q.when(fileClient[key].apply(fileClient, arguments));
        };
      }else{
        fileService[key] = value;
      }
    });
    return fileService;
  });
