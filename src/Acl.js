const { reduce, some } = require('lodash');

const Roles = require('./Roles');

function Acl(initial = {}) {
  const roles = Roles();
  initial.map((permissions, id) => roles.add(id, permissions));

  function isAllowed(path, identifiers = []) {
    return roles.getCombined(identifiers).isAllowed(path);
  }

  return Object.freeze({
    addRole: roles.add,
    hasRole: roles.has,
    getRole: roles.get,
    replaceRole: roles.replace,
    removeRole: roles.remove,
    isAllowed
  });
}

module.exports = Acl;
