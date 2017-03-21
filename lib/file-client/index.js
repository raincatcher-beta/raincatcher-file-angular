/**
 * NOTE: This is only for backward compatibility with the existing demo apps.
 *
 * When this functionality has been moved to modules, then this can be removed.
 *
 * @type {_|exports|module.exports}
 * @private
 */

var q = require('q');
var _ = require('lodash');
var shortid = require('shortid');
var CONSTANTS = require('../constants');
var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');
var mediator, manager, fileSubscribers;

/**
 * Getting Promises for done and error topics.
 *
 * @param doneTopicPromise  - A promise for the done topic.
 * @param errorTopicPromise - A promise for the error topic.
 * @returns {*}
 */
function getTopicPromises(doneTopicPromise, errorTopicPromise) {
  var deferred = q.defer();
  doneTopicPromise.then(function(createdFile) {
    deferred.resolve(createdFile);
  });
  errorTopicPromise.then(function(error) {
    deferred.reject(error);
  });
  return deferred.promise;
}

/**
 * Creating a new file.
 *
 * @param {object} fileToCreate - The File to create.
 */
function create(fileToCreate) {
  //Creating a unique channel to get the response
  var topicUid = shortid.generate();
  var topicParams = {topicUid: topicUid, itemToCreate: fileToCreate};
  var donePromise = mediator.promise(fileSubscribers.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.DONE_PREFIX, topicUid));
  var errorPromise = mediator.promise(fileSubscribers.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.ERROR_PREFIX, topicUid));
  mediator.publish(fileSubscribers.getTopic(CONSTANTS.TOPICS.CREATE), topicParams);

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Listing All Files
 */
function list() {
  var donePromise = mediator.promise(fileSubscribers.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.DONE_PREFIX));
  var errorPromise = mediator.promise(fileSubscribers.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.ERROR_PREFIX));
  mediator.publish(fileSubscribers.getTopic(CONSTANTS.TOPICS.LIST));

  return getTopicPromises(donePromise, errorPromise);
}

function ManagerWrapper(_manager) {
  this.manager = _manager;
  var self = this;

  var methodNames = ['create', 'list'];
  methodNames.forEach(function(methodName) {
    self[methodName] = function() {
      return q.when(self.manager[methodName].apply(self.manager, arguments));
    };
  });
}

/**
 *
 * Initialising the file-client with a mediator.
 *
 * @param _mediator
 * @returns {ManagerWrapper|*}
 */
module.exports = function(_mediator) {

  //If there is already a manager, use this
  if (manager) {
    return manager;
  }
  mediator = _mediator;
  fileSubscribers = new MediatorTopicUtility(mediator);
  fileSubscribers.prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.FILES_ENTITY_NAME);

  manager = new ManagerWrapper({
    create: create,
    list: list
  });
  return manager;
};