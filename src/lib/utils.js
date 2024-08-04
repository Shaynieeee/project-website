var mysql = require('mysql2');
// var env = process.env.NODE_ENV || 'development'
var config = require('../config')

module.exports = {
  getDBConnection: function () {
    //return mysql.createConnection(config.db);
    return mysql.createConnection({
        host: config.MYSQL_HOST,
        user: config.MYSQL_USERNAME,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DB_NAME
    });
  },

  /**
   * This must be called before connection.query(...);
   */
  connectToDB: function (connection) {
    connection.connect(function(err) {
      if (err) {
        throw err;
      }
    });
  },

  /**
   * This must be called after connection.query(...)
   */
  endDBConnection: function (connection) {
    connection.end(function (err) {
        if (err) {
            console.error('Error closing the connection:', err.stack);
            return;
        }
        console.log('Connection closed.');
    });
  },

  exec: function (query, data, cb) {
    var connection = this.getDBConnection();
    this.connectToDB(connection);
    connection.query(query, data, function(err, res) {
      if (err) {
        cb(err);
      }
      cb(null, res);
    });
    this.endDBConnection(connection);
  }
}
