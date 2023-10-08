const { createProxyMiddleware } = require('http-proxy-middleware');

exports.setupProxies = (app, routes) => {
    
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    })
}
