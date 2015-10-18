var assert = require('assert')
  , chai = require('chai')
  , expect = chai.expect
  , saltHash = require('../../lib/saltHash')
  , password = 'testpassword'
  , hashObj = {};

describe('Salt hash for password: ' + password, function () {
  before(function () {
    hashObj = saltHash.hashPassword(password);
  });

  describe('#hashPassword()', function () {
    it('should hash password', function () {
      expect(hashObj).to.be.an('object');
    });
  });

  describe('#compareHash()', function () {
    it('should compare hash', function () {
      expect(saltHash.compareHash(hashObj, password)).to.be.true;
      expect(saltHash.compareHash(hashObj, 'wrongpassword')).to.be.false;
    });
  });
});
