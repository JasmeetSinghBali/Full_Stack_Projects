const stores = require('./stores');

module.exports = app => {
  app.use('/api/v1/stores',stores)
}
