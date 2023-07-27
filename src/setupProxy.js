const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'http://0.0.0.0:3001',
    changeOrigin: true,
    secure: false,
}
module.exports = function(app) {
  app.use(
    '/cdg',
    createProxyMiddleware(proxy)
  );
}