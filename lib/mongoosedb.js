var mongooseDb = (function () {
  var mongoose = require('mongoose')
    , config = require('./config');

  return {
    /**
     * Init the mongoose connection
     */
    init: function () {
      mongoose = mongoose.connect(config.database);
    },

    /**
     * Return existing mongoose instance,
     */
    getMongooseInstance: function () {
      // If not exist, create it
      if (mongoose.connection.readyState == 0) this.init();

      return mongoose;
    }
  };
})();

module.exports = mongooseDb;
