const expect = require('expect');
const _ = require('lodash');

const Roles = require('../src/Roles');

const permissions = {
  foo: {
    bar: false,
    baz: false
  },
  bar: {
    bar: true,
    baz: false
  },
  baz: {
    bar: true,
    baz: true
  }
};

describe('Test Roles factory', () => {
  describe('Test add function', () => {
    const roles = Roles();
    it('Must add the given role', () => {
      expect(roles.has('foo')).toBeFalsy();
      roles.add('foo', {});

      expect(roles.has('foo')).toBeTruthy();
    });

    it('Must throw an error when trying to add the same role twice', () => {
      expect(() => roles.add('foo', {})).toThrow();
    });
  });

  describe('Test replace function', () => {
    const roles = Roles();

    it('Must add the role event it does not exist', () => {
      expect(roles.has('foo')).toBeFalsy();
      roles.replace('foo', {});

      expect(roles.has('foo')).toBeTruthy();
    });

    it('Must replace the given role with the new one', () => {
      roles.add('bar', {});
      expect(roles.has('bar')).toBeTruthy();
      const existing = roles.get('bar');

      roles.replace('bar', {});
      expect(roles.has('bar'));
      expect(roles.get('bar')).toNotBe(existing);
    });
  });

  describe('Test remove function', () => {
    const roles = Roles();

    it('Must remove the given role', () => {
      roles.add('foo', {});
      expect(roles.has('foo')).toBeTruthy();

      roles.remove('foo');
      expect(roles.has('foo')).toBeFalsy();
    });
  });

  describe('Test getCombined function', () => {
    const roles = Roles();
    _.map(permissions, (p, id) => roles.add(id, p));

    it('Must return a combined Roles instance for the given roles', () => {
      const combined = roles.getCombined(['foo', 'bar']);
      expect(combined.has('foo')).toBeTruthy();
      expect(combined.has('bar')).toBeTruthy();
      expect(combined.has('baz')).toBeFalsy();
    });

    it('Must return true for the given path', () => {
      const combined = roles.getCombined(['foo', 'bar']);
      expect(combined.isAllowed('bar')).toBeTruthy();
    });

    it('Must return false for the given path', () => {
      const combined = roles.getCombined(['foo', 'bar']);
      expect(combined.isAllowed('baz')).toBeFalsy();
    });
  });
});
