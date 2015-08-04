var GameConnector = require('./GameConnector');

module.exports = {
  setUp: function (callback) {
    var test = this;
    this.connectionString = 'some connection string';
    this.urlPassedToTransport = '';
    this.transport = url => test.urlPassedToTransport = url;
    var connectionStringBuilder = {
      toString() {
        return test.connectionString;
      }
    };
    this.sut = new GameConnector(this.transport, connectionStringBuilder);
    this.sut.connect();
    callback();
  },
  "initializes transport with connection string": function(test) {
    test.equal(this.urlPassedToTransport, this.connectionString);
    test.done();
  }
};
