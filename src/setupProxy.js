const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'https://bmt3aihrtl.execute-api.us-east-1.amazonaws.com',
      changeOrigin: true,
      ws: true
    })
  )
}
