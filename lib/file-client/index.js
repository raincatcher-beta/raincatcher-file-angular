var q = require('q');
var manager;

/**
 * Creating a new file.
 *
 * @param {object} fileToCreate - The File to create.
 */
function create(fileToCreate) {
  return modrain.file.create(fileToCreate);
}

/**
 * Listing All Files
 */
function list(filter) {
  return modrain.file.list(filter);
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
 * @returns {ManagerWrapper} ManagerWrapper
 */
module.exports = function() {
  //If there is already a manager, use this
  if (manager) {
    return manager;
  }
  manager = new ManagerWrapper({
    create: create,
    list: list
  });
  return manager;
};