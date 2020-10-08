const { cloneDeep, get, set } = require('lodash');

function Role(id, permissions = {}) {
  const tree = cloneDeep(permissions);

  function getId() {
    return id;
  }

  function getPermissions() {
    return cloneDeep(tree);
  }

  function allow(path) {
    set(tree, path, true);
  }

  function deny(path) {
    set(tree, path, false);
  }

  function isAllowed(path) {
    return get(tree, path, false);
  }

  return Object.freeze({
    __proto__: Role,
    getId,
    getPermissions,
    allow,
    deny,
    isAllowed
  });
}

module.exports = Role;
