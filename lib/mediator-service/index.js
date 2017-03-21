var CONSTANTS = require('../constants');
var q = require('q');
var shortid = require('shortid');
var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');

/**
 * Getting Promises for done and error topics.
 * This will resolve or reject the returned promise depending on the topic published.
 *
 * TODO: This may be of more use in fh-wfm-mediator...
 *
 * @param doneTopicPromise  - A promise for the done topic.
 * @param errorTopicPromise - A promise for the error topic.
 * @returns {Promise}
 */
function getTopicPromises(doneTopicPromise, errorTopicPromise) {
  var deferred = q.defer();

  doneTopicPromise.then(function(response) {
    deferred.resolve(response);
  });

  errorTopicPromise.then(function(error) {
    deferred.reject(error);
  });
  return deferred.promise;
}

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
  this.filesTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.FILES_ENTITY_NAME);
  this.fileUITopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.FILE);
}

/**
 *
 * Getting Promises for the done and error topics.
 *
 * TODO: This may be of more use in fh-wfm-mediator...
 *
 * @param {MediatorTopicUtility} topicGenerator
 * @param {string} topicName   - The name of the topic to generate
 * @param {string} [topicUid]  - A topic UID if required.
 * @returns {Promise} - A promise for the topic.
 */
FileMediatorService.prototype.getErrorAndDoneTopicPromises = function getErrorAndDoneTopicPromises(topicGenerator, topicName, topicUid) {
  var doneTopic = topicGenerator.getTopic(topicName, CONSTANTS.DONE_PREFIX, topicUid);
  var errorTopic = topicGenerator.getTopic(topicName, CONSTANTS.ERROR_PREFIX, topicUid);

  var doneTopicPromise = topicGenerator.mediator.promise(doneTopic);
  var errorTopicPromise = topicGenerator.mediator.promise(errorTopic);

  var timeoutDefer = q.defer();

  setTimeout(function() {
    timeoutDefer.reject(new Error("Timeout For Topic: " + doneTopic));
  }, this.config.topicTimeout || CONSTANTS.TOPIC_TIMEOUT);

  //Either one of these promises resolves/rejects or it will time out.
  return q.race([getTopicPromises(doneTopicPromise, errorTopicPromise), timeoutDefer.promise]);
};

/**
 * Listing All Files
 *
 * @returns {Promise}
 */
FileMediatorService.prototype.listFiles = function listFiles() {
  var promise = this.getErrorAndDoneTopicPromises(this.filesTopics, CONSTANTS.TOPICS.LIST);
  this.mediator.publish(this.filesTopics.getTopic(CONSTANTS.TOPICS.LIST));
  return promise;
};

/**
 *
 * Creating A Single File
 *
 * @param {object} fileToCreate - The File To Create
 * @returns {Promise}
 */
FileMediatorService.prototype.createFile = function createFile(fileToCreate) {
  var topicUid = shortid.generate();
  var promise = this.getErrorAndDoneTopicPromises(this.filesTopics, CONSTANTS.TOPICS.CREATE, topicUid);
  this.mediator.publish(this.filesTopics.getTopic(CONSTANTS.TOPICS.CREATE), {
    fileToCreate: fileToCreate,
    topicUid: topicUid
  });
  return promise;
};

/**
 * Small utility function to subscribe to done topics for create topics for a scope
 *
 * TODO Should be part of the mediator framework
 *
 * @param $scope
 * @param subscriberFunc
 */
FileMediatorService.prototype.subscribeToFileCRUDDoneTopics = function($scope, subscriberFunc) {
  this.mediator.subscribeForScope(this.filesTopics.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.DONE_PREFIX), $scope, function() {
    subscriberFunc();
  });
};

angular.module(CONSTANTS.FILE_DIRECTIVE_MODULE).service("fileMediatorService", ['mediator', 'FILE_CONFIG', function(mediator, FILE_CONFIG){
  return new FileMediatorService(mediator, FILE_CONFIG);
}]);