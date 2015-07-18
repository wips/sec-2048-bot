var ConnectionBuilder = require('./src/ConnectionBuilder');

var connectionBuilder = new ConnectionBuilder();
connectionBuilder.setHost('sss');
connectionBuilder.setPort(555);
console.log(connectionBuilder.toString());