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
 * Creating a new file.
 *
 * @param {object} fileToCreate - The File to create.
 */
function create(fileToCreate) {
  var topicParams = {itemToCreate: fileToCreate};
  return mediator.publish(fileSubscribers.getTopic(CONSTANTS.TOPICS.CREATE), topicParams);
}

/**
 * Listing All Files
 */
function list() {
  return mediator.publish(fileSubscribers.getTopic(CONSTANTS.TOPICS.LIST));
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
 * @returns {ManagerWrapper} ManagerWrapper
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