var ConnectionBuilder = require('./ConnectionBuilder');

module.exports = {
    setUp: function(callback) {
        this.sut = new ConnectionBuilder();
        this.host = 'some-host-name';
        this.port = 123;
        callback();
    },
    setHost: function(test) {
        var pattern = new RegExp('ws://' + this.host + ':.*');
        this.sut.setHost(this.host);
        test.ok(pattern.test(this.sut.toString()), 'connection string should contain host');
        test.done();
    },
    setPort: function(test) {
        var pattern = new RegExp('ws://.*:\\d{1,6}.*');
        this.sut.setPort(this.port);
        test.ok(pattern.test(this.sut.toString()), 'connection string should contain port');
        test.done();
    }
};
