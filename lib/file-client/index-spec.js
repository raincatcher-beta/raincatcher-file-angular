var Client = require('./index');
var should = require('should');
var mediator = require("fh-wfm-mediator/lib/mediator");
var CONSTANTS = require('../constants');
var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');
var q = require('q');

var fileToCreate = {
  userId:1,
  dataUrl:"test"
};

var fileSubscribers = new MediatorTopicUtility(mediator);
fileSubscribers.prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.FILES_ENTITY_NAME);

describe("Client tests", function() {
  beforeEach(function() {
    this.subscribers = {};
  });
  
  it('Can create client', function() {
    var client = Client(mediator);
    should(client.create).be.ok();
    should(client.list).be.ok();
  });
  
  it('Can create file', function() {
    var client = Client(mediator);
    fileSubscribers.on("create", function() {
      return q.resolve(fileToCreate);
    });
    return client.create(fileToCreate).then(function(result){
      should(result).be.ok();
    });
  });
});