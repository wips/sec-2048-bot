var ConnectionBuilder = function() {};

/** @param {string} host */
ConnectionBuilder.prototype.setHost = function(host) {
    this._host = host;
};

/** @param {number} port */
ConnectionBuilder.prototype.setPort = function(port) {
    this._port = port;
};

/**
 * @returns {string}
 */
ConnectionBuilder.prototype.toString = function() {
  //return 'ws://' + this._host + ':' + this._port;
  return `ws://${this._host}:${this._port}`;

};

module.exports = ConnectionBuilder;
