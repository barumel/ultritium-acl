const expect = require('expect');

const Acl = require('../src/Acl');

const initial = [{
  id: 'foo',
  permissions: {
    foo: false,
    bar: false,
    baz: false
  }
}, {
  id: 'bar',
  permissions: {
    foo: true,
    bar: false,
    baz: false
  }
}, {
  id: 'baz',
  permissions: {
    foo: true,
    bar: true,
    baz: false
  }
}];

describe('Test Acl factory', () => {
  const acl = Acl(initial);

  describe('Test initial setup', () => {
    expect(acl.hasRole('foo')).toBeTruthy();
    expect(acl.hasRole('bar')).toBeTruthy();
    expect(acl.hasRole('baz')).toBeTruthy();
    expect(acl.hasRole('ban')).toBeFalsy();
  });

  describe('Test addRole function', () => {
    acl.addRole('ban', { foo: true, bar: true, baz: true });

    expect(acl.hasRole('baz')).toBeTruthy();
  });

  describe('Test replaceRole function', () => {
    const role = acl.getRole('ban');

    acl.replaceRole('ban', { foo: true, bar: true, baz: true });

    expect(acl.getRole('ban')).toNotBe(role);
  });

  describe('Test removeRole function', () => {
    expect(acl.hasRole('ban')).toBeTruthy();

    acl.removeRole('ban');

    expect(acl.hasRole('ban')).toBeFalsy();
  });

  describe('Test isAllowed function', () => {
    it('Must return true', () => {
      expect(acl.isAllowed('foo', ['foo', 'bar'])).toBeTruthy();
      expect(acl.isAllowed('bar', ['foo', 'bar', 'baz'])).toBeTruthy();
    });

    it('Must return false', () => {
      expect(acl.isAllowed('bar', ['foo', 'bar'])).toBeFalsy();
      expect(acl.isAllowed('baz', ['foo', 'bar'])).toBeFalsy();
    });
  });
});
