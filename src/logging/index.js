const loggingPlugin = require('./loggingPlugin')
const logger = require('./logger')

// Export loggers together for use with server
module.exports = {
  logger,
  loggingPlugin,
}
