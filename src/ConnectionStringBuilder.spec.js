var ConnectionBuilder = require('./ConnectionStringBuilder');

module.exports = {
  setUp: function(callback) {
    this.sut = new ConnectionBuilder();
    this.host = 'some-host-name';
    this.port = 123;
    this.gameUrl = 'some-url';
    this.user = 'some-user';
    callback();
  },
  "test all the string": function(test) {
    this.sut.port = this.port;
    this.sut.host = this.host;
    this.sut.gameUrl = this.gameUrl;
    this.sut.user = this.user;
    test.strictEqual(this.sut.toString(), `ws://${this.host}:${this.port}/${this.gameUrl}?user=${this.user}`);
    test.done();
  },
  "host setter": function(test) {
    var pattern = new RegExp('ws://' + this.host + ':.*');
    this.sut.host = this.host;
    test.ok(pattern.test(this.sut.toString()), 'connection string should contain host');
    test.done();
  },
  "port setter": function(test) {
    var pattern = new RegExp('ws://.*:\\d{1,6}.*');
    this.sut.port = this.port;
    test.ok(pattern.test(this.sut + ''), 'connection string should contain port');
    test.done();
  },
  "user name setter": function(test) {
    var pattern = new RegExp(`ws://.*user=${this.user}$`);
    this.sut.user = this.user;
    test.ok(pattern.test(this.sut.toString()), 'connection string should contain user name');
    test.done();
  },
  "game URL setter": function(test) {
    var pattern = new RegExp(`ws://.*:\/${this.gameUrl}\\?.*`);
    this.sut.gameUrl = this.gameUrl;
    test.ok(pattern.test(this.sut + ''), 'connection string should contain game url');
    test.done();
  },
  "default host value is empty string": function(test) {
    var pattern = new RegExp(`ws://\\:.*`);
    test.ok(pattern.test(this.sut.toString()));
    test.done();
  }
};
