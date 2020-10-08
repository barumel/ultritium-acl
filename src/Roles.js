const _ = require('lodash');

const Role = require('./Role');

function Roles() {
  const roles = {};

  function add(id, permissions = {}) {
    if (_.has(roles, id)) throw new Error(`Role with id ${id} already registered! Use replace if you want to replace it.`);

    _.set(roles, id, Role(id, permissions));
  }

  function has(id) {
    return _.has(roles, id);
  }

  function get(id) {
    return _.get(roles, id, Role(id, {}));
  }

  function replace(id, permissions = {}) {
    _.set(roles, id, Role(id, permissions));
  }

  function remove(id) {
    if (_.has(roles, id)) {
      delete roles[id];
    }
  }

  function getCombined(identifiers = []) {
    const roles = Roles();

    identifiers.map((id) => {
      const role = get(id);
      if (!_.isUndefined(role)) roles.add(role.getId(), role.getPermissions());
    });

    return roles;
  }

  function isAllowed(path) {
    return _.some(roles, (role) => {
      return role.isAllowed(path);
    });
  }


  return Object.freeze({
    add,
    has,
    get,
    replace,
    remove,
    isAllowed,
    getCombined
  });
}

module.exports = Roles;
