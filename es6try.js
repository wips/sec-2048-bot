var ConnectionBuilder = require('./src/ConnectionStringBuilder');

var connectionBuilder = new ConnectionBuilder();
connectionBuilder.setHost('sss');
connectionBuilder.setPort(555);
console.log(connectionBuilder.toString());