const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        ['/board','/performance'],
        createProxyMiddleware({
            target: process.env.REACT_APP_API_URL || 'http://localhost:8082',
            changeOrigin: true,
        })
    );
};