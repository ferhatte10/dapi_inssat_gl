const logger = require("morgan");

exports.setupLogging = (app) => {

    if (app.get('env') === 'production') {
        app.use(logger('combined'));
    } else {
        app.use(logger('dev'));
    }

}
