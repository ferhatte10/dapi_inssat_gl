const rateLimit = require("express-rate-limit");

exports.setupRateLimit = (app, routes) => {

    routes.forEach(r => {
        if (r.rateLimit) {
            app.use(r.url, rateLimit(r.rateLimit));
        }
    })
}
