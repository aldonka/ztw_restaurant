/**
 * Created by Dominika on 2016-11-28.
 */
//    to run : node server.js
var app = require('./index');
var config = require('./config');

console.info('server process starting');


app.listen(config.express.port, config.express.ip, function (error) {
    if (error) {
        log.error('Unable to listen for connections', error);
        process.exit(10)
    }
    console.info('express is listening on http://' +
        config.express.ip + ':' + config.express.port)
});