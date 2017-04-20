'use strict';

'use strict';
var CONSTANTS = require('./constants');


module.exports = function(modules, config) {
  config = config || {};
  
  angular.module(CONSTANTS.FILE_MODULE_ID, [
    require('./directive')(config)
    , require('./service')
  ]);
  
  return CONSTANTS.FILE_MODULE_ID;
};