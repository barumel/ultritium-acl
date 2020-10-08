const Role = require('../src/Role');
const expect = require('expect');

describe('Test role factory', () => {
  describe('Test whitout initial permissions', () => {
    const role = Role('foo');

    it('Must return false for every given path', () => {
      expect(role.isAllowed('foo.bar')).toBeFalsy();
      expect(role.isAllowed('foo.baz')).toBeFalsy();
      expect(role.isAllowed('foo.bar.baz')).toBeFalsy();
    });

    it('Must return true for the given path after calling allow()', () => {
      role.allow('foo.bar');
      expect(role.isAllowed('foo.bar')).toBeTruthy();
    });

    it('Must return false for the give path after calling deny', () => {
      role.allow('bar.baz');
      expect(role.isAllowed('bar.baz')).toBeTruthy();

      role.deny('bar.baz');
      expect(role.isAllowed('bar.baz')).toBeFalsy();
    });
  });

  describe('Test with inital permission', () => {
    const role = Role('foo', { foo: { bar: true }, bar: { baz: false } });

    it('Must return true for foo.bar', () => {
      expect(role.isAllowed('foo.bar')).toBeTruthy();
    });

    it('Must return false for bar.baz', () => {
      expect(role.isAllowed('bar.baz')).toBeFalsy();
    });

    it('Must return false after calling deny() for foo.bar', () => {
      expect(role.isAllowed('foo.bar')).toBeTruthy();

      role.deny('foo.bar');
      expect(role.isAllowed('foo.bar')).toBeFalsy();
    });
  });
});
