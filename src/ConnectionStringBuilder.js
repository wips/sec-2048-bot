class ConnectionBuilder {
  constructor(host = '') {
    this._host = host;
    this._port = '';
    this._gameUrl = '';
    this._user = '';
  }

  /** @param {string} host */
  set host(host) {
    this._host = host;
  }

  /** @param {number} port */
  set port(port) {
    this._port = port;
  }

  /** @returns {string} */
  toString() {
    return `ws://${this._host}:${this._port}/${this._gameUrl}?user=${this._user}`;
  }

  set user(userName) {
    this._user = userName;
  }

  set gameUrl(url) {
    this._gameUrl = url;
  }
}

module.exports = ConnectionBuilder;
