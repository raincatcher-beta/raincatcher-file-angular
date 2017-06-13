var CONSTANTS = require('../constants');
var q = require('q');
var shortid = require('shortid');
var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');


/**
 * A mediator service that will publish and subscribe to topics to be able to render file data.
 *
 * @param {Mediator} mediator
 * @param {object}   config
 * @constructor
 */
function FileMediatorService(mediator, config) {
  this.mediator = mediator;
  this.config = config || {};
  
  this.usersTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.USERS_ENTITY_NAME);
  this.filesTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.FILES_ENTITY_NAME);
  this.fileUITopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.FILE_UI_TOPIC_PREFIX).entity(CONSTANTS.FILE);
}


/**
 * Listing All Files
 *
 * @param userId - if of the files owner (if undefined would return all users files)
 * @returns {Promise} promise
 */
FileMediatorService.prototype.listFiles = function listFiles(userId) {
  return this.mediator.publish(this.filesTopics.getTopic(CONSTANTS.TOPICS.LIST), {
    userId: userId
  });
};

/**
 *
 * Creating A Single File
 *
 * @param {object} fileToCreate - The File To Create
 * @returns {Promise} promise
 */
FileMediatorService.prototype.createFile = function createFile(fileToCreate) {
  return this.mediator.publish(this.filesTopics.getTopic(CONSTANTS.TOPICS.CREATE), {
    fileToCreate: fileToCreate
  });
};

/**
 * Small utility function to subscribe to done topics for create topics for a scope
 *
 * TODO Should be part of the mediator framework
 *
 * @param $scope
 * @param {Object} subscriberFunc
 */
FileMediatorService.prototype.subscribeToFileCRUDDoneTopics = function($scope, subscriberFunc) {
  this.mediator.subscribeForScope(this.filesTopics.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.DONE_PREFIX), $scope, function() {
    subscriberFunc();
  });
};

/**
 * Reading A Single User
 *
 * @param {string} userId - the ID of the user to read
 * @returns {Promise} promise
 */
FileMediatorService.prototype.readUser = function readUser(userId) {
  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.READ), {id: userId, topicUid: userId});
};

/**
 *
 * Listing All Users
 *
 * @returns {Promise} promise
 */
FileMediatorService.prototype.listUsers = function listUsers() {
  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.LIST));
};

/**
 *
 * Utility Function To Read all Users and create a map for UI rendering.
 *
 * @returns {*}
 */
FileMediatorService.prototype.resultMapUser = function() {
  return this.listUsers()
    .then(function(results) {
      var map = {};
      results.forEach(function(result) {
        map[result.id] = result;
      });
      return map;
    });
};

angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE).service("fileMediatorService", ['mediator', 'FILE_CONFIG', function(mediator, FILE_CONFIG){
  return new FileMediatorService(mediator, FILE_CONFIG);
}]);