var saltHash = (function () {
  // Using node's built in crypto lib
  var crypto = require('crypto');

  return {
    /**
     * @typedef HashedPaswordSalt
     * @type Object
     * @property {String} hashed_password - Hashed Password
     * @property {String} salt - Salt
     */

    /**
     * Returns a pair of hashed password and salt
     * @param {string} password - password in plaintext
     * @param {string} [salt] - salt used to hash the plaintext password into hash
     * @returns {HashedPasswordSalt} - The pair of salt and hashed password
     */
    hashPassword: function (password, salt) {
      var salt = salt || this.generateSalt();
      var hash = crypto.createHmac('sha512', salt);
      var hashedPassword = hash.update(password).digest('base64');

      return {
        hashed_password: hashedPassword,
        salt: salt
      }
    },

    /**
     * Returns of random encoded bytes
     * @returns {string} - base64 encoded 64bytes of random data
     */
    generateSalt: function () {
      return crypto.randomBytes(64).toString('base64');
    },

    /**
     * Return true false by comparing two hashes
     * @params {HashedPasswordSalt} hashObj - Hashed password to be compared
     * @params {string} password - Plaintext password entered by user
     * @returns {boolean} - comparison results
     */
    compareHash: function (hashObj, password) {
      var hashedPassword = this.hashPassword(password, hashObj.salt).hashed_password;
      return hashedPassword == hashObj.hashed_password ? true : false;
    }
  };
})();

module.exports = saltHash;
