'use strict';

var CONSTANTS = require('./constants');

/**
 *
 * Entry point for module.
 *
 * @param {object} config - Config for the module
 * @returns {string}
 */
module.exports = function(config) {
  angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE, [
    'wfm.core.mediator'
  ]).constant("FILE_CONFIG", config);
  
  //Adding any html templates to the $template cache for this module.
  require('./dist');
  
  //Running any functionality required for when the module starts
  require('./initialisation');
  
  //Creating the service that publishes / subscribes any mediator topics related to this module.
  require('./mediator-service');
  
  //This is all of the functionality to list files to the user.
  require('./file-list');
  
  //This is the view to display the file
  require('./file-detail');
  
  
  return CONSTANTS.FILE_DIRECTIVE_MODULE;
};


