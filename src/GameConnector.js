class GameConnector {
  constructor(transport, connectionStringBuilder) {
    this._transport = transport;
    this._connectionStringBuilder = connectionStringBuilder;
  }
  connect() {
    new this._transport(this._connectionStringBuilder.toString());
  }
}

module.exports = GameConnector;
